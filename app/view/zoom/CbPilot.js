Ext.define('App.view.zoom.CbPilot', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Pilot'
  ],

  xtype: 'app-zoom-cb-pilot',

  itemId: 'zoom-cb-pilot',
  
 // emptyText: i18n.adminFilters.buis_empty,
  fieldLabel: i18n.pilot.text,

  store: {
    type: 'pilot'
  },

  displayField: 'name',
  queryMode: 'local',
  valueField: 'id',

  editable: false,

  listeners: {
    //change: 'onPilot'
    select: 'onPilot'
    /*{
        fn: 'onPilot',
        //country, oblast, rayon, buis, uis, wua
        args: ['UZB', '1730', null, null, null, null]
     }*/
  }

});