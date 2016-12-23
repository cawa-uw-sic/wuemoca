Ext.define('App.view.switcher.Filter', {
  extend: 'Ext.form.FieldSet',

  xtype: 'app-switcher-filter',

  title: i18n.indicator.filter,

  itemId: 'switcher-filter',

 //padding: 5,
 hidden:true,

  checkboxToggle: true,
  collapsible: true,
  collapsed: true,

  listeners:{
  	beforecollapse: 'resetFilters',
  	beforeexpand:  'loadFilters'
  },

  layout: {
	type: 'vbox',
	align: 'stretch'
  },
  defaults: {
  	labelWidth: 60,
  	margin: '0 0 0 0'

  },

  items: []
});