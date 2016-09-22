Ext.define('App.view.Map',{
  extend: 'GeoExt.component.Map',

  requires: [
    'App.controller.Map'
  ],

  xtype: 'app-map',

  controller: 'map',

  listeners: {
    afterrender: 'onAfterRender'
  },

  map: App.service.Map.initialize()
});
