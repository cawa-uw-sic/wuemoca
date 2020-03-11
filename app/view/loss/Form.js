Ext.define('App.view.loss.Form', {
  extend: 'Ext.form.Panel',

  requires: [
    'App.controller.Loss',
    'App.view.loss.Tab'
  ],

  xtype: 'app-loss-form',

  controller: 'loss',

  border: false,
  //bodyPadding: 10,
  fieldDefaults: {
    labelAlign: 'top'
  },
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },

  items: [
    { xtype: 'app-loss-form-tab'}
  ],

  buttons: [{
    itemId: 'loss-btn-submit',
    text: i18n.loss.btnSubmit,
    disabled: false,
    handler: 'onFormSubmit'
  }]
});
