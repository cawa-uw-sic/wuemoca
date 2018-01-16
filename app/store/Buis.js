Ext.define('App.store.Buis', {
  extend: 'Ext.data.Store',

  alias: 'store.buis',

  model: 'App.model.Buis',

  storeId: 'buis',

  proxy: {
    type: __Global.proxy.Type,
    url: __Global.api.Buis,
    reader: {
      type: __Global.proxy.Reader
    }
  },

  listeners: {
    load: function ( store, records , successful , operation , eOpts) {
      if (successful){
        App.service.Helper.setComponentsValue([
          { id: 'zoom-cb-buis', selection: 'Buis' }
        ]);
      }
    }
  }
});