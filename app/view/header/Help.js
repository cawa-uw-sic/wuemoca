Ext.define('App.view.header.Help', {
  extend: 'Ext.button.Button',

  xtype: 'app-header-help',

  scale: 'large',
  tooltip: i18n.header.help,
  iconCls: 'help',
  menu: new Ext.menu.Menu({
    items: [{
      text: i18n.header.imprint,
      //tooltip: i18n.header.imprint_tooltip,
      iconCls: 'x-fa fa-envelope',
      listeners: {
        click: 'onImprint'
      }
    },{
      text: i18n.header.manual,
      //tooltip: i18n.header.faq_tooltip,
      iconCls: 'x-fa fa-lightbulb-o',
      listeners: {
        click: 'onUserGuide'
      }     
    },{
      text:  i18n.header.overview,
      //tooltip: i18n.header.faq_tooltip,
      iconCls: 'x-fa fa-info',
      listeners: {
        click: 'onIndicatorOverview'
      }
    },{
      text: i18n.header.glossary,
      //tooltip: i18n.header.glossary_tooltip,
      iconCls: 'x-fa fa-book',
      listeners: {
        //click: 'onGlossary'
      }
   },{
      text: i18n.header.cawa_report,
      tooltip: i18n.header.cawa_report_tooltip,
      iconCls: 'x-fa fa-file-text',
      listeners: {
        click: 'onCawaReport'
      }
   // },{    
   //    text: i18n.header.video_general,
   //    //tooltip: i18n.header.glossary_tooltip,
   //    iconCls: 'x-fa fa-youtube-play',
   //    listeners: {
   //      click: 'onVideoHeader'
   //    }    
    }]
  })
});
