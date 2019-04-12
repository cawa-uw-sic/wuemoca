Ext.define('App.view.header.Title', {
  extend: 'Ext.Component',

  xtype: 'app-header-title',

  html: '<table style="color:#00589C;">' +
    '<tr>' +
      '<td style="font-size:16px;font-weight:bold;">WUEMoCA (BETA version)</td>' +
    '</tr>' +
    '<tr>' +
      '<td>' + i18n.header.wuemoca_long + '</td>' +
    '</tr>' +
  '</table>'
});
