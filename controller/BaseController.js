sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";
	return Controller.extend("com.example.projectId.controller.BaseController",
	{
		//calling the get router function from the component
		getRouter: function () 
		{
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		//on NavBack function appears in more than one controller so we put it here and we dont have to rewrite it everytime we need it 
		onNavBack: function (oEvent) 
		{
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
		}
	});
});
 