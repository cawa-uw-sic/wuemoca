Ext.define('App.view.zoom.CbUis', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Uis'
  ],

  xtype: 'app-zoom-cb-uis',

  itemId: 'zoom-cb-uis',

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