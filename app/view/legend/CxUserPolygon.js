Ext.define('App.view.legend.CxUserPolygon', {
  extend: 'Ext.form.field.Checkbox',

  xtype: 'app-legend-cx-userpolygon',

  itemId: 'legend-cx-userpolygon',

  boxLabel: i18n.polygon.showPolygon,
  
  checked: true,

  handler: 'onUserPolygon'

});