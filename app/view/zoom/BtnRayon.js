Ext.define('App.view.zoom.BtnRayon', {
  extend: 'Ext.button.Button',

  requires: [

  ],

  xtype: 'app-zoom-btn-rayon',

  itemId: 'zoom-btn-rayon',

  hidden: true,
  cls: 'zoomButton',

  text: i18n.adminFilters.rayonBtnText,
  tooltip: i18n.adminFilters.rayonBtnTooltip,
  handler: 'onBtnZoom'

});