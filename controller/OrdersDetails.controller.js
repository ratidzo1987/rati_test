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
		return BaseController.extend("com.example.projectId.controller.OrdersDetails",
		{
			wpId: "",
			wpInfos: [],

			onInit: function () 
			{
				console.log("- com.example.projectId.controller.OrdersDetails - onInit");
				this.busyIndicator = new BusyDialog();
				this.oComponent = this.getOwnerComponent();

				this._router = this.oComponent.getRouter();
				this._router.attachRoutePatternMatched(this._handleRouteMatched, this);

				// Get Model from the Component
				this.oClientlist = this.oComponent.getModel("oClientlist");
			},

			/*************************************************************************** */
			// When the route is set and the parametersread, the parameter will be saved as
			// a variable  in the permanent "variable Id" of the controller "wpId"
			/**************************************************************************** */
			_handleRouteMatched: function (oEvent) 
			{
				console.log("controller.Details - _handleRouteMatched");
				var that = this;
				this.oComponent.errorLogger = this.errorLogger;
				this.oComponent.errorLoggerAll = this.errorLoggerAll;
				var oComponent = this.getOwnerComponent();

				// The parameter is retrieved by id
				this.Id = oEvent.getParameter("arguments").Id;
				var Path = oEvent.getParameter("arguments").Path;

				// This is the path to the model
				this.Path = "/Lieferanten/" + Path;

				// only loaded, if user wants to change in same the page
				 if (oEvent.getParameter("name") === "OrdersDetails") {
					this.readData();
				} 
				this.readData();
			},
				
			/******************************************************************************** */
			// read the data from the variable Wp that is clicked in the master view
			/********************************************************************************** */
			readData: function () 
			{
				console.log("- com.example.projectId.controller.OrdersDetails - readData");
				var that = this;
				
				// Get path for the data in the Model
				var clientDetail = this.oClientlist.getProperty(this.Path);
				this.oDetailModel = new sap.ui.model.json.JSONModel();
				this.oDetailModel.setData(clientDetail);
				this.getView().setModel(this.oDetailModel, "oDetailModel");

				//Filtering for bestellungen
				var table1 ,binding,filter;
				var aFilters = [];
				table1 = this.getView().byId("bestellungTable");
				filter = new Filter("LieferantID", sap.ui.model.FilterOperator.EQ, this.Id);
				aFilters.push(filter);
				binding = table1.getBinding("items");
				binding.filter(aFilters, "Application");	

				// Filtering for artikelliste
				var table ,binding,filter;
				var aFilters = [];
				table = this.getView().byId("artikelTable");
				filter = new Filter("Lieferant", sap.ui.model.FilterOperator.EQ, this.Id);
				aFilters.push(filter);
				binding = table.getBinding("items");
				binding.filter(aFilters, "Application");

			},

			/*************************************************************************** */
			// Calculation of actual time variables
			/**************************************************************************** */
			getNow: function () 
			{
				console.log("- com.example.projectId.controller.OrdersDetails - getNow");

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
							
				

				
				

					
						
			

				
				

				

				
				












































