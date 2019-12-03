sap.ui.define([
	"com/example/projectId/controller/BaseController"
], function (BaseController) 
{
	"use strict";

    return BaseController.extend("com.example.projectId.controller.Notfound",
    {
        onInit : function() 
        //initialisation and getting the router
        {
			var oComponent = this.getOwnerComponent();
			this._router = oComponent.getRouter();
		},
		//calling the on NavBack function from the Component		
        handleNavBack : function () 
        {
			this.getOwnerComponent().onNavBack();
		}
	});
});