Ext.define('App.view.yearslider.BtnPlay', {
  extend: 'Ext.panel.Tool',

  xtype: 'app-yearslider-btn-play',

  itemId: 'yearslider-btn-play',

  cls: 'fa fa-play',

  tooltip: i18n.timeSlider.startAnimation,

  callback: 'onPlay'

});
