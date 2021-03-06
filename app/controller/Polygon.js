/**
* user polygon toolbox controller
*/
Ext.define('App.controller.Polygon', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.polygon',

  onAfterRender: function () {
    App.service.Polygon.initialize();
  },
  //activate draw mode
  onActivate: function () {
    App.service.Polygon.activate();
    App.service.Helper.hideComponents(['polygon-btn-activate']);
    App.service.Helper.showComponents(['polygon-btn-deactivate']);
  },
  //deactivate draw mode
  onDeactivate: function () {
    App.service.Polygon.deactivate();
    App.service.Helper.hideComponents(['polygon-btn-deactivate']);
    App.service.Helper.showComponents(['polygon-btn-activate']);
  },

  onUpload: function (field) {
    var el = field.getEl().down('input[type=file]').dom;
    el.addEventListener('change', App.service.Polygon.uploadShapefile, false);
  },

  onFileSelection: function (field) {
    var fileInputEl = field.getTrigger('filebutton').component.fileInputEl.dom;
    fileInputEl.setAttribute('accept', '.zip');
  },

  onDownload: function (field){
    App.service.Exporter.setDownloadCombotext();
    App.service.Helper.getComponentExt('exporter-window').show();
    App.service.Helper.getComponentExt('exporter-window').addCls('polygon-window');
  },
  onImport: function(){
    App.service.Polygon.importPolygon();
  },

  onEdit: function (grid, rowIndex, colIndex) {
    var rec = grid.getStore().getAt(rowIndex);
    var uid = rec.get('uid');
    var polygon = App.service.Polygon.getPolygonFromUID(uid);
    App.service.Polygon.updateWindowEdit(polygon);
    App.service.Polygon.windowEdit.show();
  },

  /*onCalculate: function () {
    App.service.Polygon.calculate();
  },*/

  onRemove: function (grid, rowIndex, colIndex) {
    var rec = grid.getStore().getAt(rowIndex);
    var uid = rec.get('uid');
    var polygon = App.service.Polygon.getPolygonFromUID(uid);
    App.service.Polygon.removeSelectedPolygons(polygon);
  },
  onRemoveAll: function () {
    App.service.Polygon.removeAllPolygons();
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

  onDblClick: function(table, record, tr, rowIndex, e){
    if (record.data.extent){
      App.service.Helper.clearZoomCombos();
      App.service.Polygon.zoomToPolygon(record.data.extent);
    }
  },

  onClose: function () {
    App.service.Helper.getComponentExt('user-polygon').collapse();
  },

  onWUE: function () {
    var container = App.service.Helper.getComponentExt('app-wue-container');
    container.removeAll();
    container.add({ xtype: 'app-wue-form-by-year' });
    App.service.Helper.getComponentExt('wue-radio').setValue({period: "year"});
    App.service.Wue.window.show();
  },

  onProd: function () {
    App.service.Helper.getComponentExt('prod-radio').queryById('cotton').toggle(true);
    App.service.Prod.renderFormByYear('cotton');
    App.service.Prod.renderFormSecondary();
    App.service.Prod.window.show();
  },

  onLoss: function () {
    App.service.Loss.showWindow();
  }


});
