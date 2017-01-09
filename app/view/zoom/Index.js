Ext.define('App.view.zoom.Index', {
  extend: 'Ext.panel.Panel',

  requires: [
    'Ext.layout.container.VBox',
    'Ext.layout.container.HBox',
    'Ext.container.Container',

    'App.controller.Zoom',

    'App.view.zoom.CbCountry',
    'App.view.zoom.CbOblast',
    'App.view.zoom.CbRayon',
    'App.view.zoom.CbBuis',
    'App.view.zoom.CbUis',
    'App.view.zoom.CbWua',
    //'App.view.zoom.CbPilot'
    'App.view.zoom.BtnPilot'

    /*'App.view.zoom.BtnOblast',
    'App.view.zoom.BtnRayon',
    'App.view.zoom.BtnBuis',   
    'App.view.zoom.BtnUis',
    'App.view.zoom.BtnWua'*/
  ],

  xtype: 'app-zoom',

  itemId: 'app-zoom',

  controller: 'zoom',

  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },

  title: i18n.adminFilters.title,

  bodyPadding: '10 5 0 10',
  /*defaults: {
    layout: {
      type: 'vbox',
      align: 'stretch'
    }
  },*/
    header: {
      height: 44,
      padding: '5 10 5 10',
      items: [
       { xtype: 'button', itemId: 'zoom-btn-reset', text: i18n.filter.reset, padding: 0, handler: 'resetFilter'}
    ]},
  items: [
    //comboboxes within containers
    //{
      //flex: 3,
      //items: [
        {
          xtype: 'container',
          //margin: '0 5 0 0',
          padding: 0,
          border: 1,
          style:{ 
            //backgroundColor:'#f0f0f0'
            borderColor: '#878787',
            borderStyle: 'solid'           
          },
          layout: {
            type: 'vbox',
            align: 'stretch'
          },
          defaults:  {
            labelWidth: 65
          },
          items:[
            { xtype: 'app-zoom-cb-country', margin: '0 0 5 5', labelWidth: 65 },
            {
              xtype: 'container',
              //margin: '0 5 0 0',
              padding: 0,
              style:{ backgroundColor:'#f0f0f0' },
              layout: {
                type: 'vbox',
                align: 'stretch'
              },
              defaults:  {
                labelWidth: 65
              },
              items:[
                 { xtype: 'app-zoom-cb-oblast', margin: '5'},//  margin: '0 0 5 0',
                 { xtype: 'app-zoom-cb-rayon', margin: '0 5 5 5'},
                 { xtype: 'app-zoom-cb-wua',  margin: '0 5 5 5' }
                ]
          },
          {
            xtype: 'container',
            itemId: 'zoom-container-buis',
            hidden: true,
            margin: '5 0 0 0',
            padding: 0,
            style: { backgroundColor:'#e0ebf3' },
            layout: {
              type: 'vbox',
              align: 'stretch'
            },
              defaults:  {
                labelWidth: 65
              },
            items:[
               { xtype: 'label', html: '<b>' + i18n.adminFilters._or + '</b>', margin:'5' } ,
               { xtype: 'app-zoom-cb-buis', margin: '5' },  //margin: '0 0 5 0',
               { xtype: 'app-zoom-cb-uis', margin: '0 5 5 5' }
              ]
          },            
          ]
      },      
      {
        xtype: 'container',
        margin: '5 0 0 0',
        padding: 0,
                  border: 1,
          style:{ 
            backgroundColor:'#FFEFBB',
            borderColor: '#878787',
            borderStyle: 'solid'           
          },
        layout: {
          type: 'vbox',
          align: 'stretch'
        },
          defaults:  {
            //labelWidth: 65
          },
        items:[
          { xtype: 'label', html: '<b>' + i18n.adminFilters._or + '</b>', margin:'5' } ,   
          { xtype: 'app-zoom-btn-pilot', ui: 'default-toolbar', margin: '0 5 5 5' }
        ]
      }
      //{ xtype: 'app-zoom-cb-wua',  margin: '0 5 0 0' },
      //{ xtype: 'app-zoom-btn-pilot',  margin: '5 5 0 0' }
      //]
   // }
   /* //buttons
    {
      flex: 1,
      items: [
       { xtype: 'app-zoom-btn-oblast', margin: '38 0 0 0' },
       { xtype: 'app-zoom-btn-rayon', margin: '4 0 0 0' },
       { xtype: 'app-zoom-btn-buis', margin: '8 0 0 0' },
       { xtype: 'app-zoom-btn-uis', margin: '4 0 0 0' },
       { xtype: 'app-zoom-btn-wua', margin: '30 0 0 0' }
     ]
   }*/
  ]
});