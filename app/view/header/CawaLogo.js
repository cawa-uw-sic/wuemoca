Ext.define('App.view.header.CawaLogo', {
  extend: 'Ext.Component',

  xtype: 'app-header-cawalogo',

  html: '<a href="' + i18n.header.cawa_website + '" target="_blank"><img src="resources/images/cawa_logo.png" width="230" height="40" border="0" alt="' + i18n.header.cawa_homepage + '" title="' + i18n.header.cawa_homepage + '"></a>'
});
