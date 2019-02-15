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
  /**
  * @method onTransfer
  * import geometry and values to user polygons
  */
  onTransfer: function() {
    App.service.Helper.getComponentExt('user-polygon').expand();

    App.service.Polygon.importPolygon(); 
    App.service.Polygon.switchView(true);
  },
  /**
  * @method onCalculateWUE
  * open WUE calculation window
  */
  onCalculateWUE: function() {
    var container = App.service.Helper.getComponentExt('app-wue-container');
    container.removeAll();
    container.add({ xtype: 'app-wue-form-by-year' });
    App.service.Helper.getComponentExt('wue-radio').setValue({period: "year"});
    App.service.Wue.window.show();
  },  
  /**
  * @method onCalculateProd
  * open Prod calculation window
  */
  onCalculateProd: function() {
    App.service.Helper.getComponentExt('prod-radio').queryById('cotton').toggle(true);
    App.service.Prod.renderFormByYear('cotton');
    App.service.Prod.renderFormSecondary();
    App.service.Prod.window.show();
  },    

  /**
  * @method onPreview
  * Show image of chart
  */
  onPreview: function() {
    var chart = this.lookupReference('chart');
    if (Ext.os.is.Desktop) {
        chart.download({
          filename: encodeURIComponent(chart.up().up().getTitle()
            .replace(/ - /g,'_')
            .replace(/ /g,'_')
            .replace(/<sub>/g,'')
            .replace(/<\/sub>/g,'')
            .replace(/\[/g,'')
            .replace(/\]/g,'')
            .replace(/\(/g,'')
            .replace(/\)/g,'')            
            .replace(/:/g,'')
            .replace(/\//g,'_')
            .replace(/\$/g,'USD')
            .replace(/%/g,'perc')
            .replace(/³/g,'3')),
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
