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

  //width: ((__Global.year.Max - __Global.year.Min)+1)*40,

  //height: 250,
  reference: 'chart'

});