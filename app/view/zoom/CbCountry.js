Ext.define('App.view.zoom.CbCountry', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Country'
  ],

  xtype: 'app-zoom-cb-country',

  itemId: 'zoom-cb-country',

  emptyText: i18n.area.empty,
  fieldLabel: i18n.adminFilters.country,

  store: {
    type: 'country',
    autoLoad: true
  },

  displayField: 'name',
  queryMode: 'local',
  valueField: 'id',

  editable: false,

  listeners: {
    change: 'onCountry'
  }

});
