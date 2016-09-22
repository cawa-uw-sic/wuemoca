Ext.define('App.view.switcher.Index', {
  extend: 'Ext.panel.Panel',

  requires: [
    'Ext.layout.container.VBox',

    'App.controller.Switcher',

    'App.view.switcher.Filter',
    'App.view.switcher.CbIndicator',
    'App.view.switcher.BtnsCrop',
    'App.view.switcher.CbUnit',
    'App.view.switcher.CbAggregation'
  ],

  xtype: 'app-switcher',

  controller: 'switcher',

  title: i18n.mapSelection.title,

  bodyPadding: 10,

  defaults: {
    bodyPadding: 10,
    margin: '0 0 10 0'
  },

  items: [
     { xtype: 'app-switcher-filter'         }
    ,{ xtype: 'app-switcher-cb-indicator'   }
    ,{ xtype: 'app-switcher-btns-crop'      }
    ,{ xtype: 'app-switcher-cb-unit'        }
    ,{ xtype: 'app-switcher-cb-aggregation' }
  ]
});