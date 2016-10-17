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
    height: 28,
    defaults : {
      height : 18  
    },
    items:
    [ 
      { xtype: 'button', style:{padding: '0px 7px'}, text: i18n.exp.tableExcel, handler: 'onExcel' }
      ,{ xtype: 'tbfill' }
      ,{ xtype: 'button', style:{padding: '0px 7px'}, text: '<<', tooltip: 'show previous year', handler: 'onPrev' }
      ,{ xtype: 'button', style:{padding: '0px 7px'}, text: '>>', tooltip: 'show next year', handler: 'onNext' }
    ]
  }
});