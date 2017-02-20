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

  onDownload: function (field){
    App.service.Polygon.downloadOptions();
  },
  /*onEdit: function () {
    App.service.Polygon.updateWindowEdit();
    App.service.Polygon.windowEdit.show();
  },*/
  onEdit: function (grid, rowIndex, colIndex) {
    var rec = grid.getStore().getAt(rowIndex);
    var uid = rec.get('uid');
    var polygon = App.service.Polygon.getPolygonFromUID(uid);
    App.service.Polygon.updateWindowEdit(polygon);
    App.service.Polygon.windowEdit.show();
  },

  onCalculate: function () {
    App.service.Polygon.calculate();
  },

  onRemove: function (grid, rowIndex, colIndex) {
    var rec = grid.getStore().getAt(rowIndex);
    var uid = rec.get('uid');
    var polygon = App.service.Polygon.getPolygonFromUID(uid);     
    App.service.Polygon.removeSelectedPolygons(polygon);
  },

  onFormSubmit: function (el, form, val) {
    App.service.Polygon.save(el.up().up().getValues(false, true, false, false));
    App.service.Polygon.windowEdit.close();
    //App.service.Helper.enableComponents(['polygon-btn-calculate']);
  },

  /*onShowChart: function (grid, rowIndex, colIndex) {
    var rec = grid.getStore().getAt(rowIndex);
    var uid = rec.get('uid');
    var polygon = App.service.Polygon.getPolygonFromUID(uid);    
    App.service.Polygon.showChartWindow(polygon);
  },*/

  onSelect: function(rowmodel, record, index){
    App.service.Polygon.selectFeatureFromGrid(record.data.uid);
  },
  onDblClick: function( table , record , tr , rowIndex , e){
    if (record.data.extent){
      App.service.Polygon.zoomToPolygon(record.data.extent);
    }
  }

});