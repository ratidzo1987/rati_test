sap.ui.define([
    "com/example/projectId/controller/BaseController",
    "sap/ui/Device",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/ui/core/format/DateFormat",
    "sap/m/MessageBox"
], function (BaseController, Device, Filter, JSONModel, History, MessageToast, DateFormat, MessageBox) {
    "use strict";
    return BaseController.extend("com.example.projectId.controller.OrdersListPage",
    {
        /*****************************************************************************************************************/
            // Called when a controller is instantiated and its View controls (if available) are already created.
            // Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
        /******************************************************************************************************************** */
        onInit: function ()
        //initialising ,getting and setting the model and setting the router
        {
            console.log("- com.example.projectId.controller.OrdersListPage - onInit");
            this.oComponent = this.getOwnerComponent();

            this.oClientlist = this.oComponent.getModel("oClientlist");
            this.getView().setModel(this.oClientlist, "oClientlist");
            this.oClientlist.setSizeLimit(1000);

            this._router = this.oComponent.getRouter();
            this._router.attachRoutePatternMatched(this._handleRouteMatched, this);
        },

        //calling the get router function from the Component
        getRouter: function () 
        {
            console.log("- com.example.projectId.controller.OrdersListPage- getRouter");
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        //called when the user goes back to the main page
        _handleRouteMatched: function (evt) 
        {
            console.log("- com.example.projectId.controller.OrdersListPage- handleRouteMatched");
            //this.oBundle = this.getView().getModel("i18n").getResourceBundle();
            this.oComponent = this.getOwnerComponent();
            this.readClientlist();
        },

        // Reading the deliverers from a local data source
        readClientlist: function ()
        {
            console.log("- com.example.projectId.controller.OrdersListPage- readClientList");
            // Read the information of the Clientlistfrom the model
            this.oClientlist.loadData("model/Clientlist.json", {}, false);
            // Information actualisieren
            this.oClientlist.refresh();
        },

        // Filtering the clients based on status
        onPressfilter1: function () 
        {
            console.log("- com.example.projectId.controller.OrdersListPage- onPressFilter1");
            // filtering all clients with status 1 and pushing them into an array
            var aFilters = [];
            var filter = new Filter("Status", sap.ui.model.FilterOperator.EQ, "1");
            aFilters.push(filter);
            // binding
            var list = this.getView().byId("listid");
            var binding = list.getBinding("items");
            binding.filter(aFilters, "Application");
        },

        onPressfilter2: function () 
        {
            console.log("- com.example.projectId.controller.OrdersListPage- onPressFilter2");
            //  filtering all clients with status 2 and pushing them into an empty array 
            var aFilters = [];
            var filter = new Filter("Status", sap.ui.model.FilterOperator.EQ, "2");
            aFilters.push(filter);
            // binding
            var list = this.getView().byId("listid");
            var binding = list.getBinding("items");
            binding.filter(aFilters, "Application");
        },

        onPressfilter3: function () 
        {
            console.log("- com.example.projectId.controller.OrdersListPage- onPressFilter3");
            // filtering the clients based on status 3 and pushing them onto an empty array 
            var aFilters = [];
            // Filter setzen mit größer oder gleich Tagesdatum
            var filter = new Filter("Status", sap.ui.model.FilterOperator.EQ, "3");
            aFilters.push(filter);
            // update list binding
            var list = this.getView().byId("listid");
            var binding = list.getBinding("items");
            binding.filter(aFilters, "Application");
        },

        onPressfilterAll: function ()
        //deletes all current filters and  and empties the array
        {
            console.log("- com.example.projectId.controller.OrdersListPage- onPressFilterAll");
            // array is emptied
            var aFilters = [];
            // update list binding
            var list = this.getView().byId("listid");
            var binding = list.getBinding("items");
            binding.filter(aFilters, "Application");
        },
            
        // when the navigation icon is pressed it takes you back to the previous page
        onNavBack: function (oEvent) 
        {
            console.log("- com.example.projectId.controller.OrdersListPage- onNavBack");
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
        
        onMasterHide: function () 
        {
            console.log("- com.example.projectId.controller.OrdersListPage- onMasterHide");
            var oSplitApp = this.getOwnerComponent()._oSplitApp;
            // sap.m.SplitAppMode.HideMode;		
        },

        //The clicked item will be read from the model and a details view will be opened where more information on the 
        //clicked item will be displayed 
        onNavigationListItemPress: function (oEvent)
        {
            console.log("- com.example.projectId.controller.OrdersListPage- onNavigationListItemPress");
            // the details of the clicked item will be showed
            var param = oEvent.getSource();
            var sPath = param.getBindingContextPath();
            // Getting the data model where the items are stored
            var oModel = this.getView().getModel("oClientlist");
            // to get the exact details of the clicked item 
            this.data = oModel.getProperty(sPath);

            var rat = sPath.split("/");

            // Routing to the next detailspage , where more info on the item will be displayed
            this.getRouter().navTo("OrdersDetails", 
            {
                Id: this.data.ID,
                Path: rat[2]
            });
        },

        // Calculating the actual time variables
        getNow: function () 
        {
            console.log("- com.example.projectId.controller.OrdersListPage- getNow");
            // actual date formating
            var today = new Date();
            var day = today.getDate();
            if (day < 10) 
            {
                day = "0" + day;
            }

            //months formating the months are from 0-11 because of java script so we must add 1 always to the current month
            var month = today.getMonth();
            month += 1;
            if (month < 10)
            {
                month = "0" + month;
            }

            var year = today.getFullYear();
            
            // Retrieve current time and in formatt in into that with 2 place holderss - hh:mm:ss
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
            
            // Putting together all the variables to come up with onedate and time formatt
            this.now = year + month + day + stunde + minuten;
        },
    });
});


            
            
           




