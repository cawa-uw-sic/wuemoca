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
  },

  onPreview: function() {
    //window.open();
    var chart = this.lookupReference('chart');
    //chart.store.setData(App.service.Chart.data);
    //chart.redraw();

    if (Ext.os.is.Desktop) {
        chart.download({
            filename: 'chart.png'
        });
    } else {
        chart.preview();
    }
    //App.service.Chart.loadData();
    //chart.redraw();
  }

});
