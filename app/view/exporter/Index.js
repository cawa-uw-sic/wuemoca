/**
* Export panel
*/
Ext.define('App.view.exporter.Index', {
  extend: 'Ext.panel.Panel',

  requires: [
    'App.controller.Exporter',
    'Ext.layout.container.VBox'
  ],

  xtype: 'app-exporter',
  /**
  */
  itemId: 'app-exporter',
  /**
  */
  controller: 'exporter',
  /**
  */
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },

  /**
  * title depending on locale
  */
  title: i18n.exp.title, 
  /**
  */
  bodyPadding: '10 5 0 10',
  /**
  */
  defaults: {
     margin: '0 0 5 0'
  },
  /**
  */
  items: [
    { 
      xtype: 'button', 
      itemId: 'exporter-btn-download', 
      iconCls: 'x-fa fa fa-download',      
      //ui: 'default-toolbar', 
      handler: 'onDownloadWindow'
    },
    { 
      xtype: 'button', 
      itemId: 'exporter-btn-report',
      text: i18n.report.generate_button,
      tooltip: i18n.report.btnTooltip,      
      iconCls: 'x-fa fa-file-excel-o',
      //ui: 'default-toolbar',
      handler: 'onReport'

    },
    { 
      xtype: 'button', 
      itemId: 'exporter-btn-pdf',
      text: i18n.exp.acronym,
      iconCls: 'x-fa fa-file-pdf-o',
      ui: 'default-toolbar',
      handler: 'onAcronymPDF'

    }   
  ]
});