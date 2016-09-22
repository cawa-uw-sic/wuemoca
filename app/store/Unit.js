Ext.define('App.store.Unit', {
  extend: 'Ext.data.Store',

  alias: 'store.unit',

  storeId: 'unit',

  fields: [ 'id', 'enName', 'ruName', 'items' ],

  data: __Aggregation,

  proxy: {
    type: 'memory',
    reader: {
      type: 'json'
    }
  }
});
