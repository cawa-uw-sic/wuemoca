Ext.define('App.view.header.IntroWindowButton', {
  extend: 'Ext.button.Button',

  xtype: 'app-introwindow-button',

  itemId: 'introwindow-button',

  id: 'introwindow-button',

  text: i18n.header.introwindow,
  //height: 50,

  handler: 'onIntroWindowBtn'

});
