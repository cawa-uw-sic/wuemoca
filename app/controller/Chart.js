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
    //window.open();
    var chart = this.lookupReference('chart');
    //chart.store.setData(App.service.Chart.data);
    //var oldwidth = chart.getWidth();
    //chart.setWidth(((__Global.year.Max - __Global.year.Min)+1)*40);
    //chart.redraw();
    //chart.axes[1].setVisibleRange([0,1]);
    //setTimeout(function() {
      if (Ext.os.is.Desktop) {
          chart.download({
            filename: chart.up().up().getTitle().replace(/ /g,"_"),
            scale: 1.5
          });
      } else {
          chart.preview();
      }
      //App.service.Chart.loadData();
      //chart.setWidth(oldwidth);
    //}, 600);
  }

});
