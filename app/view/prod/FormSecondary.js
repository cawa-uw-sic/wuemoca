Ext.define('App.view.prod.FormSecondary', {
  extend: 'Ext.form.FieldSet',

  xtype: 'app-prod-form-secondary',

  itemId: 'prod-form-secondary',

  requires: [
    'Ext.layout.container.Column'
  ],


  scrollable: 'vertical',
  height: 355,

  defaults: {
    xtype: 'container',
    layout: 'column'
  },

  items: [],

  listeners: {
    beforerender: 'onRenderFormSecondary'
  }

});

