/**
* chart controller
*/
Ext.define('App.controller.Chart', {

  extend: 'Ext.app.ViewController',

  alias: 'controller.chart',

  requires: [
    'App.service.Chart',
    'App.view.chart.CropPriceWindow'
    //'App.view.header.IntroWindow'
  ],
  init: function () {
    this.CropPriceWindow = Ext.create('App.view.chart.CropPriceWindow');
    //this.IntroWindow = Ext.create('App.view.header.IntroWindow');
  },
  /*display: function (e) {
    console.log('from controller');
  },*/

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
  /*onExcel: function () {
    App.service.Helper.JSONToHTMLConvertor('all');
  },*/

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
  },
  onCropPrices: function() {
    this.CropPriceWindow.show();
  }
});
