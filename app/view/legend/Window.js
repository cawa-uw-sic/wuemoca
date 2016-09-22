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
  initCenter: false,
  collapsed: false,
  resizable: false,
  closeAction: 'hide',
  shadow: true,
  bodyBorder: false,
  bodyPadding: 10,

  items: [{
    layout: { type: 'hbox', align: 'stretch' },
    items: [
       { xtype: 'app-legend-cx-irrigation',          flex: 3 }
      ,{ xtype: 'app-legend-sl-opacity-irrigation',  flex: 1 }
    ]
  }, {
    layout: { type: 'hbox', align: 'stretch' },
    items: [
       { xtype: 'app-legend-cx-current',          flex: 3 }
      ,{ xtype: 'app-legend-sl-opacity-current',  flex: 1 }
    ]
  }, {
    xtype: 'app-legend-panel'
  }]

});
