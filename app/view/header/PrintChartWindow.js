Ext.define('App.view.header.PrintChartWindow', {
  extend: 'Ext.Window',

  xtype: 'app-header-printchartwindow',

  itemId: 'app-header-printchartwindow',

  requires: [
 	'App.view.header.GridPanel',
	'Ext.button.Button'
  ],

  layout: 'fit',
  resizable: false,
  closeAction: 'hide',
  height: 700,
  width: Ext.getBody().getWidth(),
  modal: true,
  title: App.service.Helper.getById(__Indicator, 'uiri')[__Global.Lang + 'NameShort'] + ' ' + i18n.exp.allOblastsCA + ' (' + __Global.year.Min + '-' + __Global.year.Max + ')',
  items: [
  	{ xtype: 'app-header-gridpanel'}
  ],
  bbar: [
	{xtype: 'button', text: 'Print Charts', handler: 'onPrintChart'}
  ]

});