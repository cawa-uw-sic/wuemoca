Ext.define('App.view.switcher.CbAggregation', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Aggregation'
  ],

  xtype: 'app-switcher-cb-aggregation',

  itemId: 'switcher-cb-aggregation',

   labelAlign: 'top',

  //fieldLabel: i18n.aggreg.label,

  store: {
    type: 'aggregation'
  },
  // Template for the dropdown menu.
  // Note the use of the "x-list-plain" and "x-boundlist-item" class,
  // this is required to make the items selectable.
  tpl: Ext.create('Ext.XTemplate',
      '<ul class="x-list-plain"><tpl for=".">',
          '<li role="option" class="x-boundlist-item" data-qtip="{' + __Global.Lang + 'Tooltip}">{' + __Global.Lang + 'Name}</li>',
      '</tpl></ul>'
  ),
  displayField: __Global.Lang + 'Name',
  queryMode: 'local',
  valueField: 'id',

  editable: false,

  listeners: {
    change: 'onAggregation'
  }

});