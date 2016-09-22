Ext.define('App.view.header.Locale', {
  extend: 'Ext.button.Button',

  xtype: 'app-header-locale',

  text: localesText[nextLocale()],

  listeners: {
    click: 'onLocale'
  }
});
