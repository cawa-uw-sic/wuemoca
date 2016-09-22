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
    'App.view.yearslider.BtnPlay',
    'App.view.yearslider.BtnPause',

    'App.view.legend.Button',
    'App.view.legend.Window'

  ],

  controller: 'main',

  layout: 'border',

  bodyBorder: false,

  defaults: {
    split: true,
    bodyPadding: 0
  },

  items: [
    {
      region: 'north',
      height: 55,
      split: false,
      items: [{ xtype: 'app-header' }]
    },
    {
      title: i18n.filter.title,
      region:'west',
      margin: '5 0 0 0',
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
         { xtype: 'app-zoom'     , collapsed : __LocalDB.get('Selections.Accordion', 'app-zoom') != 'app-zoom'     }
        ,{ xtype: 'app-switcher' , collapsed : __LocalDB.get('Selections.Accordion', 'app-zoom') != 'app-switcher' }
        ,{ xtype: 'app-overview' , collapsed : __LocalDB.get('Selections.Accordion', 'app-zoom') != 'app-overview' }
      ]
    },
    {
      itemId: 'map-container',
      title: '',
      region: 'center',
      margin: '5 0 0 0',
      layout: 'absolute',
      cls: 'map-container',
      titlePosition: 100,
      tools: [
         { xtype: 'app-yearslider-btn-play'  }
        ,{ xtype: 'app-yearslider-btn-pause' }
      ],
      items: [
        { xtype: 'app-map', anchor: '100% 100%' },
        { xtype: 'app-legend-window'},
        { xtype: 'app-legend-button'},
        {
          xtype: 'app-yearslider',
          x: 50,
          y: 10,
          width: 400
        }
      ],

      rbar: [{ xtype: 'app-polygon' }],

      bbar: Ext.create('Ext.ux.StatusBar', {
        defaultText: '',
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
