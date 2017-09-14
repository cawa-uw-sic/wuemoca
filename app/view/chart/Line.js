Ext.define('App.view.chart.Line', {
  extend: 'Ext.chart.CartesianChart',

  requires: [
    'Ext.chart.interactions.ItemHighlight',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category',
    'Ext.chart.series.Line'
  ],

  xtype: 'app-chart-line',

  animate: true,
  store  : App.service.Chart.stores.defaults,
  reference: 'chart'

});