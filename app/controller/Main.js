Ext.define('App.controller.Main', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.main',

  interval: false,

  onMainAfterRender: function () {
  //App.service.Helper.getComponentExt('app-introwindow').show();
  },

  onMapAfterRender: function () {
    App.service.Map.setMainTitle();
    App.service.Helper.getComponentExt('legend-cx-irrigation').setValue(App.service.Watcher.get('IrrigationExtent'));  
    App.service.Helper.getComponentExt('legend-cx-current').setValue(App.service.Watcher.get('Current'));     
  },

  onLegendBtn: function () {
    App.service.Helper.getComponentExt('legend-window').show();
  },

  onShowPolygon: function () {
    console.log('onShowPolygon');    
    App.service.Polygon.switchView(true);
  },

  onHidePolygon: function () {
    console.log('onHidePolygon');
    App.service.Polygon.switchView(false);
  },

  onSatelliteBtn: function (button, e) {
    if (BackgroundLayers.satellite.getVisible()){
      button.setText(i18n.map.onSatellite);
      BackgroundLayers.satellite.setVisible(false);
      BackgroundLayers.osm.setVisible(true);
      BackgroundLayers.ocm.setVisible(true);
    }
    else{
      button.setText(i18n.map.offSatellite);
      BackgroundLayers.satellite.setVisible(true);
      BackgroundLayers.osm.setVisible(false);
      BackgroundLayers.ocm.setVisible(false);      
    }
  }

});