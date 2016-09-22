Ext.define('App.view.zoom.BtnOblast', {
  extend: 'Ext.button.Button',

  requires: [

  ],

  xtype: 'app-zoom-btn-oblast',

  itemId: 'zoom-btn-oblast',

  hidden: true,
  cls: 'zoomButton',

  text: i18n.adminFilters.oblastBtnText,
  tooltip: i18n.adminFilters.oblastBtnTooltip,
  handler: 'onBtnZoom'

});