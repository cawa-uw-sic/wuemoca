Ext.define('App.controller.Main', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.main',

  interval: false,

  onMainAfterRender: function () {
    //App.service.Helper.getComponentExt('app-introwindow').show();
  },

  onMapAfterRender: function () {
    App.service.Map.setMainTitle();
  },

  onLegendBtn: function () {
    App.service.Helper.getComponentExt('legend-window').show();
  },

  onShowPolygon: function () {
    App.service.Polygon.switchView(true);
  },

  onHidePolygon: function () {
    App.service.Polygon.switchView(false);
  },

  onSatelliteBtn: function () {
    BackgroundLayers.satellite.setVisible(!BackgroundLayers.satellite.getVisible());
  }

});