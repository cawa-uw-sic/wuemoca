Ext.define('App.util.Window', {
  extend: 'Ext.Window',

  layout:'fit',
  border: false,
  width: (((__Global.year.Max - __Global.year.Min) + 1) * __Global.chart.BarWidth),//__Global.chart.Width,
  height: __Global.chart.Height,
  title: '',
  collapsed: false,
  resizable: false,
  closeAction: 'hide',
  plain: true,
  shadow: true,
  bodyBorder: false
  //x: 305
  //alignTarget: Ext.getBody(),
  //defaultAlign: 'lb-lb'

});
