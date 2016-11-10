Ext.define('App.service.Chart', {

  singleton: true,

  requires: [
    'App.util.Window'
  ],

  isBusy: false,

  isVisible: true,

  window: Ext.create('App.util.Window'),

  e: false,

  data: [],

  maxData: 0,

  //startFrom: (__Global.year.Max - __Global.year.Min) - (__Global.chart.MaxBars - 1),

  //maxBars: __Global.chart.MaxBars,

  userPolygon: false,

  stores: {
    defaults  : Ext.create('Ext.data.JsonStore'),
    //stacked   : Ext.create('Ext.data.JsonStore'),
    //kir       : Ext.create('Ext.data.JsonStore'),
    //fir       : Ext.create('Ext.data.JsonStore'),
    rotation  : Ext.create('Ext.data.JsonStore'),
    frequency : Ext.create('Ext.data.JsonStore')
  },

  initialize: function () {
    var self = this;
    self.window.on("close", function () {
      App.service.Highlight.clear();
    });
  },

  display: function (e) {
    if (this.isBusy || App.service.Polygon.activated || App.service.Map.itsPolygon(e) || !App.util.Layer.current.getVisible()) return false;
    this.e = e;
    this.doRequest();
  },

  doRequest: function () {
    var self = this;
    self.isBusy = true;
    Ext.data.JsonP.request({
      url : App.service.Map.getUrl(self.e, false),
      callbackName: 'ChartResponse',
      params: {format_options: 'callback:Ext.data.JsonP.ChartResponse'},
      success: function (results) {
        self.isBusy = false;
        self.dataResponse(results.features);
        App.service.Highlight.display(results.features);
        self.showWindow();
        App.service.Polygon.windowChart.close();
      }
    });
  },

  showWindow: function () {
    var self = this;
    var indicator = App.service.Watcher.getIndicator();
    var crop = App.service.Watcher.get('Crop');
    if (!!indicator.chart && self.data.length > 0) {
      var first = self.data[0];
      var title = (first[ App.service.Watcher.get('Aggregation') + '_' + __Global.Lang] || '') + ' '
        + App.service.Watcher.getAggregation()[__Global.Lang + 'NameShort'];

      if (indicator.chart != 'Multiannual'){
        title += ' - ' + App.service.Map.getLegendTitle(true);
      }
      self.window.setTitle(title);
      self.window.removeAll();

      if (typeof indicator.chart != 'object'){
        self.window.add(App.util.ChartTypes[indicator.chart](self.data));
      }
      else{
        var idx = indicator.crops.indexOf(crop);
        self.window.add(App.util.ChartTypes[indicator.chart[idx]](self.data));
      }
      self.userPolygon = false;
      return self.window.show();
    }
    self.window.close();
  },

  dataResponse: function (data) {
    this.data = [];
    if (data[0].properties){
      for (var i = 0; i < data.length; i++) {
        var index = this.data.map(function (d) { return d.year; }).indexOf(data[i].properties.year);
        if (index < 0) this.data.push(data[i].properties);
      }
      this.data.sort(function (a, b) {
        if (a.year > b.year) return 1;
        if (a.year < b.year) return -1;
        return 0;
      });
    }
    else{
      this.data = data;
    }

  },

  loadData: function () {
    var self = this;
    //self.data = data;
    self.maxData = 0;
    var indicator = App.service.Watcher.getIndicator();    
    var yField = indicator.field;
    var crop = App.service.Watcher.get('Crop');
    if (!!indicator.crops) {
      yField = yField.replace('{crop}', crop);
    }    
    //var data_selection = [];
    self.data.map(function (rec, i) {
      if (parseFloat(self.data[i][yField]) > self.maxData){
        self.maxData = parseFloat(self.data[i][yField]);
      }      
      //if (i < self.startFrom || data_selection.length > self.maxBars - 1) return false;
      //return data_selection.push(rec);
    });
    self.stores.defaults.setData(self.data);
    //self.stores.defaults.setData(data_selection);
  },

  /*prev: function () {
    if (this.startFrom <= 0) return false;
    this.startFrom -= 1;
    this.loadData();
  },

  next: function () {
    if (this.startFrom > (this.data.length - 1 - this.maxBars)) return false;
    this.startFrom += 1;
    this.loadData();
  },*/

  export2Excel: function(){
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
     /* if (aggregation == 'wua' || aggregation == 'command'){
        aggregation_id = 'gid';
      }*/
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
