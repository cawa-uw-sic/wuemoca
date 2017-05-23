Ext.define('App.view.exporter.TagYear', {
  extend: 'Ext.form.field.Tag',

  requires: [
    'App.store.Year'
  ],

  xtype: 'app-exporter-tag-year',


  
  fieldLabel: i18n.report.year,

  store: {
    type: 'year'
  },

  displayField: 'name',
  queryMode: 'local',
  valueField: 'id',

  emptyText: i18n.exp.all,

  filterPickList: true,

  editable: false,
  selectOnFocus: false
  
});