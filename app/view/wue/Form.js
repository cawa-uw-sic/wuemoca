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

    { xtype: 'container', 
      itemId: 'app-wue-container', 
      items: [{ xtype: 'app-wue-form-by-year' }]
      /*listeners: {
        beforeremove: 'onRemove'
      }*/
    }

  ],

  buttons: [{
    xtype: 'button',
    text: i18n.wue.btnImportTemplates,
    tooltip: i18n.wue.tooltipImportTemplates,
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
    buttonOnly: true,
    buttonText: i18n.wue.btnImport1 + " '" + i18n.wue.year + "' " + i18n.wue.btnImport2,
    listeners: {
      change: 'onFormImport',
      render: 'onFileSelection'
    }
  },{
    xtype: 'tbfill'
  },{
    itemId: 'wue-btn-submit',
    text: i18n.wue.btnSubmit1 + " '" + i18n.wue.year + "'" + i18n.wue.btnSubmit2,
    disabled: false,
    handler: 'onFormSubmit'
  }]
});
