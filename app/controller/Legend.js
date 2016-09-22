Ext.define('App.controller.Legend', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.legend',

  onIrrigationExtent: function (el, val) {
    App.util.Layer.background[2].setVisible(val);
    App.util.Layer.irrigVisible = val;
    App.service.Watcher.set('IrrigationExtent', val);
  },

  onCurrentLayer: function (el, val) {
    App.util.Layer.current.setVisible(val);
    App.util.Layer.admin.setVisible(val);
  },

  onOpacityIrrigation: function (el, val) {
    App.util.Layer.background[2].setOpacity(val / 100);
  },

  onOpacityCurrent: function (el, val) {
    App.util.Layer.current.setOpacity(val / 100);
  }

});