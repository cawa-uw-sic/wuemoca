/**
* Switcher window for download options
*/
Ext.define('App.view.exporter.Window', {
  extend: 'Ext.Window',

  xtype: 'app-exporter-window',

  itemId: 'exporter-window',

  id: 'exporter-window',

  requires: [
    //'App.controller.Switcher',
    'App.view.exporter.Form'
  ],

  controller: 'exporter',

  title: 'Download options',
  layout: { type: 'fit'},
  border: false,
  width: 300,
  height: 360,
  x: 10,
  //y: 10,
  collapsed: false,
  resizable: false,
  closeAction: 'hide',
  shadow: true,
  bodyBorder: false,
  //bodyPadding: 10,
  items: [
    { xtype: 'app-exporter-form' }
  ],
  listeners: { 
    boxready: function(){
      var data = App.service.Report.getYearData();
      data.unshift({id: 'all', name: i18n.exp.all});
      App.service.Helper.getComponentExt('exporter-cb-year').getStore().setData(data);
      App.service.Helper.getComponentExt('exporter-cb-year').setValue('all');      
    }
  }

});
