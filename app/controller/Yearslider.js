Ext.define('App.controller.Yearslider', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.yearslider',

  onChange: function (el, val) {
    App.service.Watcher.set('Year', val);
  },

  onAfterRender: function (el) {
    el.setValue(App.service.Watcher.get('Year'));
  }

});
