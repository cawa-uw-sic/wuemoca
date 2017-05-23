/**
* Main panel and starting loading point
*/
Ext.define('App.view.Main', {
  extend: 'Ext.panel.Panel',
  xtype: 'app-main',

  requires: [
    'Ext.layout.container.Border',
    'Ext.layout.container.Absolute',
    'Ext.layout.container.Accordion',
    'Ext.layout.container.Fit',
    'Ext.plugin.Viewport',

    'Ext.data.proxy.JsonP',
    'Ext.data.proxy.Ajax',

    'Ext.ux.statusbar.StatusBar',

    'App.controller.Main',

    'App.view.Map',
    'App.view.Overview',
    'App.view.header.Index',
    'App.view.zoom.Index',
    'App.view.switcher.Index',
    'App.view.exporter.Index',
    'App.view.exporter.Window',
    'App.view.polygon.Index',

    'App.view.yearslider.Index',

    'App.view.legend.Button',
    'App.view.legend.Window',
    'App.view.satellite.Button'
  ],
/**
* controller
*/
  controller: 'main',
/**
* layout for viewport
*/
  layout: 'border',
/**
* bodyBorder
*/
  bodyBorder: false,
/**
* property for all items
*/
  defaults: {
    bodyPadding: 0
  },

  listener:{
    afterrender: 'onMainAfterRender'
  },
/**
* @property {Ext.panel.Panel[]} items panels of viewport
* @property {Ext.panel.Panel} items.north 
* north region for header panel
* @property {App.view.header.Index} items.north.items
* header
* @property {Ext.panel.Panel} items.west
* west region for accordion panel
* @property {App.view.zoom.Index | App.view.switcher.Index | App.view.Overview} items.west.items
* accordion items
* @property {Ext.panel.Panel} items.center
* center region for map panel
* @property {App.view.yearslider.Index} items.center.header
* map panel header
* @property {App.view.Map | App.view.legend.Button | App.view.legend.Window | App.view.satellite.Button} items.center.items
* map items
* @property {Ext.ux.statusbar.StatusBar} items.center.bbar
* map bottom bar
* @property {Ext.panel.Panel} items.east
* east region for user polygon panel
* @property {App.view.polygon.Index} items.east.items
* user polygon toolbar
*/ 
  items: [
  
    {
      region: 'north',
      //Per WAI-ARIA, all regions should have a heading element that contains region's title.
      title: 'blupp',
      header: false,
      height: 55,
      items: [
        { xtype: 'app-header' }
      ]
    },
    //accordion panel
    {
      title: i18n.filter.title,
      region: 'west',
      margin: '0 5 0 0',
      width: 300,
      layout:{
        type: 'accordion',
        animate: true,
        multi: true,
        // specification of items with different heights (see flex configuration of items)
        fill: false
      },
      defaults: {
        scrollable: 'vertical'
      },
      items: [{ 
        xtype: 'app-zoom',
        collapsed : __Selection['AreaFilter'] == 'noshow',
        // adapted to content        
        flex: 0,
        listeners:{
          expand: function(p, eOpts){
            __LocalDB.set('AreaFilter', 'show');
          },
          collapse: function(p, eOpts){
            __LocalDB.set('AreaFilter', 'noshow');
          }          
        }
      } ,{ 
        xtype: 'app-switcher' , 
        collapsed : false,
        // fill space but larger
        flex: 2
      } ,{         
        xtype: 'app-exporter' , 
        collapsed : true,
        // adapted to content
        flex: 0        
      } ,{         
        xtype: 'app-overview' , 
        collapsed : true,
        // fill space but smaller
        flex: 1
      }]
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
          { xtype: 'app-yearslider' }
        ]
      },
      items: [
        { xtype: 'app-map', anchor: '100% 100%'},
        { xtype: 'app-legend-window'},
        { xtype: 'app-legend-button'},
        { xtype: 'app-satellite-button'},
        { xtype: 'app-exporter-window'}
      ],

      bbar: Ext.create('Ext.ux.StatusBar', {
        defaultText: '&#160;',
        itemId: 'app-status',
        cls: 'app-status',
        statusAlign: 'left'
      }),

      listeners: {
        afterrender: 'onMapAfterRender'
      }
    },

    {
      itemId: 'user-polygon',
      title: i18n.polygon.showPolygon,
      region: 'east',
      width: 170,
      collapsible: true, 
      collapsed: __Selection['UserPolygon'] == 'noshow',  
      collapseToolText: 'Hide My Polygons',
      expandToolText: 'Show My Polygons',
      titleCollapse: true,
      layout: 'fit',
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
