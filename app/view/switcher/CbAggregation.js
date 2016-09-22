Ext.define('App.view.switcher.CbAggregation', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Aggregation'
  ],

  xtype: 'app-switcher-cb-aggregation',

  itemId: 'switcher-cb-aggregation',

  fieldLabel: i18n.aggreg.label,

  store: {
    type: 'aggregation'
  },

  displayField: __Global.Lang + 'Name',
  queryMode: 'local',
  valueField: 'id',

  editable: false,

  listeners: {
    change: 'onAggregation'
  }

});