/**
* controller for exporter panel
*/
Ext.define('App.controller.Exporter', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.exporter',

  /**
  * @method onReport
  * show report window
  */
  onReport: function () {
    App.service.Report.window.show();
  },
  /**
  * @method onDownloadWindow
  * show exporter window
  */
  onDownloadWindow: function () {
    App.service.Helper.getComponentExt('exporter-window').show();
  },  
  onAcronymPDF: function(){
     App.service.Helper.openDocument(__Global.urls.AcronymPDF, 'acronympdf');
  },
  /**
  * @method onDownloadSelection
  * check if download button can be enabled
  */
  onDownloadSelection: function (cb, val) {
    if (!val || val.indexOf('no_') != -1){
      App.service.Helper.getComponentExt('exporter-btn-submit').setDisabled(true);
    }
    else{
      App.service.Helper.getComponentExt('exporter-btn-submit').setDisabled(false);      
    }
  },  
  onFormSubmit: function (el, form, val) {
    var vals = el.up().up().getValues();
    App.service.Exporter.download(vals);
    App.service.Helper.getComponentExt('exporter-window').hide();
  }

  /**
  * @method onAggregation
  * when aggregation is changed, check map filter, store new aggregation, set cb label with tooltip, update chart
  * @param cb
  * combobox
  * @param val
  * new value
  */
  /*onAggregation: function (cb, val) {
    App.service.Map.onAggregation(cb, val);
    //App.service.Helper.getComponentExt('switcher-cb-aggregation').setValue(val);
  }*/

});
