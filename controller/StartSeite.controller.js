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
], function (BaseController, JSONModel, Filter, Device, FilterOperator, BusyDialog, Dialog, MessageBox, MessageToast, ColumnListItem, DateFormat, UIComponent,Fragment) {
	"use strict";

	return BaseController.extend("com.example.projectId.controller.StartSeite", 
	{
        onInit : function()
        {
            console.log("- com.example.projectId.controller.Startseite - onInit");
				this.busyIndicator = new BusyDialog();
                this.oComponent = this.getOwnerComponent();
                
                
        },

        
        //when the ww generic tile is pressed it navigates to the splittapp
		onPressToSplitApp: function()
		{
			console.log("- com.example.projectId.controller.Startseite -onPressSplitApp ");

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Splitapp");
			
        },
        
        //when the mitarbeiter generic tile is pressed it navigates to the mitarbeiter view
		onPressToMitarbeiterlist: function()
		{
			console.log("- com.example.projectId.controller.Startseite -onPressToMitarbeiterList ");

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Mitarbeiter");

		},	
			
		onNavBack: function (oEvent) 
        {
            console.log("- com.example.projectId.controller.Startseite- onNavBack");
            var oHistory, sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) 
            {
                window.history.go(-1);
            }
            else 
            {
                this.getRouter().navTo("", {}, true /*no history*/);
            }
        },
        //calling the on NavBack function from the Component		
        handleNavBack : function () 
        {
            console.log("- com.example.projectId.controller.Startseite -handleNavBack ");
			this.getOwnerComponent().onNavBack();
		}
        	
		
	});
});