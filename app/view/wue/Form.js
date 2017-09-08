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

    { xtype: 'container', itemId: 'app-wue-container', items: [{ xtype: 'app-wue-form-by-year' }] }

  ],

  buttons: [{
    xtype: 'button',
    text: i18n.wue.btnImportTemplates,
    menu: [{
      text: i18n.wue.year,
      itemId: 'wue-import-year',
      handler: 'onBtnTemplate'
    },{
      text: i18n.wue.month,
      itemId: 'wue-import-month',
      handler: 'onBtnTemplate'
    },{
      text: i18n.wue.decade,
      itemId: 'wue-import-decade',
      handler: 'onBtnTemplate'
    }]
  },{
    xtype: 'fileuploadfield',
    itemId: 'wue-btn-import',
    label: i18n.wue.btnImport,
    buttonOnly: true,
    hideLabel: true,
    listeners: {
      change: 'onFormImport'
    }
  },{
    itemId: 'wue-btn-submit',
    text: i18n.wue.btnSubmit,
    disabled: false,
    handler: 'onFormSubmit'
  }]

});
