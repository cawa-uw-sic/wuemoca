Ext.define('App.view.switcher.Filter', {
  extend: 'Ext.form.FieldSet',

  xtype: 'app-switcher-filter',

  title: i18n.product.filter,

  itemId: 'switcher-filter',

  bodyPadding: 10,

  collapsible: true,
  collapsed: true,

  items: []
});