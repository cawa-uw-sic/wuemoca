Ext.define('App.view.header.Title', {
  extend: 'Ext.Component',

  xtype: 'app-header-title',

  html: '<table style="color:' + wuemoca_color + ';">' +
    '<tr>' +
      '<td style="font-size:16px;font-weight:bold;">WUEMoCA</td>' +
      '<td><a id="app-header-title-detail" title="' + i18n.header.wuemoca_about + '" style="color:' + wuemoca_color + ';" href="#">' + i18n.header.details + '</a></td>' +
    '</tr>' +
    '<tr>' +
      '<td colspan="2">' + i18n.header.wuemoca_long + '</td>' +
    '</tr>' +
  '</table>',

  listeners : {
    element  : 'el',
    delegate : '#app-header-title-detail',
    click    : 'onDetail'
  }

});
