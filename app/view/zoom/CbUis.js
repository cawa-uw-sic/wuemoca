Ext.define('App.view.zoom.CbUis', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Uis'
  ],

  xtype: 'app-zoom-cb-uis',

  itemId: 'zoom-cb-uis',
  //emptyText: i18n.adminFilters.uis_empty,
  fieldLabel: i18n.adminFilters.uis,

  hidden: true,

  store: {
    type: 'uis'
  },

  displayField: 'name',
  queryMode: 'local',
  valueField: 'id',

  editable: false,

  listeners: {
    change: 'onUis'
  }

});