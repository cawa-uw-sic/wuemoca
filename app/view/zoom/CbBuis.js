Ext.define('App.view.zoom.CbBuis', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Buis'
  ],

  xtype: 'app-zoom-cb-buis',

  itemId: 'zoom-cb-buis',
  
  //emptyText: i18n.adminFilters.buis_empty,
  fieldLabel: i18n.adminFilters.buis,

  hidden: true,

  store: {
    type: 'buis'
  },

  displayField: 'name',
  queryMode: 'local',
  valueField: 'id',

  editable: false,

  listeners: {
    change: 'onBuis'
  }

});