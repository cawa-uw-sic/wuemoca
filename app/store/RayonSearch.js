Ext.define('App.store.RayonSearch', {
  extend: 'Ext.data.Store',

  alias: 'store.rayonsearch',

  model: 'App.model.Rayon',

  storeId: 'rayonsearch',

  autoLoad: true,

  proxy: {
    type: __Global.proxy.Type,
    url: __Global.api.Rayon + '&oblast=all',
    reader: {
      type: __Global.proxy.Reader
    }
  },

  listeners: {
    load: function (store, records , successful , operation , eOpts) {
      // if (successful) {
      //   App.service.Helper.setComponentsValue([
      //     { id: 'zoom-cb-rayonsearch', selection: 'Rayon' }
      //   ]);
      // }
    }
  }
});