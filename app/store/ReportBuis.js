Ext.define('App.store.ReportBuis', {
  extend: 'Ext.data.Store',

  alias: 'store.reportbuis',

  model: 'App.model.Buis',

  storeId: 'reportbuis',

  proxy: {
    type: __Global.proxy.Type,
    url: __Global.api.Buis + '&clean=1',
    reader: {
      type: __Global.proxy.Reader
    }
  }

});