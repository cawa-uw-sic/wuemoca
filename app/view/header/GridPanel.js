Ext.define('App.view.header.GridPanel', {
  extend: 'Ext.grid.Panel',

  requires: [
    'App.store.PrintChart',
    'App.view.header.Sparklinebar'
  ],

  xtype: 'app-header-gridpanel',

  id: 'app-header-gridpanel',

  scrollable: true,

  store: {
    type: 'printchart'
  },

  columns: [
    {
        text: 'ID',
        dataIndex: 'id',
        width: 80
    }, {      
        text: i18n.aggreg.oblast,
        dataIndex: 'name',
        width: 160
    }, {
        text: i18n.settings.uiri_cotton,
        xtype: 'widgetcolumn',
        dataIndex: 'cotton',
        width: 270,
        widget: {
          xtype: 'app-header-sparklinebar',
          barColor: __CropColors.cotton
        }
    }, {
        text: i18n.settings.uiri_wheat,
        xtype: 'widgetcolumn',
        dataIndex: 'wheat',
        width: 270,
        widget: {
          xtype: 'app-header-sparklinebar',
          barColor: __CropColors.wheat
        }
    }, {
        text: i18n.settings.uiri_rice,
        xtype: 'widgetcolumn',
        dataIndex: 'rice',
        width: 270,
        widget: {
          xtype: 'app-header-sparklinebar',
          barColor: __CropColors.rice
        }        
    }
  ]

  
});