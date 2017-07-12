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

    { xtype: 'app-report-radio'},
    {
      xtype: 'fieldset',
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      defaults:{
        flex:1,
        border: false,
        margin: 5
      },
      items: [
        {
          xtype: 'app-report-cb-year',
          name: 'year',
          itemId: 'report-cb-year',
          emptyText: i18n.report.selectYear
        },{
          xtype: 'app-zoom-cb-country',
          name: 'country',
          itemId: 'report-cb-country',
          fieldLabel: i18n.adminFilters.country,
          emptyText: i18n.report.selectCountry,
          store: { type: 'reportcountry' }
        }
    ]},
    {
      xtype: 'fieldset',
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      defaults:{
        flex:1,
        border: false,
        margin: 5
      },
      items: [
        {
          xtype: 'app-zoom-cb-oblast',
          name: 'oblast',
          itemId: 'report-cb-oblast',
          emptyText: i18n.report.selectOblast,
          store: { type: 'reportoblast'  }
        },{
          xtype: 'app-zoom-cb-buis',
          name: 'buis',
          itemId: 'report-cb-buis',
          emptyText: i18n.report.selectBUIS,
          store: { type: 'reportbuis'    }
        }
      ]
  }],

  buttons: [{
    itemId: 'report-btn-submit',
    text: i18n.report.btnSubmit,
    disabled: true,
    handler: 'onFormSubmit'
  }]

});
