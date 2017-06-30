Ext.define('App.view.report.Radio', {
  extend: 'Ext.form.RadioGroup',

  xtype: 'app-report-radio',

  itemId: 'report-radio',

  columns: 3,

  items: [
  	{ name: 'type', boxLabel: i18n.report.cropPattern, inputValue: 'cropPattern', checked: true },
  	{ name: 'type', boxLabel: i18n.report.grossHarvest, inputValue: 'grossHarvest' },
  	{ name: 'type', boxLabel: i18n.report.cropYield,   inputValue: 'cropYield'   }
  ]

});