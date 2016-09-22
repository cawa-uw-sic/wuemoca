Ext.define('App.view.zoom.CbRayon', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Rayon'
  ],

  xtype: 'app-zoom-cb-rayon',

  itemId: 'zoom-cb-rayon',

  fieldLabel: i18n.adminFilters.rayon,

  hidden: true,

  store: {
    type: 'rayon'
  },

  displayField: 'name',
  queryMode: 'local',
  valueField: 'id',

  editable: false,

  listeners: {
    change: 'onRayon'
  }

});