Ext.define('App.service.Wue', {

  singleton: true,

  isBusy: false,

  requires: [
    'App.util.Window'
  ],

  window    : Ext.create('App.util.Window', {
    title: i18n.wue.windowTitle,
    items: [{ xtype: 'app-wue-form' }],
    modal: true,
    height: 500,
    width: 750
  })

});
