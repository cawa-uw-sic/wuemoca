Ext.define('App.view.Main', {
  extend: 'Ext.panel.Panel',
  xtype: 'app-main',

  requires: [
    'Ext.layout.container.Border',
    'Ext.layout.container.Absolute',
    'Ext.layout.container.Accordion',

    'Ext.plugin.Viewport',
    'Ext.layout.container.Fit',
    'Ext.data.proxy.JsonP',
    'Ext.data.proxy.Ajax',

    'Ext.ux.statusbar.StatusBar',

    'App.controller.Main',

    'App.view.Map',
    'App.view.Overview',
    'App.view.header.Index',
    'App.view.zoom.Index',
    'App.view.switcher.Index',
    'App.view.polygon.Index',

    'App.view.yearslider.Index',
   // 'App.view.yearslider.BtnPlay',
    //'App.view.yearslider.BtnPause',

    'App.view.legend.Button',
    'App.view.legend.Window'

  ],

  controller: 'main',

  layout: 'border',

  bodyBorder: false,

  defaults: {
    //split: true,
    bodyPadding: 0
  },

  items: [
    {
      region: 'north',
      //Per WAI-ARIA, all regions should have a heading element that contains region's title.
      title: 'blubb',
      header: false,
      height: 55,
      items: [{ xtype: 'app-header' }]
    },
    {
      title: i18n.filter.title,
      region:'west',
      margin: '5 5 0 0',
      width: 300,
      layout:{
        type: 'accordion',
        animate: true
       // multi: true
      },
      defaults: {
        scrollable: 'vertical',
        listeners:{
            expand: function(p, eOpts){
              App.service.Watcher.set('Accordion', p.getItemId());
            }
        }
      },
      items: [
         { xtype: 'app-zoom'     , collapsed : __LocalDB.get('Selections.Accordion', 'app-switcher') != 'app-zoom'     }
        ,{ xtype: 'app-switcher' , collapsed : __LocalDB.get('Selections.Accordion', 'app-switcher') != 'app-switcher' }
        ,{ xtype: 'app-overview' , collapsed : __LocalDB.get('Selections.Accordion', 'app-switcher') != 'app-overview' }
      ]
    },
    {
      itemId: 'map-container',
      id: 'map-panel',
      //Per WAI-ARIA, all regions should have a heading element that contains region's title.
      title: 'blabla',
      region: 'center',
      margin: '5 0 0 0',
      layout: 'absolute',
      cls: 'map-container',
     // titlePosition: 100,
      header: {
        height: 44,
        //padding: 0,

        //padding: '5px 16px 5px 16px',
        items: [
          //{ xtype: 'app-yearslider-btn-play'  }
         //,{ xtype: 'app-yearslider-btn-pause' }
        // ,{ xtype: 'label', text: __Global.year.Min, padding: '0 5px 0 0', style: {color: '#f0f0f0', fontWeight: 'bold'}}
         { xtype: 'app-yearslider'}
         //,{xtype: 'label', text: __Global.year.Max, padding: '0 0 0 5px',style: {color: '#f0f0f0', fontWeight: 'bold'}}    
      ]},
     /* tools: [
         { xtype: 'app-yearslider-btn-play'  }
        ,{ xtype: 'app-yearslider-btn-pause' }
      ],*/
      items: [
        { xtype: 'app-map', anchor: '100% 100%' },
        { xtype: 'app-legend-window'},
        { xtype: 'app-legend-button'}
       /* {
          xtype: 'app-yearslider',
          x: 50,
          y: 10,
          width: 400
        }*/
      ],

      rbar: [{ xtype: 'app-polygon' }],

      bbar: Ext.create('Ext.ux.StatusBar', {
        defaultText: 'Move the mouse over the map',
        itemId: 'app-status',
        cls: 'app-status',
        statusAlign: 'left'
      }),

      listeners: {
        afterrender: 'onAfterRender'
      }
    }
  ]
});
