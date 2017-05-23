Ext.define('App.view.exporter.Form', {
  extend: 'Ext.form.Panel',

  requires: [
    'App.controller.Exporter',
    'App.view.exporter.CbDownloadtype',
    'App.view.exporter.CbDownloadselection',
    'App.view.exporter.TagYear'
  ],

  xtype: 'app-exporter-form',

  controller: 'exporter',

  border: false,

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
    { xtype: 'app-exporter-cb-downloadselection', itemId: 'exporter-cb-downloadselection', name: 'filter'},
    { xtype: 'app-exporter-cb-downloadtype', name: 'type'},
    { xtype: 'app-exporter-tag-year', itemId: 'exporter-tag-year', name: 'year' }
  ],

  buttons: [{
    itemId: 'exporter-btn-submit',
    text: i18n.exp.download,
    handler: 'onFormSubmit'
  }]

});