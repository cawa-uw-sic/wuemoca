Ext.define('App.store.ReportOblast', {
  extend: 'Ext.data.Store',

  alias: 'store.reportoblast',

  model: 'App.model.Oblast',

  storeId: 'reportoblast',

  proxy: {
    type: __Global.proxy.Type,
    url: __Global.api.Oblast + '&clean=1',
    reader: {
      type: __Global.proxy.Reader
    }
  }
});