/**
* Legend button
*/
Ext.define('App.view.legend.Button', {
  extend: 'Ext.button.Button',

  xtype: 'app-legend-button',

  itemId: 'legend-button',

  id: 'legend-button',

  text: i18n.settings.legend,
  height: 50,

  handler: 'onLegendBtn'

});

