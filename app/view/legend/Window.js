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
    'App.view.legend.CxCurrent',
    'App.view.legend.SlOpacityCurrent',
    'App.view.legend.Panel'
  ],

  controller: 'legend',

  title: i18n.settings.title,
  layout: { type: 'vbox', align: 'stretch' },
  border: false,
  width: 300,
  height: 300,
  x: Ext.getBody().getWidth() - 650,
  y: 10,
  initCenter: false,
  collapsed: false,
  resizable: false,
  closeAction: 'hide',
  shadow: true,
  bodyBorder: false,
  bodyPadding: 10,
  //(problem with slider visibility: http://stackoverflow.com/questions/25667836/extjs-slider-not-visible-on-view)
  items: [{
    itemId: 'legend-irrigation',
    layout: { type: 'hbox', align: 'stretch' },
    items: [
       { xtype: 'app-legend-cx-irrigation',          flex: 3 }
      ,{ xtype: 'app-legend-sl-opacity-irrigation',  flex: 1 }
    ]
  }, {
        itemId: 'legend-current',
    layout: { type: 'hbox', align: 'stretch' },
    items: [
       { xtype: 'app-legend-cx-current',          flex: 3 }
      ,{ xtype: 'app-legend-sl-opacity-current',  flex: 1 }
    ]
  }, {
    xtype: 'app-legend-panel'
  }]

});
