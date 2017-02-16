Ext.define('App.store.PolygonGrid', {
  extend: 'Ext.data.Store',

  alias: 'store.polygongrid',

  storeId: 'polygongrid',

  fields: ['uid','name','extent'],

  data: App.service.Polygon.getGridData(),

  proxy: {
    type: 'memory',
    reader: {
      type: 'json'
    }
  }
});
