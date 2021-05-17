// @ts-nocheck
sap.ui.define([
    "sap/ui/core/Control"
], function (Control) {

    return Control.extend("logaligroup.employees.controller.Signature", {

        metadata: {//propiedades HTML
            properties: {
                "width": {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "400px"
                },
                "height": {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "100px"
                },
                "bgcolor": {
                    type: "sap.ui.core.CSSColor",
                    defaultValue: "white"
                }
            }
        },

        onInit: function () {

        },

        renderer: function (oRM, oControl) {
            oRM.write("<div");
            oRM.addStyle("width", oControl.getProperty("width"));
            oRM.addStyle("height", oControl.getProperty("height"));
            oRM.addStyle("background-color", oControl.getProperty("bgcolor"));
            oRM.addStyle("border", "1px solid black");
            oRM.writeStyles();
            oRM.write(">");
            oRM.write("<canvas width='" + oControl.getProperty("width") + "' " + "height='"
                + oControl.getProperty("height") + "'");
            oRM.write("></canvas>");
            oRM.write("</div>");
        },

        //una vez cargado el componente en la interfaz del usuario
        onAfterRendering: function () {
            var canvas = document.querySelector("canvas");
            try {
                this.signaturePad = new SignaturePad(canvas);//etiqueta con la libreria
                this.signaturePad.fill = false;
                canvas.addEventListener("mousedown", function () {
                    this.signaturePad.fill = true;//¿hay firma?
                }.bind(this));
            } catch (e) {
                console.error(e);
            }
        },

        clear: function () {
            this.signaturePad.clear();
            this.signaturePad.fill = false;
        },

        isFill: function () {
            return this.signaturePad.fill;//¿tenemos firma?
        },

        getSignature: function () {
            return this.signaturePad.toDataURL();//obtener imagen de la firma 
        },

        setSignature: function (signature) {
            this.signaturePad.fromDataURL(signature);//mostrar firma guardada en backend
        }

    });
}); 