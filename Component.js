sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/m/routing/Router',
	'sap/ui/model/json/JSONModel'
    ], function (UIComponent, Router, JSONModel) 
    {
		"use strict";
        return UIComponent.extend("com.example.projectId.Component", 
        {
            metadata : 
            {
				manifest: "json"
			},
			
            init : function () 
            {
				//calls the initialisation 
				UIComponent.prototype.init.apply(this, arguments);
	
				// setting the devices which will be compatible with the app
				var oDeviceModel = new JSONModel(
				{
					isTouch: sap.ui.Device.support.touch,
					isNoTouch: !sap.ui.Device.support.touch,
					isPhone: sap.ui.Device.system.phone,
					isNoPhone: !sap.ui.Device.system.phone,
					listMode: (sap.ui.Device.system.phone) ? "None" : "SingleSelectMaster",
					listItemType: (sap.ui.Device.system.phone) ? "Active" : "Inactive"
				});
				oDeviceModel.setDefaultBindingMode("OneWay");
				this.setModel(oDeviceModel, "device");
                
			    //Setting the JSONMODEL in this case our ClientList
				this.oClientlist = new sap.ui.model.json.JSONModel();
				this.setModel(this.oClientlist, "oClientlist");
				this.oClientlist.setSizeLimit(1000);

				this.oMitarbeiterList = new sap.ui.model.json.JSONModel();
				this.setModel(this.oMitarbeiterList, "oMitarbeiterList");
				this.oMitarbeiterList.setSizeLimit(1000);
			
				// setting the router
				this._router = this.getRouter();
				
				// initialising the router
				this._router.initialize()	
			},
	        // when the navigation button is pressed this function is carried out
            onNavBack : function ()
			{
				var oHistory = sap.ui.core.routing.History.getInstance();
				var oPrevHash = oHistory.getPreviousHash();
                if (typeof oPrevHash !== "undefined")
                {
					window.history.go(-1);
                } 
                else 
                {
					this._router.navTo("home", null, true);
				}
			}
		});
	});
	

	
