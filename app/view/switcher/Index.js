/**
* Switcher panel for map selections
*/
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
    header: {
      height: 44,
      padding: '5 10 5 10',
      items: [
       { xtype: 'button', itemId: 'switcher-btn-reset', text: i18n.mapSelection.reset, padding: 0, handler: 'resetSelection'}
    ]},
  items: [
    { 
      //indicator container
      xtype: 'container',
      border: 1,
          style:{ 
            //backgroundColor:'#f0f0f0'
            borderColor: '#878787',
            borderStyle: 'solid'           
          },
      //style: {backgroundColor:'#e0ebf3'},
      layout: {
        type: 'vbox',
        align: 'stretch'
      }, 
      defaults:{
        padding: '0',
        margin: '0'
      },  
      //padding: '5',    
      items:[{
        xtype: 'container',
        style:{ 
          backgroundColor:'#f0f0f0'
        },
        //style: {backgroundColor:'#e0ebf3'},
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
          { xtype: 'app-switcher-filter', style: {backgroundColor:'#e0ebf3'}, hidden:true},
          //{xtype: 'app-switcher-iconlabel', text:i18n.indicator.label, iconCls: 'x-fa  fa fa-info'},
          { xtype: 'app-switcher-cb-indicator'   }
        ]
      },
        //crop buttons
        { xtype: 'app-switcher-btns-crop', bodyPadding: '0'}
      ]
    },{ 
       xtype: 'container',

       itemId: 'switcher-container-aggreg',
      border: 1,
          style:{ 
            //backgroundColor:'#f0f0f0'
            borderColor: '#878787',
            borderStyle: 'solid'           
          },
      //style: {backgroundColor:'#e0ebf3'},
      layout: {
        type: 'vbox',
        align: 'stretch'
      }, 
      defaults:{
        padding: '0',
        margin: '0'
      }, 
      items:[{     
        //aggregation container
        xtype: 'container',

        style:{backgroundColor:'#e0ebf3'},
        layout: {
          type: 'vbox',
          align: 'stretch'
        }, 
        padding: '5',  
        defaults: {
          labelWidth: 70,
          padding: '0',
          margin: '0'
        },      
        items:[
          { xtype: 'app-switcher-cb-unit' , hidden:true       }
         ,{ xtype: 'app-switcher-cb-aggregation' }
         ]
        }
       ,{ xtype: 'button', itemId: 'switcher-btn-shapefile', ui: 'default-toolbar', handler: 'onShapefile',  margin: '5', padding: '5'}
      ]
    }
  ]
});