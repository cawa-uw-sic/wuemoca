Ext.define('App.view.yearslider.BtnPause', {
  extend: 'Ext.panel.Tool',

  xtype: 'app-yearslider-btn-pause',

  itemId: 'yearslider-btn-pause',

  cls: 'fa fa-pause',

  hidden: true,

  tooltip: i18n.timeSlider.stopAnimation,

  callback: 'onPause'

});