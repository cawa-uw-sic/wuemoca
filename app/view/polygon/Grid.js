Ext.define('App.view.polygon.Grid', {
  extend: 'Ext.grid.Panel',

  requires: [
    'App.controller.Polygon',
    'App.store.PolygonGrid'
  ],

  xtype: 'app-polygon-grid',

  itemId: 'polygon-grid',

  controller: 'polygon',

  //height: 400,

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
      dataIndex: 'name'
    },
    {
        xtype:'actioncolumn',
        text: i18n.polygon.tools,
        width:70,
        items: [{
            iconCls: 'x-fa fa-cog',
            tooltip: i18n.polygon.edit,
            handler: 'onEdit'
         },{
            iconCls: 'x-fa fa-bar-chart',
            tooltip: i18n.polygon.showChart,
            handler: 'onShowChart'
          },{
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