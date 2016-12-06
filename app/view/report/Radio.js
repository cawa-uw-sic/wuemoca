Ext.define('App.view.report.Radio', {
  extend: 'Ext.form.RadioGroup',

  xtype: 'app-report-radio',

  itemId: 'report-radio',

  columns: 3,

  items: [
  	{ name: 'type', boxLabel: i18n.report.typePattern, inputValue: 'typePattern', checked: true },
  	{ name: 'type', boxLabel: i18n.report.typeHarvest, inputValue: 'typeHarvest' },
  	{ name: 'type', boxLabel: i18n.report.typeYield,   inputValue: 'typeYield'   }
  ]

});