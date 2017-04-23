Ext.define('App.view.report.Button', {
  extend: 'Ext.button.Button',

  xtype: 'app-report-button',

  itemId: 'report-button',

  text: i18n.report.generate_button,

  height: 50,

  iconCls: 'x-fa fa-file-excel-o',

  handler: 'onReport'

});