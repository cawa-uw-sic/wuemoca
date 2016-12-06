Ext.define('App.controller.Polygon', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.polygon',

  onAfterRender: function () {
    App.service.Polygon.initialize();
  },

  onActivate: function () {
    App.service.Polygon.activate();
    App.service.Helper.hideComponents(['polygon-btn-activate']);
    App.service.Helper.showComponents(['polygon-btn-deactivate']);
  },

  onDeactivate: function () {
    App.service.Polygon.deactivate();
    App.service.Helper.hideComponents(['polygon-btn-deactivate']);
    App.service.Helper.showComponents(['polygon-btn-activate']);
  },

  onUpload: function (field) {
    var el = field.getEl().down('input[type=file]').dom;
    el.addEventListener('change', App.service.Polygon.uploadShapefile, false);
  },

  onEdit: function () {
    App.service.Polygon.updateWindowEdit();
    App.service.Polygon.windowEdit.show();
  },

  onCalculate: function () {
    App.service.Polygon.calculate();
  },

  onRemove: function () {
    App.service.Polygon.removeSelectedPolygons();
  },

  onFormSubmit: function (el, form, val) {
    App.service.Polygon.save(el.up().up().getValues());
    App.service.Polygon.windowEdit.close();
    App.service.Helper.enableComponents(['polygon-btn-calculate']);
  },

  onShowChart: function(){
    App.service.Polygon.showChartWindow();
  }

});