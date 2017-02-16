Ext.define('App.controller.Legend', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.legend',

  onIrrigationExtent: function (el, val) {
    BackgroundLayers.irrigation.setVisible(val);
    //App.util.Layer.irrigVisible = val;
    App.service.Watcher.set('IrrigationExtent', val ? 'show' : 'noshow');
  },

  onCurrentLayer: function (el, val) {
    if (!!App.util.Layer.current){
      App.util.Layer.current.setVisible(val);
    }
    if (!!App.util.Layer.admin){
      App.util.Layer.admin.setVisible(val);
    }
    App.service.Map.hideShowElements(val);
    App.service.Watcher.set('Current', val ? 'show' : 'noshow');
  },

  onOpacityIrrigation: function (el, val) {
    BackgroundLayers.irrigation.setOpacity(val / 100);
  },

  onOpacityCurrent: function (el, val) {
    App.util.Layer.current.setOpacity(val / 100);
  }

});