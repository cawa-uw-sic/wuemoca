Ext.define('App.controller.Main', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.main',

  interval: false,

  onAfterRender: function () {
    App.service.Map.setMainTitle();
  },

  onPlay: function () {
    App.service.Yearslider.play();
  },

  onPause: function () {
    App.service.Yearslider.pause();
  },

  onLegendBtn: function () {
    App.service.Helper.getComponentExt('legend-window').show();
  }

});