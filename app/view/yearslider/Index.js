Ext.define('App.view.yearslider.Index', {
  extend: 'Ext.form.Panel',

  requires: [
    'Ext.layout.container.VBox',
    'App.controller.Yearslider',
    'App.view.yearslider.Slider',
    'App.view.yearslider.Label'
  ],

  xtype: 'app-yearslider',

  itemId: 'app-yearslider',

  controller: 'yearslider',

  cls: 'app-yearslider',

  defaults: {
    anchor: '100%'
  },

  items: [
     { xtype: 'app-yearslider-slider' },
     { xtype: 'app-yearslider-label' }
  ]
});