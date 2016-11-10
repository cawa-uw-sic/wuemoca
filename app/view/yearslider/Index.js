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

    { xtype: 'label', html: __Global.year.Min + ' <i class="fa  fa-caret-left"></i>', padding: '0 5px 0 10px', style: {color: '#f0f0f0', fontSize: '15px'}}
   ,{ xtype: 'app-yearslider-slider'}
   ,{ xtype: 'label', html: '<i class="fa  fa-caret-right"></i> ' + __Global.year.Max, padding: '0 10px 0 5px', style: {color: '#f0f0f0', fontSize: '15px'}} 
   ,{ xtype: 'app-yearslider-btn-play'  }
   ,{ xtype: 'app-yearslider-btn-pause' } 
  ]
});