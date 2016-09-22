Ext.define('App.view.chart.HBar', {
  extend: 'Ext.chart.CartesianChart',

  requires: [
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category',
    'Ext.chart.series.Bar'
  ],

  xtype: 'app-chart-hbar',

  reference: 'chart',

  colspan: 2,

  width: 463,

  height: 130,

  animate: true,

  flipXY: true

});