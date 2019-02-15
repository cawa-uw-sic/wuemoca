Ext.define('App.store.ExporterGrid', {
  extend: 'Ext.data.Store',

  alias: 'store.exportergrid',

  storeId: 'exportergrid',

  fields: ['field','name','group','groupsort','crops','tooltip'],
  grouper:{
    property: 'group',
    //sort groups by groupsort
    sorterFn: function(a, b) {
      return a.get('groupsort') > b.get('groupsort') ? 1 : -1;
    }    
  },

  data: [],

  proxy: {
    type: 'memory',
    reader: {
      type: 'json'
    }
  }
});
