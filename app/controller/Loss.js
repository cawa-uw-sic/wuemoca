/**
* prod controller
*/
Ext.define('App.controller.Loss', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.loss',

  onFormSubmit: function () {
    App.service.Loss.submitData();
  },

  onExportInput: function (el) {
    App.service.Exporter.writeExcel(App.service.Loss.prepareExportData(Ext.getStore('loss')), 'yield_loss_input', 'Yield loss input');
    //App.service.Loss.exportData(App.service.Loss.prepareExportData(Ext.getStore('loss')));
  },

  onExportResult: function (el) {
    App.service.Exporter.writeExcel(App.service.Loss.prepareExportData(el.up().up().getStore()), 'yield_loss_result', 'Yield loss result');
    //App.service.Loss.exportData(App.service.Loss.prepareExportData(el.up().up().getStore()));
  },

  onImportInput: function (el, val) {
    App.service.Loss.importData(el.getEl().down('input[type=file]').dom.files[0]);
  },

  onFileSelection: function (field) {
    var fileInputEl = field.getTrigger('filebutton').component.fileInputEl.dom;
    fileInputEl.setAttribute('accept', '.xlsx');
  }

});
