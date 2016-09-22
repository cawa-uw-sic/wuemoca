Ext.define('App.view.chart.VBar', {
  extend: 'Ext.chart.Chart',

  requires: [
    'Ext.chart.interactions.ItemHighlight',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category',
    'Ext.chart.series.Bar'
  ],

  xtype: 'app-chart-vbar',

  animate: true,

  width: 300,

  height: 240

});