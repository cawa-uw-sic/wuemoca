Ext.define('App.view.prod.FormByYear', {
  extend: 'Ext.form.FieldSet',

  xtype: 'app-prod-form-by-year',

  itemId: 'prod-form-by-year',

  requires: [
    'Ext.layout.container.Column'
  ],


  scrollable: 'vertical',
  height: 300,

  defaults: {
    xtype: 'container',
    layout: 'column'
  },

  items: [],

  listeners: {
    beforerender: 'onRenderFormByYear'
  }

});

