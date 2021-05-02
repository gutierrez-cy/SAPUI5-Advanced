sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
	 */
    function (Controller, Filter, FilterOperator) {
        "use strict";
        //ZONA PRIVADA

        function onInit() {

            var oView = this.getView();
            //var i18nBundle = oView.getModel("i18n").getResourceBundle(); //se recupera los recursos del modelo i18n del manifest.json

            var oJSONModelEmpl = new sap.ui.model.json.JSONModel();
            oJSONModelEmpl.loadData("./localService/mockdata/Employees.json", false); //carga de los datos desde la carpeta 
            oView.setModel(oJSONModelEmpl, "jsonEmployees");

            var oJSONModelCountries = new sap.ui.model.json.JSONModel();
            oJSONModelCountries.loadData("./localService/mockdata/Countries.json", false); //carga de los datos desde la carpeta 
            oView.setModel(oJSONModelCountries, "jsonCountries");

            var oJSONModelConfig = new sap.ui.model.json.JSONModel({
                visibleID: true,
                visibleName: true,
                visbleCountry: true,
                visibleCity: false,
                visibleBtnShowCity: true,
                visibleBtnHideCity: false
            });
            oView.setModel(oJSONModelConfig, "jsonModelConfig");
        };

        function onFilter() {
            var oJSONCountries = this.getView().getModel("jsonCountries").getData(); //Obtener los datos del modelo
            var filters = [];
            if (oJSONCountries.EmployeeId !== "") {
                filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSONCountries.EmployeeId));
            }
            if (oJSONCountries.CountryKey !== "") {
                filters.push(new Filter("Country", FilterOperator.EQ, oJSONCountries.CountryKey));
            }

            var oList = this.getView().byId("tableEmployee"); //obtener listado de la tabla para que se actulice
            var oBinding = oList.getBinding("items"); //se le pasa los items de la tabla
            oBinding.filter(filters);
        };

        function onClearFilter() {
            var oModel = this.getView().getModel("jsonCountries");
            oModel.setProperty("/EmployeeId", "");
            oModel.setProperty("/CountryKey", "");
        };

        function showPostalCode(oEvent) {
            var itemPressed = oEvent.getSource(); //ver cual es el item que se ha pulsado
            var oContext = itemPressed.getBindingContext("jsonEmployees"); //en base al item pulsado, se obtiene el contexto
            var objectContext = oContext.getObject(); //objeto que tenemos sobre el contexto, elemento que se quiere mostrar

            sap.m.MessageToast.show(objectContext.PostalCode);
        };

        function onShowCity() {
            var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
            oJSONModelConfig.setProperty("/visibleCity", true); //se pasa el valor true a la propiedad city
            oJSONModelConfig.setProperty("/visibleBtnShowCity", false);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", true);
        };

        function onHideCity() {
            var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
            oJSONModelConfig.setProperty("/visibleCity", false); //se pasa el valor true a la propiedad city
            oJSONModelConfig.setProperty("/visibleBtnShowCity", true);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", false);
        };

        function showOrders(oEvent) {
            var ordersTable = this.getView().byId("ordersTable");

            ordersTable.destroyItems(); //para que no se duplique la informacion

            var itemPressed = oEvent.getSource(); //Elementos que se han pulsado
            var oContext = itemPressed.getBindingContext("jsonEmployees");

            var objectContext = oContext.getObject(); //objeto que tenemos sobre el contexto, elemento que se quiere mostrar
            var orders = objectContext.Orders;      //pedidos de la fila selecionada, los datos estan en el json (Orders)

            var ordersItems = [];

            for (var i in orders) {
                ordersItems.push(new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Label({ text: orders[i].OrderID }),
                        new sap.m.Label({ text: orders[i].Freight }),
                        new sap.m.Label({ text: orders[i].ShipAddress })
                    ]
                }));
            }

            var newTable = new sap.m.Table({
                width: "auto",
                columns: [
                    new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>orderID}" }) }),
                    new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>freight}" }) }),
                    new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>shipAddress}" }) })
                ],
                items: ordersItems
            }).addStyleClass("sapUiSmallMargin");

            ordersTable.addItem(newTable);

            //SEGUNDA TABLA
            var newTableJSON = new sap.m.Table();

            newTableJSON.setWidth("auto");
            newTableJSON.addStyleClass("sapUiSmallMargin");

            //Cabecera Columna OrderID
            var columnOrderID = new sap.m.Column();
            var labelOrderID = new sap.m.Label();
            labelOrderID.bindProperty("text", "i18n>orderID");
            columnOrderID.setHeader(labelOrderID);
            newTableJSON.addColumn(columnOrderID);
            //Cabecera Columna Freight
            var columnFreight = new sap.m.Column();
            var labelFreight = new sap.m.Label();
            labelFreight.bindProperty("text", "i18n>freight");
            columnFreight.setHeader(labelFreight);
            newTableJSON.addColumn(columnFreight);
            //Cabecera Columna ShipAddress
            var columnShipAddress = new sap.m.Column();
            var labelShipAddress = new sap.m.Label();
            labelShipAddress.bindProperty("text", "i18n>shipAddress");
            columnShipAddress.setHeader(labelShipAddress);
            newTableJSON.addColumn(columnShipAddress);

            var columnListItem = new sap.m.ColumnListItem();

            //Columna OrderID
            var cellOrderID = new sap.m.Label();
            cellOrderID.bindProperty("text", "jsonEmployees>OrderID");
            columnListItem.addCell(cellOrderID);
            //Columna Freight
            var cellFreight = new sap.m.Label();
            cellFreight.bindProperty("text", "jsonEmployees>Freight");
            columnListItem.addCell(cellFreight);
            //Columna ShipAddress
            var cellShipAddress = new sap.m.Label();
            cellShipAddress.bindProperty("text", "jsonEmployees>ShipAddress");
            columnListItem.addCell(cellShipAddress);

            var oBindingInfo = {
                model: "jsonEmployees",
                path: "Orders",
                template: columnListItem  
            };

            newTableJSON.bindAggregation("items", oBindingInfo);
            newTableJSON.bindElement("jsonEmployees>" + oContext.getPath());

            ordersTable.addItem(newTableJSON);
        }

        var Main = Controller.extend("logaligroup.employees.controller.MainView", {});

        Main.prototype.onValidate = function () {
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
            }
        };

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;
        Main.prototype.onShowCity = onShowCity;
        Main.prototype.onHideCity = onHideCity;
        Main.prototype.showOrders = showOrders;
        return Main;
    });
