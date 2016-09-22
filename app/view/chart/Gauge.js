Ext.define('App.view.chart.Gauge', {
  extend: 'Ext.chart.PolarChart',

  requires: [
    'Ext.chart.axis.Numeric',
    'Ext.chart.series.Gauge',
    'Ext.chart.series.sprite.PieSlice'
  ],

  xtype: 'app-chart-gauge',

  animate: true,

  width: 300,

  height: 240

});