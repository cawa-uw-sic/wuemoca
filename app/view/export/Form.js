Ext.define('App.view.exporter.Form', {
  extend: 'Ext.form.Panel',

  requires: [
    'App.controller.Exporter',
    'App.view.exporter.CbDownloadtype',
    'App.view.exporter.CbDownloadselection',
    'App.view.report.CbYear'
  ],

  xtype: 'app-exporter-form',

  controller: 'exporter',

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
    { 
      xtype: 'app-switcher-cb-aggregation', 
      itemId: 'exporter-cb-aggregation', 
      fieldLabel: i18n.aggreg.label, 
      name: 'aggregation'
    },
    { xtype: 'app-exporter-cb-downloadselection', itemId: 'exporter-cb-downloadselection', name: 'filter'},
    { xtype: 'app-exporter-cb-downloadtype', name: 'type'},
    { 
      xtype: 'app-report-cb-year',  
      name: 'year', 
      itemId: 'exporter-cb-year',
      emptyText: i18n.report.selectYear,
      value: 'all'
    }

  ],

  buttons: [{
    itemId: 'exporter-btn-submit',
    text: i18n.exp.download,
    handler: 'onFormSubmit'
  }]

});