Ext.define('App.view.polygon.Grid', {
  extend: 'Ext.grid.Panel',

  requires: [
    'App.controller.Polygon',
    'App.store.PolygonGrid'
  ],

  xtype: 'app-polygon-grid',

  itemId: 'polygon-grid',

  controller: 'polygon',

  flex: 1,

  scrollable: true,

  store: {
    type: 'polygongrid'
  },
  /*selModel: {
      mode: 'MULTI'
  },*/

  columns:[

    {
      text: i18n.polygon.name,
      dataIndex: 'name',
      width: 105,
      hideable: false,
      menuDisabled: true
    },
    {
        xtype:'actioncolumn',
        //text: i18n.polygon.tools,
        width: 45,
        hideable: false,
        items: [{
            iconCls: 'x-fa fa-cog',
            tooltip: i18n.polygon.edit,
            handler: 'onEdit'
         },{
           /* iconCls: 'x-fa fa-bar-chart',
            tooltip: i18n.polygon.showChart,
            handler: 'onShowChart'
          },{*/
            iconCls: 'x-fa fa-remove',
            tooltip: i18n.polygon.remove,
            handler: 'onRemove'
        }]
    }
  ],
  listeners:{
    select: 'onSelect',
    rowdblclick: 'onDblClick'
  }

});