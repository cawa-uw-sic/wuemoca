/**
* Exporter window for download options
*/
Ext.define('App.view.exporter.Window', {
  extend: 'Ext.Window',

  xtype: 'app-exporter-window',

  itemId: 'exporter-window',

  id: 'exporter-window',

  requires: [
    'App.view.exporter.Form'
  ],

  controller: 'exporter',

  title: i18n.exp.opts,
  layout: { type: 'fit'},
  border: false,
  width: 300,
  //height: 360,
  x: 10,
  //y: 10,
  collapsed: false,
  resizable: false,
  closeAction: 'hide',
  shadow: true,
  bodyBorder: false,

  items: [
    { xtype: 'app-exporter-form' }
  ],
  listeners: { 
    boxready: function(){
      var years = App.service.Report.getYearData();
      App.service.Helper.getComponentExt('exporter-tag-year').getStore().setData(years);
    }
  }

});
