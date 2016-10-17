Ext.define('App.view.header.Help', {
  extend: 'Ext.button.Button',

  xtype: 'app-header-help',

  scale: 'large',
  tooltip: i18n.header.about,
  iconCls: 'help',
  menu: new Ext.menu.Menu({
    items: [{
      text: i18n.header.contact,
      tooltip: i18n.header.responsible,
      iconCls: 'email',
      listeners: {
        click: 'onContact'
      }
    },{
      text: i18n.header.glossary,
      tooltip: i18n.header.glossary_tooltip,
      iconCls: 'glossary',
      listeners: {
        click: 'onFAQ'
      }
    }]
  })

});
