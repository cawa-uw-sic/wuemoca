var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

Ext.define('App.view.polygon.Form', {
  extend: 'Ext.form.Panel',

  requires: [
    'App.controller.Polygon'
  ],

  xtype: 'app-polygon-form',

  controller: 'polygon',

  border: false,
  bodyPadding: 10,
  fieldDefaults: {
    labelAlign: 'top'
  },
  defaults: {
    layout: 'fit',
    flex: 1,
    border: false,
    margin: '0 0 10 0'
  },
  items: [{
    xtype: 'fieldset',
    items: [{
      xtype: 'textfield',
      itemId: 'exportui-name',
      fieldLabel: i18n.exportUI.inputName,
      afterLabelTextTpl: required,
      name: 'name',
      allowBlank: false
    },{
      xtype: 'textfield',
      itemId: 'exportui-location',
      fieldLabel: i18n.exportUI.inputLocation,
      //afterLabelTextTpl: required,
      name: 'location',
      allowBlank: true
    },{
      xtype: 'textfield',
      itemId: 'exportui-area',
      fieldLabel: i18n.exportUI.totalArea,
      name: 'area',
      disabled: true   
    }]
  }],

  buttons: [{
    text: i18n.exportUI.btnSubmit,
    handler: 'onFormSubmit'
  }]

});