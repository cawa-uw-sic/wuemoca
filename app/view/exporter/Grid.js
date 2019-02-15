Ext.define('App.view.exporter.Grid', {
  extend: 'Ext.grid.Panel',

  requires: [
    'App.controller.Exporter',
    'App.store.ExporterGrid'
  ],

  xtype: 'app-exporter-grid',

  itemId: 'exporter-grid',

  controller: 'exporter',

  flex: 1,

  scrollable: true,

  store: {
    type: 'exportergrid'
  },
  /*selModel: {
      mode: 'MULTI'
  },*/

  columns:[

    {
      text: i18n.acronyms.acronym,
      dataIndex: 'field',
      width: 110,
      hideable: false,
      sortable: false,
      menuDisabled: true
    },
    {
      text: i18n.acronyms.name,
      dataIndex: 'name',
      //width: 300,
      flex: 1,
      hideable: false,
      sortable: false,
      menuDisabled: true,
      cellWrap: true
    },
    {
      text: i18n.acronyms.crops,
      dataIndex: 'crops',
      width: 125,
      hideable: false,
      sortable: false,
      menuDisabled: true,
      cellWrap: true
    }  
    // {
    //     xtype:'actioncolumn',
    //     //text: i18n.polygon.tools,
    //     width: 45,
    //     hideable: false,
    //     sortable: false,
    //     headerWrap: true,
    //     text: '<a data-qtip="' + i18n.polygon.removeAll + '"><i class="fa fa-remove" style="font-size: 20px;"></i></a>',
    //     items: [{
    //         iconCls: 'x-fa fa-cog',
    //         tooltip: i18n.polygon.edit,
    //         handler: 'onEdit'
    //      },{
    //        /* iconCls: 'x-fa fa-bar-chart',
    //         tooltip: i18n.polygon.showChart,
    //         handler: 'onShowChart'
    //       },{*/
    //         iconCls: 'x-fa fa-remove',
    //         tooltip: i18n.polygon.remove,
    //         handler: 'onRemove'
    //     }],
    //     listeners: {
    //         headerclick: 'onRemoveAll'
    //     }
    // }
  ],
  features: [{
    ftype:'grouping',
    groupHeaderTpl: '{name}',
    collapsible: false,
    collapseTip: ''
  }],
  listeners:{
    //select: 'onSelect',
    //rowdblclick: 'onDblClick'
  }

});