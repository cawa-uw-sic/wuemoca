Ext.define('App.view.yearslider.Slider', {
  extend: 'Ext.slider.Single',

  xtype: 'app-yearslider-slider',

  itemId: 'yearslider-slider',

  increment: 1,
  
  alwaysOnTop: true,

  useTips: false,

  width: 280,

  listeners: {

    change: 'onChange',
    changecomplete: 'onChangeComplete',

    afterrender: 'onAfterRender'

  }

});