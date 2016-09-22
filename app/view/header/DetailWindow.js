Ext.define('App.view.header.DetailWindow', {
  extend: 'Ext.Window',

  xtype: 'app-header-detailwindow',

  layout:'fit',
  border: false,
  width: 315,
  height: 510,
  initCenter: false,
  x: 15,
  y: 80,
  title: i18n.info.title,
  collapsed: false,
  resizable: false,
  closeAction: 'hide',
  plain: true,
  shadow: true,
  bodyBorder: false,


  html: '<table border="0">'
        + '<tr><td><blockquote style="margin-left:10px; margin-right:10px;"><p><font size="2" face="Arial, Helvetica, sans-serif">' + i18n.info.text + '</font></p> </blockquote></td></tr>'
        + '<tr><td><br><img style="width:300px;" src="resources/images/uzbekistan-cotton.jpg" alt="cotton"></td></tr>'
      + '</table>'
});
