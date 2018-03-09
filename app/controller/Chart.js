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
  * @method onTransfer
  * import geometry and values to user polygons
  */
  onTransfer: function() {
    App.service.Helper.getComponentExt('user-polygon').expand();
    App.service.Polygon.switchView(true);
    App.service.Polygon.importPolygon();
  },
  /**
  * @method onCalculate
  * open indicator calculation window
  */
  onCalculate: function() {
    var container = App.service.Helper.getComponentExt('app-wue-container');
    container.removeAll();
    container.add({ xtype: 'app-wue-form-by-year' });
    App.service.Helper.getComponentExt('wue-radio').setValue({period: "year"});
    App.service.Wue.window.show();
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
  },
  onCropPrices: function() {
    this.CropPriceWindow.show();
  }
});
