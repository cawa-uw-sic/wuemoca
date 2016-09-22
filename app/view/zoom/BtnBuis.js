Ext.define('App.view.zoom.BtnBuis', {
  extend: 'Ext.button.Button',

  requires: [

  ],

  xtype: 'app-zoom-btn-buis',

  itemId: 'zoom-btn-buis',

  hidden: true,
  cls: 'zoomButton',

  text: i18n.adminFilters.buisBtnText,
  tooltip: i18n.adminFilters.buisBtnTooltip,
  handler: 'onBtnZoom'


});