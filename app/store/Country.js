Ext.define('App.store.Country', {
  extend: 'Ext.data.Store',

  alias: 'store.country',

  model: 'App.model.Country',

  storeId: 'country',

  autoLoad: true,

  proxy: {
    type: __Global.proxy.Type,
    url: __Global.api.Country,
    reader: {
      type: __Global.proxy.Reader
    }
  },

  listeners: {
    load: function (store, records, successful, operation, eOpts) {
      if (successful) {
        App.service.Helper.setComponentsValue([
          { id: 'zoom-cb-country', selection: 'Country' }
        ]);
      }
    }
  }
});