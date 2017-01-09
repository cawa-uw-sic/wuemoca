Ext.define('App.view.zoom.CbOblast', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Oblast'
  ],

  xtype: 'app-zoom-cb-oblast',

  itemId: 'zoom-cb-oblast',
  emptyText: i18n.adminFilters.oblast_empty,
  fieldLabel: i18n.adminFilters.oblast,

  hidden: true,

  store: {
    type: 'oblast'
  },

  displayField: 'name',
  queryMode: 'local',
  valueField: 'id',

  editable: false,

  listeners: {
    change: 'onOblast'
  }

});
