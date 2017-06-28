Ext.define('App.view.chart.FPanel', {
  extend: 'Ext.panel.Panel',

  requires: [
    'Ext.layout.container.Fit',

    'App.controller.Chart'
  ],

  xtype: 'app-chart-fpanel',

  controller: 'chart',

  layout: 'fit',

  items: [],

  bbar: {  
    items: []
  }
});