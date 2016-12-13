Ext.define('App.view.report.Form', {
  extend: 'Ext.form.Panel',

  requires: [
    'App.controller.Report',

    'App.view.report.Radio',
    'App.view.report.CbYear',
    'App.view.zoom.CbCountry',
    'App.view.zoom.CbOblast',
    'App.view.zoom.CbBuis',
    'App.store.ReportCountry',
    'App.store.ReportOblast',
    'App.store.ReportBuis'  
  ],

  xtype: 'app-report-form',

  controller: 'report',

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
    items: [
       { xtype: 'app-report-radio'   }
      ,{ xtype: 'app-report-cb-year',  name: 'year' }
      ,{ xtype: 'app-zoom-cb-country', name: 'country', itemId: 'report-cb-country', emptyText: '', store: { type: 'reportcountry' } }
      ,{ xtype: 'app-zoom-cb-oblast',  name: 'oblast',  itemId: 'report-cb-oblast',  emptyText: '', store: { type: 'reportoblast'  } }
      ,{ xtype: 'app-zoom-cb-buis',    name: 'buis',    itemId: 'report-cb-buis',    emptyText: '', store: { type: 'reportbuis'    } }

    ]
  }],

  buttons: [{
    text: i18n.report.btnSubmit,
    handler: 'onFormSubmit'
  }]

});