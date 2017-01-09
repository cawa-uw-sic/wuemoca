Ext.define('App.store.Uis', {
  extend: 'Ext.data.Store',

  alias: 'store.uis',

  model: 'App.model.Uis',

  storeId: 'uis',

  proxy: {
    type: __Global.proxy.Type,
    url: __Global.api.Uis,
    reader: {
      type: __Global.proxy.Reader
    }
  },

  listeners: {
    load: function (store, records , successful , operation , eOpts) {
      if (successful) {
        App.service.Helper.setComponentsValue([
          { id: 'zoom-cb-uis', selection: 'Uis' }
        ]);
        /*if (store.count() > 0){
          var allUisBuis = store.getAt(0).get('name');
          App.service.Helper.getComponentExt('zoom-cb-uis').setEmptyText(allUisBuis);
        }*/
      }
    }
  }
});