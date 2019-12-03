sap.ui.define([
	"com/example/projectId/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.example.projectId.controller.Splitapp", 
	{
		onInit : function()
		{
			console.log("com.example.projectId.controller.Orders - onInit");
			
		}
	});
});