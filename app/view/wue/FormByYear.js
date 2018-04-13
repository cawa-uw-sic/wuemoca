Ext.define('App.view.wue.FormByYear', {
  extend: 'Ext.form.FieldSet',

  xtype: 'app-wue-form-by-year',

  itemId: 'wue-form-by-year',

  requires: [
    'Ext.layout.container.Column'
  ],

  layout: 'column',

  scrollable: true,

  defaults: {
    xtype: 'numberfield',
    columnWidth: 0.33,
    margin: '0 20 0 0',
    // Remove spinner buttons, and arrow key and mouse wheel listeners
    hideTrigger: true,
    keyNavEnabled: false,
    mouseWheelEnabled: false    
  },

  listeners: {
    afterrender: 'onRenderFormByYear'
  }

});

