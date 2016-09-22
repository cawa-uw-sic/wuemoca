Ext.define('App.view.header.Help', {
  extend: 'Ext.button.Button',

  xtype: 'app-header-help',

  tooltip: i18n.header.about,
  iconCls: 'fa fa-question',
  menu: new Ext.menu.Menu({
    items: [{
      text: i18n.header.contact,
      tooltip: i18n.header.responsible,
      iconCls: 'fa fa-envelope',
      listeners: {
        click: 'onContact'
      }
    },{
      text: 'FAQ´s',
      tooltip: i18n.header.faq,
      iconCls: 'fa fa-question',
      listeners: {
        click: 'onFAQ'
      }
    }]
  })

});
