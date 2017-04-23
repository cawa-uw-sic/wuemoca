Ext.define('App.view.legend.SlOpacityIrrigation', {
  extend: 'Ext.slider.Single',

  xtype: 'app-legend-sl-opacity-irrigation',

  itemId: 'legend-sl-opacity-irrigation',
  increment: 10,
  maxValue: 100,
  minValue: 0,
  value: 100,

  listeners: {
    change: 'onOpacityIrrigation'
  }
});