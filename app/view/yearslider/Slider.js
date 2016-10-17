Ext.define('App.view.yearslider.Slider', {
  extend: 'Ext.slider.Single',

  xtype: 'app-yearslider-slider',

  itemId: 'yearslider-slider',

  increment: 1,
  
  alwaysOnTop: true,

  width: 300,

  listeners: {

    changecomplete: 'onChange',

    afterrender: 'onAfterRender'

  }

});