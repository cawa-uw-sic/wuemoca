/**
* main controller
*/
Ext.define('App.controller.Main', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.main',

  interval: false,

  /*onMainAfterRender: function () {
  //App.service.Helper.getComponentExt('app-introwindow').show();
  },*/
  
  /**
  * @method onMapAfterRender
  * show legend window if Legend='show' in localStorage
  */
  onMapAfterRender: function () {
    App.service.Map.setMainTitle();
    if (App.service.Watcher.get('Legend') == 'show'){
      App.service.Helper.getComponentExt('legend-window').show();
    }
    //App.service.Helper.getComponentExt('header-introwindow').show();    
  },

  /**
  * @method onLegendBtn
  * show legend window
  */
  onLegendBtn: function () {
    App.service.Helper.getComponentExt('legend-window').show();
  },

  /**
  * @method onShowPolygon
  * settings for user polygon mode
  */
  onShowPolygon: function () {
    App.service.Polygon.switchView(true);
  },

  /**
  * @method onHidePolygon
  * settings for default mode
  */
  onHidePolygon: function () {
    App.service.Polygon.switchView(false);
  },

  /**
  * @method onSatelliteBtn
  * switch satellite map on and off
  * @param button
  * button
  * @param e
  * click event    
  */
  onSatelliteBtn: function (button, e) {
    if (BackgroundLayers.satellite.getVisible()){
      button.setText(i18n.map.onSatellite);
      BackgroundLayers.satellite.setVisible(false);
      BackgroundLayers.osm.setVisible(true);
      BackgroundLayers.ocm.setVisible(true);
      //BackgroundLayers.street.setVisible(true);
    }
    else{
      button.setText(i18n.map.offSatellite);
      BackgroundLayers.satellite.setVisible(true);
      BackgroundLayers.osm.setVisible(false);
      BackgroundLayers.ocm.setVisible(false); 
      //BackgroundLayers.street.setVisible(false);     
    }
  },
  /**
  * @method onReportWindow
  * open report window and set year
  */
  onReportWindow: function () {
    App.service.Helper.getComponentExt('report-cb-year').getStore().setData(App.service.Report.getYearData());
    if (App.service.Helper.getComponentExt('report-cb-year').getValue() == null){
      App.service.Helper.getComponentExt('report-cb-year').setValue(__Global.year.Max);
    }
  },

  /**
  * @method onVideoHeader
  * open video URL
  */
  onVideoHeader: function () {
    App.service.Helper.openDocument(__Global.urls.VideoHeader, 'videoheader');
    App.service.Helper.getComponentExt('header-introwindow').hide();
  }

});