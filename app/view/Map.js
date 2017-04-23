/**
* Map panel
*/
Ext.define('App.view.Map',{
  extend: 'GeoExt.component.Map',

  requires: [
    'App.controller.Map'
  ],

  xtype: 'app-map',
/**
* controller
*/
  controller: 'map',
/**
* listener
*/
  listeners: {
    afterrender: 'onAfterRender'
  },
/**
* @method
* initialize map
*/
  map: App.service.Map.initialize()
});
