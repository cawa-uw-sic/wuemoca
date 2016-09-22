Ext.define('App.view.Overview', {
  extend: 'Ext.panel.Panel',

  requires: [
    'Ext.layout.container.Fit'
  ],

  xtype: 'app-overview',

  itemId: 'app-overview',

  layout: 'fit',

  height: 500,

  title: i18n.map.title,

  bodyPadding: 10,

  items: []
});