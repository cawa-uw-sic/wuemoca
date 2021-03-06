/**
* Legend window
*/
Ext.define('App.view.legend.Window', {
  extend: 'Ext.Window',

  xtype: 'app-legend-window',

  itemId: 'legend-window',

  id: 'legend-window',

  requires: [
    'App.controller.Legend',

    'Ext.layout.container.VBox',
    'Ext.layout.container.HBox',
    'App.view.legend.CxIrrigation',
    'App.view.legend.SlOpacityIrrigation',
    'App.view.legend.CxUserPolygon',
    'App.view.legend.SlOpacityUserPolygon',    
    'App.view.legend.CxCurrent',
    'App.view.legend.SlOpacityCurrent'
  ],

  controller: 'legend',

  title: i18n.settings.title,
  layout: { 
    type: 'vbox'
    , align: 'stretch' 
  },
  border: false,
  width: 300,
  autoHeight: true,
  minHeight: 162,
  //height: 300,
  x: Ext.getBody().getWidth() - 648,
  y: 8,
  collapsed: false,
  resizable: false,
  closeAction: 'hide',
  shadow: true,
  bodyBorder: false,
  bodyPadding: '10px 10px 0px 10px',
  //(problem with slider visibility: http://stackoverflow.com/questions/25667836/extjs-slider-not-visible-on-view)
  items: [{
    itemId: 'legend-irrigation',
    layout: { type: 'hbox', align: 'stretch' },
    items: [
       { xtype: 'app-legend-cx-irrigation',          flex: 3 }
      ,{ xtype: 'app-legend-sl-opacity-irrigation',  flex: 1 }
    ]
  }, {
    itemId: 'legend-userpolygon',
    layout: { type: 'hbox', align: 'stretch' },
    items: [
       { xtype: 'app-legend-cx-userpolygon',          flex: 3 }
      ,{ xtype: 'app-legend-sl-opacity-userpolygon',  flex: 1 }
    ]
  }, {    
    itemId: 'legend-current',
    layout: { type: 'hbox', align: 'stretch' },
    items: [
       { xtype: 'app-legend-cx-current',          flex: 3 }
      ,{ xtype: 'app-legend-sl-opacity-current',  flex: 1 }
    ]
  }, {

    xtype: 'fieldset',
    title: i18n.settings.showLegend,
    itemId: 'legend-panel',
    layout: { type: 'hbox', align: 'stretch' },

    collapsible: true,
    collapsed: true,

    items:[{
      xtype: 'component',
      itemId: 'legend-image',
      height: 150,
      width: 40
      //alt: 'legend'
      //src: ''
    },{
      xtype: 'component',
      itemId: 'legend-text',
      style: {
        padding: '0px 0px 0px 5px',
        fontSize: '13px',
        lineHeight: '130%'
      },

      html: ''

    }],
    listeners: {
      beforecollapse: function ( fieldset, eOpts ){
        fieldset.setTitle(i18n.settings.showLegend);
      },
      beforeexpand: function ( fieldset, eOpts ){
        fieldset.setTitle(i18n.settings.hideLegend);
      }
    }
  }],
  listeners:{
    hide: function(window){
      window.removeCls('polygon-window');
      App.service.Watcher.set('Legend', 'noshow');
    },
    show: function (window) {
      window.alignTo(App.service.Helper.getComponentExt('legend-button'), 'tr-tr', [0, 0]);
      App.service.Watcher.set('Legend', 'show');
      if (App.service.Watcher.get('UserPolygon') == 'show'){
        window.addCls('polygon-window');
      }
    },
    boxready: function (window){
      //if (!win.isHidden()){
        window.alignTo(App.service.Helper.getComponentExt('legend-button'), 'tr-tr', [0, 0]);
      //}
    }
  }

});
