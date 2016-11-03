Ext.define('App.view.header.Pilot', {
  extend: 'Ext.button.Button',

  xtype: 'app-header-pilot',

  tooltip: i18n.pilot.tooltip,
  text: i18n.pilot.text,
  menu: new Ext.menu.Menu({
    plain: true,
    items: [{
      text: i18n.fergana.text,
      tooltip: i18n.fergana.tooltip,
      listeners: {
        click: {
          fn: 'onPilot',
          //country, oblast, rayon, buis, uis, wua
          args: ['UZB', '1730', null, null, null, null]
       }
      }
    },{
      text: i18n.khorezm.text,
      tooltip: i18n.khorezm.tooltip,
      listeners: {
        click: {
          fn: 'onPilot',
           //country, oblast, rayon, buis, uis, wua
          args: ['UZB', '1733', null, null, null, null]
       }
      }
    },{
      text: i18n.dargom.text,
      tooltip: i18n.dargom.tooltip,
      listeners: {
        click: {
          fn: 'onPilot',
           //country, oblast, rayon, buis, uis, wua
          args: ['UZB', null, null, '1', '43', null]
       }
      }
    }
   ]
  })

});
