Ext.define('App.service.Status', {

  singleton: true,

  set: function (text) {
    App.service.Helper.getComponentExt('app-status').setText(text);
  }

});