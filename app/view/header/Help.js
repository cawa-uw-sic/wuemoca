Ext.define('App.view.header.Help', {
  extend: 'Ext.button.Button',

  xtype: 'app-header-help',

  scale: 'large',
  tooltip: i18n.header.help,
  iconCls: 'help',
  menu: new Ext.menu.Menu({
    items: [{
      text: i18n.header.impressum,
      //tooltip: i18n.header.impressum_tooltip,
      iconCls: 'x-fa fa-envelope',
      listeners: {
        click: 'onImpressum'
      }
     },{
      text: i18n.header.manual,
      //tooltip: i18n.header.faq_tooltip,
      iconCls: 'x-fa fa-lightbulb-o',
      listeners: {
        click: 'onManual'
      }     
    },{
      text: i18n.header.faq,
      //tooltip: i18n.header.faq_tooltip,
      iconCls: 'x-fa fa-question',
      listeners: {
        click: 'onFaq'
      }
    },{
      text: i18n.header.glossary,
      //tooltip: i18n.header.glossary_tooltip,
      iconCls: 'x-fa fa-book',
      listeners: {
        click: 'onGlossary'
      }      
    }]
  })

});
