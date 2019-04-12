Ext.define('App.view.legend.CxIrrigation', {
  extend: 'Ext.form.field.Checkbox',

  xtype: 'app-legend-cx-irrigation',

  itemId: 'legend-cx-irrigation',

  boxLabel: '<span style="background-color:#AADD00;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ' + i18n.settings.extent,
  
  checked: App.service.Watcher.get('IrrigationExtent') == 'show' ? true : false,

  handler: 'onIrrigationExtent'

});