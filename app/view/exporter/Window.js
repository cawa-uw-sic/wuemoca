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
      // var years = App.service.Report.getYearData();
      // //add current year for user polygons if available
      // var polygon = App.service.Polygon.getSelectedPolygons()[0];
      // if (!!polygon){
      //   var last_polygon_year = polygon.data[polygon.data.length-1].year;
      //   if (last_polygon_year > years[years.length-1]){
      //     years.push({id: last_polygon_year, name: last_polygon_year});
      //   }
      // }
      // years.unshift({id: 1000, name: i18n.exp.all});
      // App.service.Helper.getComponentExt('exporter-tag-year').getStore().setData(years);
    },
    hide: function(window){
      window.removeCls('polygon-window');
    }
  }

});
