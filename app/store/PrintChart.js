Ext.define('App.store.PrintChart', {
  extend: 'Ext.data.Store',

  alias: 'store.printchart',

  storeId: 'printchart',

  fields: [ 'id','name','cotton', 'wheat', 'rice', 'years' ],

  data: [],

  proxy: {
    type: __Global.proxy.Type,
    url: __Global.api.PrintChart,
    reader: {
      type: __Global.proxy.Reader
    }
  }
});
