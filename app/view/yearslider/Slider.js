Ext.define('App.view.yearslider.Slider', {
  extend: 'Ext.slider.Single',

  xtype: 'app-yearslider-slider',

  itemId: 'yearslider-slider',

  margin: '0 10',

  increment: 1,
  
  alwaysOnTop: true,

//  minValue: __Global.year.Min,

//  maxValue: __Global.year.Max,

  listeners: {

    changecomplete: 'onChange',

    afterrender: 'onAfterRender'

  }

});