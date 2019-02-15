Ext.define('App.view.legend.CxUserPolygon', {
  extend: 'Ext.form.field.Checkbox',

  xtype: 'app-legend-cx-userpolygon',

  itemId: 'legend-cx-userpolygon',

  boxLabel: i18n.polygon.userPolygons,
  
  checked: true,

  handler: 'onUserPolygon'

});