sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        'use strict';
        return Controller.extend("logaligroup.employees.controller.Main", {

            onInit: function () {

                var oView = this.getView();
                //var i18nBundle = oView.getModel("i18n").getResourceBundle(); //se recupera los recursos del modelo i18n del manifest.json

                var oJSONModelEmpl = new sap.ui.model.json.JSONModel();
                oJSONModelEmpl.loadData("./localService/mockdata/Employees.json", false); //carga de los datos desde la carpeta 
                oView.setModel(oJSONModelEmpl, "jsonEmployees");

                var oJSONModelCountries = new sap.ui.model.json.JSONModel();
                oJSONModelCountries.loadData("./localService/mockdata/Countries.json", false); //carga de los datos desde la carpeta 
                oView.setModel(oJSONModelCountries, "jsonCountries");

                var oJSONModelLayout = new sap.ui.model.json.JSONModel();
                oJSONModelLayout.loadData("./localService/mockdata/Layouts.json", false); //carga de los datos desde la carpeta 
                oView.setModel(oJSONModelLayout, "jsonLayout");

                var oJSONModelConfig = new sap.ui.model.json.JSONModel({
                    visibleID: true,
                    visibleName: true,
                    visbleCountry: true,
                    visibleCity: false,
                    visibleBtnShowCity: true,
                    visibleBtnHideCity: false
                });
                oView.setModel(oJSONModelConfig, "jsonModelConfig");

                this._bus = sap.ui.getCore().getEventBus();
                this._bus.subscribe("flexible", "showEmployee", this.showEmployeeDetails, this);
            },

            showEmployeeDetails: function (category, nameEvent, path) {
                var detailView = this.getView().byId("detailEmployeeView");
                detailView.bindElement("jsonEmployees>" + path);
                this.getView().getModel("jsonLayout").setProperty("/ActiveKey", "TwoColumnsMidExpanded");
            }
        });

    });