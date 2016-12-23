Ext.define('App.view.switcher.CbUnit', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Unit'
  ],
hidden:true,
  xtype: 'app-switcher-cb-unit',

  itemId: 'switcher-cb-unit',

  fieldLabel: i18n.unit.label,

  store: {
    type: 'unit'
  },

  displayField: __Global.Lang + 'Name',
  queryMode: 'local',
  valueField: 'id',

  editable: false,

  listeners: {
    change: 'onUnit'
  }

});