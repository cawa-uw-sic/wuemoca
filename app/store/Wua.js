Ext.define('App.store.Wua', {
  extend: 'Ext.data.Store',

  alias: 'store.wua',

  model: 'App.model.Wua',

  storeId: 'wua',

  proxy: {
    type: __Global.proxy.Type,
    url: __Global.api.Wua,
    reader: {
      type: __Global.proxy.Reader
    }
  },

  listeners: {
    load: function (store, records , successful , operation , eOpts) {
      if (successful) {
        App.service.Helper.setComponentsValue([
          { id: 'zoom-cb-wua', selection: 'Wua' }
        ]);
        if (store.totalCount == 0){
          App.service.Helper.hideComponents(['zoom-cb-wua']);
        }
        else{
          App.service.Helper.showComponents(['zoom-cb-wua']);
        }
      }
    }
  }
});