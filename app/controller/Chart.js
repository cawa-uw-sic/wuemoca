Ext.define('App.controller.Chart', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.chart',

  requires: [
    'App.service.Chart'
  ],

  display: function (e) {
    console.log('from controller');
  },

  /*onPrev: function () {
    App.service.Chart.prev();
  },

  onNext: function () {
    App.service.Chart.next();
  },*/

  onExcel: function () {
    App.service.Helper.JSONToCSVConvertor();
  },

  onPreview: function() {
    var chart = this.lookupReference('chart');
    if (Ext.os.is.Desktop) {
        chart.download({
          filename: chart.up().up().getTitle().replace(/ /g,"_"),
          scale: 1.5
        });
    } else {
        chart.preview();
    }
  }
});
