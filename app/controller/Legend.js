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
    App.service.Helper.getComponentExt('app-switcher-container-aggreg').setVisible(val);
    if (val == false){
      App.service.Chart.window.close();
    }
  },

  onOpacityIrrigation: function (el, val) {
    App.util.Layer.background[2].setOpacity(val / 100);
  },

  onOpacityCurrent: function (el, val) {
    App.util.Layer.current.setOpacity(val / 100);
  }

});