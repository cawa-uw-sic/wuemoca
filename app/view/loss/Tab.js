Ext.define('App.view.loss.Tab', {
  extend: 'Ext.tab.Panel',

  requires: [
    'App.view.loss.Grid'
  ],

  xtype: 'app-loss-form-tab',

  itemId: 'loss-form-tab',

  items: [
    {
      title: i18n.loss.tab1,

      layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
      },
      items: [
        { xtype: 'app-loss-grid'}
      ]
    }
  ]


});

