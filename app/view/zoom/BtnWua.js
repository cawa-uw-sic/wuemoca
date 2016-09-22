Ext.define('App.view.zoom.BtnWua', {
  extend: 'Ext.button.Button',

  requires: [

  ],

  xtype: 'app-zoom-btn-wua',

  itemId: 'zoom-btn-wua',

  hidden: true,
  cls: 'zoomButton',

  text: i18n.adminFilters.wuaBtnText,
  tooltip: i18n.adminFilters.wuaBtnTooltip,
  handler: 'onBtnZoom'


});