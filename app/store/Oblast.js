Ext.define('App.store.Oblast', {
  extend: 'Ext.data.Store',

  alias: 'store.oblast',

  model: 'App.model.Oblast',

  storeId: 'oblast',

  proxy: {
    type: __Global.proxy.Type,
    url: __Global.api.Oblast,
    reader: {
      type: __Global.proxy.Reader
    }
  },

  listeners: {
    load: function (store, records , successful , operation , eOpts) {
      if (successful) {
        App.service.Helper.setComponentsValue([
          { id: 'zoom-cb-oblast', selection: 'Oblast' }
        ]);
      }
    }
  }
});