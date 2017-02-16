Ext.define('App.controller.Main', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.main',

  interval: false,

  onMainAfterRender: function () {
  //App.service.Helper.getComponentExt('app-introwindow').show();

  },

  onMapAfterRender: function () {
    App.service.Map.setMainTitle();
    if(App.service.Watcher.get('Legend') == 'show'){
      App.service.Helper.getComponentExt('legend-window').show();
    }
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
    if (App.service.Helper.getComponentExt('report-cb-year').getValue() == null){
      App.service.Helper.getComponentExt('report-cb-year').setValue(__Global.year.Max);
    }
  }

});