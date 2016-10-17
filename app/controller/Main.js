Ext.define('App.controller.Main', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.main',

  interval: false,

  onAfterRender: function () {
    App.service.Map.setMainTitle();
  },



  onLegendBtn: function () {
    App.service.Helper.getComponentExt('legend-window').show();
  }

});