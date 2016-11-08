Ext.define('App.view.chart.FPanel', {
  extend: 'Ext.panel.Panel',

  requires: [
    'Ext.layout.container.Fit',

    'App.controller.Chart'
  ],

  xtype: 'app-chart-fpanel',

  controller: 'chart',
//scrollable:true,
  layout: 'fit',

  items: [],

  bbar: {  
    height: 32,
    defaults : {
      height : 22  
    },
    items:
    [ 
      { xtype: 'button', style:{padding: '0px 7px'}, text: i18n.exp.tableExcel, iconCls: 'x-fa  fa-file-excel-o', handler: 'onExcel' }
      ,{ xtype: 'tbfill' }
     /* ,{ xtype: 'button', style:{padding: '0px 7px'}, text: '<<', tooltip: 'show previous year', handler: 'onPrev' }
      ,{ xtype: 'button', style:{padding: '0px 7px'}, text: '>>', tooltip: 'show next year', handler: 'onNext' }*/
      ,{ xtype: 'button', style:{padding: '0px 7px'}, text: 'Chart as PNG', handler: 'onPreview' }
    ]
  }
});