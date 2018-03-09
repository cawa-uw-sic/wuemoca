Ext.define('App.store.Rayon', {
  extend: 'Ext.data.Store',

  alias: 'store.rayon',

  model: 'App.model.Rayon',

  storeId: 'rayon',

  proxy: {
    type: __Global.proxy.Type,
    url: __Global.api.Rayon,
    reader: {
      type: __Global.proxy.Reader
    }
  },

  listeners: {
    load: function (store, records , successful , operation , eOpts) {
      if (successful) {
        App.service.Helper.setComponentsValue([
          { id: 'zoom-cb-rayon', selection: 'Rayon' }
        ]);
      }
    }
  }
});