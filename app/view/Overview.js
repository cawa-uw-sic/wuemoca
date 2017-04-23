/**
* Overview map panel
*/
Ext.define('App.view.Overview', {
  extend: 'Ext.panel.Panel',

  requires: [
    'Ext.layout.container.Fit'
  ],

  xtype: 'app-overview',
/**
* itemId
*/
  itemId: 'app-overview',
/**
* layout
*/
  layout: 'fit',
/**
* height
*/
  height: 500,
/**
* title depending on locale
*/
  title: i18n.map.title,
/**
* bodyPadding
*/
  bodyPadding: 10,
/**
* items, will be filled on loading
*/
  items: []
});