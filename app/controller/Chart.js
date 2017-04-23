/**
* chart controller
*/
Ext.define('App.controller.Chart', {

  extend: 'Ext.app.ViewController',

  alias: 'controller.chart',

  requires: [
    'App.service.Chart'
  ],

  display: function (e) {
    console.log('from controller');
  },

  /*onPrev: function () {
    App.service.Chart.prev();
  },

  onNext: function () {
    App.service.Chart.next();
  },*/

  /**
  * @method onExcel
  * Create Excel file with all indicators for selected object. {@link }
  */  
  onExcel: function () {
    App.service.Helper.JSONToHTMLConvertor();
  },

  /**
  * @method onPreview
  * Show image of chart
  */
  onPreview: function() {
    var chart = this.lookupReference('chart');
    if (Ext.os.is.Desktop) {
        chart.download({
          filename: encodeURIComponent(chart.up().up().getTitle().replace(/ /g,"_")),
          scale: 1.5
        });
    } else {
        chart.preview();
    }
  }
});
