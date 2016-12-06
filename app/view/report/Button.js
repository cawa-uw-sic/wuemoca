Ext.define('App.view.report.Button', {
  extend: 'Ext.button.Button',

  xtype: 'app-report-button',

  itemId: 'report-button',

  text: i18n.report.generate,

  height: 50,

  handler: 'onReport'

});