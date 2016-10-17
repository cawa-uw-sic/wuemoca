Ext.define('App.view.yearslider.Index', {
  extend: 'Ext.form.Panel',

  requires: [
    'Ext.layout.container.HBox',
    'App.controller.Yearslider',
    'App.view.yearslider.Slider',
    'App.view.yearslider.BtnPlay',
    'App.view.yearslider.BtnPause'
  ],

  xtype: 'app-yearslider',

  itemId: 'app-yearslider',

  controller: 'yearslider',

  cls: 'app-yearslider',

  defaults: {
    //anchor: '100%'
  },

  layout: 'hbox',

  items: [
    { xtype: 'app-yearslider-btn-play'  }
   ,{ xtype: 'app-yearslider-btn-pause' }
   ,{ xtype: 'label', text: __Global.year.Min, padding: '0 5px 0 10px', style: {color: '#f0f0f0', fontSize: '16px'}}
   ,{ xtype: 'app-yearslider-slider'}
   ,{ xtype: 'label', text: __Global.year.Max, padding: '0 10px 0 5px', style: {color: '#f0f0f0', fontSize: '16px'}}   
  ]
});