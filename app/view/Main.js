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

    'App.view.legend.Button',
    'App.view.legend.Window'
  ],

  controller: 'main',

  layout: 'border',

  bodyBorder: false,

  defaults: {
    bodyPadding: 0
  },
  listener:{
    afterrender: 'onMainAfterRender'
  },
  items: [
    {
      region: 'north',
      //Per WAI-ARIA, all regions should have a heading element that contains region's title.
      title: 'blupp',
      header: false,
      height: 55,
      items: [{ xtype: 'app-header' }]
    },
    {
      title: i18n.filter.title,
      region: 'west',
      margin: '0 5 0 0',
      width: 300,
      layout:{
        type: 'accordion',
        animate: true
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
      margin: '0 0 0 0',
      layout: 'absolute',
      cls: 'map-container',
      header: {
        height: 44,
        items: [
         { xtype: 'app-yearslider'}
      ]},
      items: [
        { xtype: 'app-map', anchor: '100% 100%' },
        { xtype: 'app-legend-window'},
        { xtype: 'app-legend-button'}
      ],

      bbar: Ext.create('Ext.ux.StatusBar', {
        defaultText: 'Move the mouse over the map',
        itemId: 'app-status',
        cls: 'app-status',
        statusAlign: 'left'
      }),

      listeners: {
        afterrender: 'onMapAfterRender'
      }
    },{
      itemId: 'user-polygon',
      //Per WAI-ARIA, all regions should have a heading element that contains region's title.
      title: i18n.polygon.showPolygon,
      region: 'east',
      width: 150,
      collapsible: true, 
      collapsed: !__LocalDB.get('Selections.UserPolygon', false),  

      margin: '0 0 0 5',
      items: [
        { xtype: 'app-polygon'}
      ],
      listeners: {
        collapse: 'onHidePolygon',
        expand: 'onShowPolygon'
      }
    }
  ]
});
