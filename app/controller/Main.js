Ext.define('App.controller.Main', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.main',

  interval: false,

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
  },

  onReportWindow: function () {
    App.service.Helper.getComponentExt('report-cb-year').getStore().setData(App.service.Report.getYearData());
  }

});