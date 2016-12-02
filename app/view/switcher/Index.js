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

  itemId: 'app-switcher',

  controller: 'switcher',

  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },

  title: i18n.mapSelection.title,

  bodyPadding: '10 5 0 10',

  defaults: {
     margin: '0 0 5 0'
  },

  items: [
    { 
      //indicator container
      xtype: 'container',
      style: {backgroundColor:'#e0ebf3'},
      layout: {
        type: 'vbox',
        align: 'stretch'
      }, 
      defaults:{
        padding: '0',
        margin: '0'
      },  
      padding: '5',    
      items:[
        { xtype: 'app-switcher-filter', style: {backgroundColor:'#e0ebf3'}},
        { xtype: 'app-switcher-cb-indicator'   }]
    },{ 
      //crop buttons
      xtype: 'app-switcher-btns-crop', bodyPadding: '0'
    },{ 
      //aggregation container
      xtype: 'container',
      itemId: 'app-switcher-container-aggreg',
      style:{backgroundColor:'#f0f0f0'},
      layout: {
        type: 'vbox',
        align: 'stretch'
      }, 
      padding: '5',  
      defaults: {
        labelWidth: 70
      },      
      items:[
          { xtype: 'app-switcher-cb-unit'        }
         ,{ xtype: 'app-switcher-cb-aggregation' }
         ,{ xtype: 'button', itemId: 'app-switcher-btn-shapefile', text: '', handler: 'onShapefile' }
      ]
    }
  ]
});