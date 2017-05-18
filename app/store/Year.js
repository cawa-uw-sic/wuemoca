Ext.define('App.store.Year', {
  extend: 'Ext.data.JsonStore',

  alias: 'store.year',

  storeId: 'year',

  fields: [ 'id', 'name'],

  data: []
});