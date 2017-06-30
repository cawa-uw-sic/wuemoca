Ext.define('App.view.wue.Form', {
  extend: 'Ext.form.Panel',

  requires: [
    'App.controller.Wue',

    'App.view.wue.Radio',
    'App.view.wue.FormByYear',
    'App.view.wue.FormByMonth',
    'App.view.wue.FormByDecade'
  ],

  xtype: 'app-wue-form',

  controller: 'wue',

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

  defaults: {
    border: false,
    margin: 5
  },
  items: [

    { xtype: 'app-wue-radio'},

    { xtype: 'container', itemId: 'app-wue-container', items: [{ xtype: 'app-wue-form-by-decade' }] }

  ],

  buttons: [{
    itemId: 'wue-btn-submit',
    text: i18n.wue.btnSubmit,
    disabled: true,
    handler: 'onFormSubmit'
  }]

});
