Ext.define('App.view.zoom.CbCountry', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Country'
  ],

  xtype: 'app-zoom-cb-country',

  itemId: 'zoom-cb-country',

  emptyText: i18n.adminFilters.country_empty,
  fieldLabel: '<b>' + i18n.adminFilters.country + '</b>',

  store: {
    type: 'country'
  },

  displayField: 'name',
  queryMode: 'local',
  valueField: 'id',

  editable: false,

  listeners: {
    change: 'onCountry'
  }

});
