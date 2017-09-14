Ext.define('App.view.chart.VBar', {
  extend: 'Ext.chart.CartesianChart',

  requires: [
    'Ext.chart.interactions.ItemHighlight',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category',
    'Ext.chart.series.Bar'
  ],

  xtype: 'app-chart-vbar',

  animate: true,
  store  : App.service.Chart.stores.defaults,
  reference: 'chart'

});