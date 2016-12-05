Ext.define('App.store.ReportCountry', {
  extend: 'Ext.data.Store',

  alias: 'store.reportcountry',

  model: 'App.model.Country',

  storeId: 'reportcountry',

  autoLoad: true,

  proxy: {
    type: __Global.proxy.Type,
    url: __Global.api.Country + '&clean=1',
    reader: {
      type: __Global.proxy.Reader
    }
  }

});