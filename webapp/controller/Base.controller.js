// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {

    return Controller.extend("logaligroup.employees.controller.Base", {


        onInit: function () {

        },
        toOrderDetails: function (oEvent) {
            var orderID = oEvent.getSource().getBindingContext("odataNorthwind").getObject().OrderID; //identificadro sobre el pedido orderID
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteOrderDetails", { //se le pasa el orderid al enrutamiento creado en el manifest
                OrderID: orderID
            });
        }

    });
}); 