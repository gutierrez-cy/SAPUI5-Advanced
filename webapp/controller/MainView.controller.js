sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller) {
        "use strict";
        //ZONA PRIVADA
        function myCheck() {
            var inputEmployee = this.byId("inputEmployee"); //Se recupera todas las proiedades del input
            var valueEmployee = inputEmployee.getValue(); //Se recupera el valor del input

            if (valueEmployee.length === 6) {
                //inputEmployee.setDescription("Ok");
                this.byId("labelCountry").setVisible(true);
                this.byId("slCountry").setVisible(true);
            } else {
                //inputEmployee.setDescription("Not Ok");
                this.byId("labelCountry").setVisible(false);
                this.byId("slCountry").setVisible(false);
            };
        }

        return Controller.extend("logaligroup.employees.controller.MainView", {
            onInit: function () {

            },

            onValidate: myCheck //funcion declarada en ka zona privada
        });
    });
