Ext.define('App.store.WueDecade', {
  extend: 'Ext.data.JsonStore',

  alias: 'store.wue-decade',

  storeId: 'wue-decade',

  fields: [ 'year', 'decade', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10', 'm11', 'm12' ],

  groupField: 'year',

  data: []

});
