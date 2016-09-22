Ext.define('App.view.chart.VPanel', {
  extend: 'Ext.panel.Panel',

  requires: [
    'Ext.layout.container.VBox',

    'App.controller.Chart'
  ],

  xtype: 'app-chart-vpanel',

  controller: 'chart',

  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },

  items: []
});