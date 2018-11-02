Ext.define('App.view.header.UniLogo', {
  extend: 'Ext.Component',

  xtype: 'app-header-unilogo',

  html: '<a href="https://www.geographie.uni-wuerzburg.de/en/fernerkundung/startseite/" target="uni">' +
  '<img src="resources/images/unilogo4cohne.png" width="91" height="40" border="0" alt="CAWa Wuerzburg" data-qtip="' + 
  	i18n.header.uniwue + '"></a>'
});