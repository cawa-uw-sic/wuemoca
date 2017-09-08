Ext.define('App.view.legend.SlOpacityUserPolygon', {
  extend: 'Ext.slider.Single',

  xtype: 'app-legend-sl-opacity-userpolygon',

  itemId: 'legend-sl-opacity-userpolygon',
  increment: 10,
  maxValue: 100,
  minValue: 0,
  value: 100,

  listeners: {
    change: 'onOpacityUserPolygon'
  }
});