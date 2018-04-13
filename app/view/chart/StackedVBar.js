Ext.define('App.view.chart.StackedVBar', {
  extend: 'Ext.chart.CartesianChart',

  requires: [
    'Ext.chart.interactions.ItemHighlight',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category',
    'Ext.chart.series.Bar',
    'App.view.chart.Croptheme',
    'App.view.chart.Watertheme'
  ],

  xtype: 'app-chart-stackedvbar',
  //theme: 'croptheme',
  animate: true,

  legend: {
    docked: 'bottom'
  },
  store  : App.service.Chart.stores.defaults, 
  reference: 'chart',

  listeners: {
    boxready: function(chart){
      chart.legend.setWidth((((__Global.year.Max - __Global.year.Min)+1) * __Global.chart.BarWidth) - 20);
    }
  }

});