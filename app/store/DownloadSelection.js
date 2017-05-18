/**
* Aggregation store for aggregation combobox {@link App.view.switcher.CbAggregation}
*/
Ext.define('App.store.DownloadSelection', {
  extend: 'Ext.data.Store',

  alias: 'store.downloadselection',

  storeId: 'downloadselection',
  /**
  */
  fields: [ 'id', 'filter', 'name'],
  /**
  * fields of aggregation array {@link __Aggregation}
  */
  data: [],
  /**
  * Proxies are used by Stores to handle the loading and saving of Model data.
  */
  proxy: {
    type: 'memory',
    reader: {
      type: 'json'
    }
  }
});
