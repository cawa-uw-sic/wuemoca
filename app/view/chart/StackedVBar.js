Ext.define('App.view.chart.StackedVBar', {
  extend: 'Ext.chart.CartesianChart',

  requires: [
    'Ext.chart.interactions.ItemHighlight',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category',
    'Ext.chart.series.Bar',
    'App.view.chart.Croptheme'
  ],

  xtype: 'app-chart-stackedvbar',
  theme: 'croptheme',
  animate: true,

  legend: {
    docked: 'bottom'
  },

  width: 300,

  height: 240

});