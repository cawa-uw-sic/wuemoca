Ext.define('App.controller.Chart', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.chart',

  requires: [
    'App.service.Chart'
  ],

  display: function (e) {
    console.log('from controller');
  },

  onPrev: function () {
    App.service.Chart.prev();
  },

  onNext: function () {
    App.service.Chart.next();
  },

  onExcel: function () {
    var indicator = App.service.Watcher.getIndicator();
    var aggregation = App.service.Watcher.get('Aggregation');
    if (aggregation != 'grid'){
      var indicator_field = '';
      var filename = '';
      var crop = App.service.Watcher.get('Crop');
      if (!!indicator.crops) {
        if (crop == 'sum'){
          indicator.crops.map(function(c) {
            return indicator_field += ',' + indicator.id + '_' + c;
          });
        }
        else{
          indicator_field = ',' + indicator.id + '_' + crop;
        }
        filename = indicator.outputname + '_' + crop;
      }
      else{
        indicator_field = ',' + indicator.field;
        filename = indicator.outputname;
      }
      var aggregation_id = aggregation + '_id';
      if (aggregation == 'wua' || aggregation == 'command'){
        aggregation_id = 'gid';
      }
      var object_id = App.service.Chart.data[0][aggregation_id];
      var cql_filter = aggregation_id + '=' + object_id;
      var propertyname = aggregation_id + ',' + aggregation + '_' + __Global.Lang + indicator_field;

      var requesturl = __Global.urls.Mapserver + "wfs" +
      "?request=getfeature" +
      "&version=1.1.0" +
      "&outputformat=excel" +
      "&service=wfs" +
      "&typename=" + __Global.geoserverWorkspace + ':ca_' + aggregation + 
      "&CQL_FILTER=" + cql_filter + 
      "&propertyname=" + propertyname + ",year" +
      "&filename=" + object_id + '_' + aggregation + "_" + filename + ".xls"; 

      window.open(requesturl, 'download_excel');
    }
  }

});
