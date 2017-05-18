Ext.define('App.view.header.SicLogo', {
  extend: 'Ext.Component',

  xtype: 'app-header-siclogo',

  html: '<a href="' + i18n.header.sicurl + '" target="sicicwc"><img src="resources/images/siclogo.gif" width="67" height="40" border="0" alt="' + 
   i18n.header.sic + '" data-qtip="' + i18n.header.sic + '"></a>'

});