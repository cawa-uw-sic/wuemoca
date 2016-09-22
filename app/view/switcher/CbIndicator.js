Ext.define('App.view.switcher.CbIndicator', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Indicator'
  ],

  xtype: 'app-switcher-cb-indicator',

  itemId: 'switcher-cb-indicator',

  fieldLabel: i18n.product.label,

  store: {
    type: 'indicator'
  },

  displayField: __Global.Lang + 'Name',
  queryMode: 'local',
  valueField: 'id',

  editable: false,

  listeners: {
    change: 'onIndicator'
  }

});