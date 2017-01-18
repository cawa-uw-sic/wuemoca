Ext.define('App.view.polygon.Grid', {
  extend: 'Ext.grid.Panel',

  requires: [
    'App.controller.Polygon',
    'App.store.PolygonGrid'
  ],

  xtype: 'app-polygon-grid',

  itemId: 'polygon-grid',

  controller: 'polygon',

  height: 400,
  scrollable: true,

  store: {
    type: 'polygongrid'
  },
  /*selModel: {
      mode: 'MULTI'
  },*/
  columns:[
    {
      text: 'Polygon name',
      dataIndex: 'name'
    },
    {
      text: 'status'
    }
  ],
  listeners:{
    select: 'onSelect',
    rowdblclick: 'onDblClick'
  }

});