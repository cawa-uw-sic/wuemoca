Ext.define('App.view.header.FfoLogo', {
  extend: 'Ext.Component',

  xtype: 'app-header-ffologo',

  html: '<span style="font-size:10px;">funded by<a href="' + i18n.header.ffo_website + 
   '" target="_blank"><img src="resources/images/logo_auswaertiges_amt.jpg" width="86" height="40" border="0" alt="' + 
   i18n.header.ffo_homepage + '" data-qtip="' + i18n.header.ffo_homepage + '"></a></span>'
});
