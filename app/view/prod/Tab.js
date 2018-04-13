Ext.define('App.view.prod.Tab', {
  extend: 'Ext.tab.Panel',

  requires: [
    'App.view.prod.Radio',
    'App.view.prod.FormByYear'
  ],

  xtype: 'app-prod-form-tab',

  itemId: 'prod-form-tab',

  defaults: {
    border: false,
    margin: 5
  },

  items: [
    {
      title: i18n.prod.tab1,
      items: [
        { xtype: 'app-prod-radio' },

        { xtype: 'container',
          itemId: 'app-prod-container',
          items: [{ xtype: 'app-prod-form-by-year' }]
        }
      ]
    }, {
      title: i18n.prod.tab2,
      items: [{ xtype: 'app-prod-form-secondary' }]
    }
  ]


});

