sap.ui.define([
	"com/example/projectId/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/Device",
	"sap/ui/model/FilterOperator",
	"sap/m/BusyDialog",
	"sap/m/Dialog",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/ColumnListItem",
	"sap/ui/core/format/DateFormat",
	"sap/ui/core/util/File",
	"sap/ui/core/UIComponent",
	"sap/ui/core/Fragment"
],
	function (BaseController, JSONModel, Filter, Device, FilterOperator, BusyDialog, Dialog, MessageBox, MessageToast, ColumnListItem, DateFormat, UIComponent,Fragment) {
		"use strict";
		return BaseController.extend("com.example.projectId.controller.Mitarbeiter",
		{
			wpId: "",
			wpInfos: [],

			onInit: function () 
			{
				console.log("- com.example.projectId.controller.Mitarbeiter - onInit");
				this.busyIndicator = new BusyDialog();
				this.oComponent = this.getOwnerComponent();

				this._router = this.oComponent.getRouter();
				this._router.attachRoutePatternMatched(this._handleRouteMatched, this);

                
                // Get Model from the Component
				this.oMitarbeiterList = this.oComponent.getModel("oMitarbeiterList");
				this.getView().setModel(this.oMitarbeiterList, "oMitarbeiterList");
				this.oMitarbeiterList.setSizeLimit(1000);
			},

			/*************************************************************************** */
			// When the route is set and the parametersread, the parameter will be saved as
			// a variable  in the permanent "variable Id" of the controller "wpId"
			/**************************************************************************** */
			_handleRouteMatched: function (oEvent) 
			{
				console.log("controller.Mitarbeiter - _handleRouteMatched");
				var that = this;
				this.oComponent.errorLogger = this.errorLogger;
				this.oComponent.errorLoggerAll = this.errorLoggerAll;
				var oComponent = this.getOwnerComponent();

				// The parameter is retrieved by id
				this.Id = oEvent.getParameter("arguments").Id;
				var Path = oEvent.getParameter("arguments").Path;

				
			},
				
			/****************************************************************************************** */
			//when the  refresh button is pressed this function is executed and alist of all the Mitarbeiter is displayed in the table
			/******************************************************************************************** */
			readMitarbeiterList: function	()
			{
				console.log("com.example.projectId.controller.Mitarbeiter - readMitarbeiterList");
				var that = this;
				var sendInfo = {typ: "lesen"};
				
				// the send info object is changed from object to string
				var sendInfoString = JSON.stringify(sendInfo);
				var sUrl = "http://192.168.250.39:3044/MitarbeiterList";	
				jQuery.ajax(
					{
						type: 'GET',
						url: sUrl,
						contentType: "application/json",
						dataType: 'json',
						timeout: 0,
						//data: sendInfoString,
						
						success: function(oData, textStatus, response) 
							{ 
								console.log("Successful!");
							
								console.log(oData);
														
								//in the model oMitarbeiterliste there is a property(unterverzeichnis) which is callled list
								//that is where we are going to get our required data
								that.oMitarbeiterList.setProperty("/List", oData);
								that.oMitarbeiterList.refresh();	
							},
							
						error: function (jqXHR, textStatus, errorThrown)
							{
								console.log("Error!");	
							}
					});
				},				
		
			/************************************************************************ */
			// opens the main dialog on the click into a row
			/************************************************************************ */
			onItemListPress : function (oEvent) 
			{
				console.log("controller.Mitarbeiter - onItemListPress");	
				var that = this;					
				// geklickte Daten herausfinden
				var sPath = oEvent.getSource().getBindingContextPath("oMitarbeiterList");
				// Daten Model holen
				var oModel = this.getView().getModel("oMitarbeiterList");
				// Daten für genau den Pfad aus dem Model holen
				this.data = oModel.getProperty(sPath);
				
				console.log(this.data);
				// Daten ins Model schreiben
				this.odatax= new sap.ui.model.json.JSONModel();
				this.odatax.setData(this.data);
				this.getView().setModel(this.odatax, "data");
				// Dialog öffnen
				this.openMitarbeiterDialog();
			},

			/**************************************************************************** */
			//This function is called when the add button is clicked//
			/**************************************************************************** */
			onClickAddButton: function()
			{
				console.log("controller.Mitarbeiter - onClickAddButton");
				this.data = {
					ID: "",
					Vorname: "", 
					Nachname: "", 
					Ort: ""
				};
				
				// Setting new model and putting the data in the model
				this.odatax= new sap.ui.model.json.JSONModel();
				this.odatax.setData(this.data);
				this.getView().setModel(this.odatax, "data");

				// Open Dialog function is called
				this.openMitarbeiterDialog();					
			},

			/********************************************************************************** */
			//This function is called in order to open the overlay	
			/********************************************************************************** */
			openMitarbeiterDialog: function()
			{
                console.log("controller.Mitarbeiter -openMitarbeiterDialog");
				if (!this.mitarbeiterDialog) 
				{
					this.mitarbeiterDialog= sap.ui.xmlfragment("com.example.projectId.view.MitarbeiterDialog", this);
		            this.getView().addDependent(this.mitarbeiterDialog);
		            this.mitarbeiterDialog.open(); 	
				} 
				else 
				{
					this.mitarbeiterDialog.open(); 
				}
			},				
		
			/*********************************************************************** */
			//closes the overlay Main on the click of a button//
			/*********************************************************************** */
			onMitarbeiterDialogClose :  function ()
			{
				console.log("controller.Mitarbeiter - onMitarbeiterDialogClose");
				console.log();
				this.mitarbeiterDialog.close();
				
			},	

			//****************************************************************************************************** */
			//This function is executed when the update button on the update Dialog is pressed
			//***************************************************************************************************** */
			onSaveMitarbeiterList: function()
			{
				console.log("com.example.projectId.controller.Mitarbeiter -onSaveMitarbeiterList");
				var v2 = sap.ui.getCore().byId("inputVorname2").getValue();
				var n2 = sap.ui.getCore().byId("inputNachname2").getValue();
				var o2 = sap.ui.getCore().byId("inputOrt2").getValue();
				var i2 =  sap.ui.getCore().byId("inputID2").getValue();
				var sendInfo = "";
				var that = this;

				if (i2 === "" )  
				{ 
					// new Entry
						sendInfo = 
					{
						TYP: "new",
						Vorname : v2,
						Nachname : n2,
						Ort : o2		
					};
				}
				else
				{
					// Update  existing Entry
						sendInfo = 
					{
						TYP: "update",
						ID : i2,
						Vorname : v2,
						Nachname : n2,
						Ort : o2		
					};						
				}
				if(sendInfo != "" && v2 !="" && n2 !="" && o2 !="")	
				{
					
					// the send info object is changed from object to string
					var sendInfoString = JSON.stringify(sendInfo);
					var sUrl = "http://192.168.250.39:3044/Workers";	
					jQuery.ajax(
						{
							type: 'POST',
							url: sUrl,
							contentType: "application/json",
							dataType: 'json',
							timeout: 0,
							data: sendInfoString,

							success: function(oData, textStatus, response) 
							// the retrieval of data from the database and  saving it in a new model 
								{ 
									console.log("Successful!");
								
									console.log(oData);
															
									//in the model oMitarbeiterliste there is a property(unterverzeichnis) which is callled list
									//that is where we are going to get our required data
									that.oMitarbeiterList.setProperty("/List", oData);
									that.oMitarbeiterList.refresh();
									that.readMitarbeiterList();
								    that.onMitarbeiterDialogClose();
								},
								
							error: function (jqXHR, textStatus, errorThrown)
								{
									console.log("Error!");
									//console.log (err);
									//that.closeBusyDialog();
								}
						});
				}
				else
				{
				
					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.error(
						"Please fill in all the required information",
						{
							actions: ["Fill in?", sap.m.MessageBox.Action.CLOSE],
							styleClass: bCompact ? "sapUiSizeCompact" : "",
							onClose: function(sAction) {
								MessageToast.show( sAction);
							}
						})
				}		
			},	
									
			//****************************************************************************************************** */
			//This function is executed when the delete  button on the MainDialog is pressed
			//***************************************************************************************************** */
			onDeleteMitarbeiterList: function()
			{
				console.log("com.example.projectId.Mitarbeiter - ondeleteMitarbeiterList");
				var that = this;

				var v3= sap.ui.getCore().byId("inputVorname2").getValue();
				var n3 = sap.ui.getCore().byId("inputNachname2").getValue();
				var o3 = sap.ui.getCore().byId("inputOrt2").getValue();
				var i3 =  sap.ui.getCore().byId("inputID2").getValue();

				var sendInfo = 
				{
					TYP: "delete",
					ID : i3,
					Vorname : v3,
					Nachname : n3,
					Ort :o3
				};
					
				// the send info object is changed from object to string
				var sendInfoString = JSON.stringify(sendInfo);
				var sUrl = "http://192.168.250.39:3044/Workers";	
				jQuery.ajax(
					{
						type: 'POST',
						url: sUrl,
						contentType: "application/json",
						dataType: 'json',
						timeout: 0,
						data: sendInfoString,
						success: function(oData, textStatus, response) 
						// the retrieval of data from the database and  saving it in a new model 
							{ 
								console.log("Successful!");
							
								console.log(oData);
														
								//in the model oMitarbeiterliste there is a property(unterverzeichnis) which is callled list
								//that is where we are going to get our required data
								that.oMitarbeiterList.setProperty("/List", oData);
								that.oMitarbeiterList.refresh();
								that.readMitarbeiterList();
								that.onMitarbeiterDialogClose();
							},
							
						error: function (jqXHR, textStatus, errorThrown)
							{
								console.log("Error!");
								//console.log (err);
								//that.closeBusyDialog();
							}
					}
				);				
			},

			/*************************************************************************** */
			// Calculation of actual time variables
			/**************************************************************************** */
			getNow: function () 
			{
				console.log("- com.example.projectId.controller.Mitarbeiter - getNow");

				// Retrieve actual date and format it 
				var today = new Date();
				var day = today.getDate();
				if (day < 10) 
				{
					day = "0" + day;
				}

				//Retrieve actual month and formatt it , we add 1 to the months all the time because the months start from 0-11
				var month = today.getMonth();
				month += 1;
				if (month < 10) 
				{
					month = "0" + month;
				}

				var year = today.getFullYear();

				// Get time and format it in the format - hh:mm:ss
				var stunde = today.getHours();
				if (stunde < 10) 
				{
					stunde = "0" + stunde;
				}

				var minuten = today.getMinutes();
				if (minuten < 10) 
				{
					minuten = "0" + minuten;
				}
				
				// Retrieving the formatted date and time variables and setting them together
				this.now = year + month + day + stunde + minuten;
			}

		})
	});	
							