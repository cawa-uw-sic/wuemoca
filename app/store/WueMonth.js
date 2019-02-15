Ext.define('App.store.WueMonth', {
  extend: 'Ext.data.JsonStore',

  alias: 'store.wue-month',

  storeId: 'wue-month',

  fields: [ 'year', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9' ],

  data: []

});
