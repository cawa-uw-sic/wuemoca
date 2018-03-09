Ext.define('App.view.prod.Form', {
  extend: 'Ext.form.Panel',

  requires: [
    'App.controller.Prod',

    'App.view.prod.Tab'
  ],

  xtype: 'app-prod-form',

  controller: 'prod',

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

    { xtype: 'app-prod-form-tab'}

  ],

  buttons: [{
    itemId: 'prod-btn-submit',
    text: i18n.prod.btnSubmit,
    disabled: false,
    handler: 'onFormSubmit'
  }]
});
