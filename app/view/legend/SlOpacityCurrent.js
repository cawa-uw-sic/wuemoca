Ext.define('App.view.legend.SlOpacityCurrent', {
  extend: 'Ext.slider.Single',

  xtype: 'app-legend-sl-opacity-current',

  itemId: 'legend-sl-opacity-current',
  increment: 10,
  maxValue: 100,
  minValue: 0,
  value: App.util.Layer.currentOpaque,

  listeners: {
    change: 'onOpacityCurrent'
  }
});