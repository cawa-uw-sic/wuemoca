Ext.define('App.controller.Legend', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.legend',

  onIrrigationExtent: function (el, val) {
    BackgroundLayers.irrigation.setVisible(val);
    //App.util.Layer.irrigVisible = val;
    App.service.Watcher.set('IrrigationExtent', val);
  },

  onCurrentLayer: function (el, val) {
    App.util.Layer.current.setVisible(val);
    App.util.Layer.admin.setVisible(val);
    App.service.Helper.getComponentExt('app-switcher-container-aggreg').setVisible(val);
    var indicator = App.service.Watcher.getIndicator();
    if (val && indicator.years){
      App.service.Helper.showComponents(['app-yearslider', 'yearslider-btn-play']);
      App.service.Yearslider.didRender();
    }
    else{
      App.service.Helper.hideComponents(['app-yearslider', 'yearslider-btn-pause', 'yearslider-btn-play']);
      App.service.Chart.window.close();
    }
    App.service.Watcher.set('Current', val);
  },

  onOpacityIrrigation: function (el, val) {
    BackgroundLayers.irrigation.setOpacity(val / 100);
  },

  onOpacityCurrent: function (el, val) {
    App.util.Layer.current.setOpacity(val / 100);
  }

});