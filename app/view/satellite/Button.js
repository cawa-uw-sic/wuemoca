Ext.define('App.view.satellite.Button', {
  extend: 'Ext.button.Button',

  xtype: 'app-satellite-button',

  itemId: 'satellite-button',

  id: 'satellite-button',

  text: i18n.map.onSatellite,
  height: 50,

  handler: 'onSatelliteBtn'

});

