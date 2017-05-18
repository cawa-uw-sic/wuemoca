Ext.define('App.view.report.CbYear', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Year'
  ],

  xtype: 'app-report-cb-year',


  
  fieldLabel: i18n.report.year,

  store: {
    type: 'year'
  },

  displayField: 'name',
  queryMode: 'local',
  valueField: 'id',

  editable: false
  
});