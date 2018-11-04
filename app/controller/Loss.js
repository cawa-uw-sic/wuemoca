/**
* prod controller
*/
Ext.define('App.controller.Loss', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.loss',

  onFormSubmit: function () {
    App.service.Loss.submitData();
  }

});
