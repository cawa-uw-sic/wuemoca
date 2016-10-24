Ext.define('App.controller.Chart', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.chart',

  requires: [
    'App.service.Chart'
  ],

  display: function (e) {
    console.log('from controller');
  },

  onPrev: function () {
    App.service.Chart.prev();
  },

  onNext: function () {
    App.service.Chart.next();
  },

  onExcel: function () {
    App.service.Helper.JSONToCSVConvertor();
  }

});
