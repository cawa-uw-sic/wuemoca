Ext.define('App.view.zoom.BtnUis', {
  extend: 'Ext.button.Button',

  requires: [

  ],

  xtype: 'app-zoom-btn-uis',

  itemId: 'zoom-btn-uis',

  hidden: true,
  cls: 'zoomButton',

  text: i18n.adminFilters.uisBtnText,
  tooltip: i18n.adminFilters.uisBtnTooltip,
  handler: 'onBtnZoom'

});