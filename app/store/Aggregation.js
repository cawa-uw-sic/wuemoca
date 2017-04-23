/**
* Aggregation store for aggregation combobox {@link App.view.switcher.CbAggregation}
*/
Ext.define('App.store.Aggregation', {
  extend: 'Ext.data.Store',

  alias: 'store.aggregation',

  storeId: 'aggregation',
  /**
  */
  fields: [ 'id', 'enName', 'ruName', 'enTooltip', 'ruTooltip' ],
  /**
  * fields of aggregation array {@link __Aggregation}
  */
  data: __Aggregation,
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
