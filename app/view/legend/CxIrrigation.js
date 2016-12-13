Ext.define('App.view.legend.CxIrrigation', {
  extend: 'Ext.form.field.Checkbox',

  xtype: 'app-legend-cx-irrigation',

  itemId: 'legend-cx-irrigation',

  boxLabel: '<span style="background-color:' + max_irr_area_color + ';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ' + i18n.settings.extent,
  
  checked: App.service.Watcher.get('IrrigationExtent'),

  handler: 'onIrrigationExtent'

});