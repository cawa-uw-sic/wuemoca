Ext.define('App.view.legend.CxCurrent', {
  extend: 'Ext.form.field.Checkbox',

  xtype: 'app-legend-cx-current',

  itemId: 'legend-cx-current',

  boxLabel: '',

  checked: App.service.Watcher.get('Current') == 'show' ? true : false,

  handler: 'onCurrentLayer'

});