Ext.define('App.view.wue.FormByYear', {
  extend: 'Ext.form.FieldSet',

  xtype: 'app-wue-form-by-year',

  requires: [
    'Ext.layout.container.Column'
  ],

  layout: 'column',

  scrollable: true,

  defaults: {
    xtype: 'textfield',
    columnWidth: 0.33,
    margin: '0 20 0 0'
  },

  listeners: {
    afterrender: 'onRenderFormByYear'
  }

});

