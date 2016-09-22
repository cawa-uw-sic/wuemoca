Ext.define('App.store.Indicator', {
  extend: 'Ext.data.Store',

  alias: 'store.indicator',

  storeId: 'indicator',

  fields: [ 'id', 'enName', 'ruName', 'enUnit', 'ruUnit', 'crops', 'aggreg', 'years' ],

  data: __Indicator,

  proxy: {
    type: 'memory',
    reader: {
      type: 'json'
    }
  }
});
