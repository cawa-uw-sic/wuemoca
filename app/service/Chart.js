/**
* chart
*/
Ext.define('App.service.Chart', {

  singleton: true,

  requires: [
    'App.util.Window'
  ],
/**
 * @property isBusy
 */
  isBusy: false,
/**
 * @property isVisible
 */
  isVisible: true,
/**
 * @property window chart window
 */
  window: Ext.create('App.util.Window'),
/**
 * @property e click event
 */
  e: false,
/**
 * @property data data list
 */
  data: [],
/**
 * @property maxData
 */
  maxData: 0,
/**
 * @property userPolygon
 */
  userPolygon: false,
/**
 * @property stores chart store list
 * @property stores.defaults chart store for the default column or line charts
 * @property stores.cr chart store for gauge charts (crop rotation)
 * @property stores.flf chart store for gauge charts (fallow land frequency) 
 */
  stores: {
    defaults  : Ext.create('Ext.data.JsonStore'),
    cr  : Ext.create('Ext.data.JsonStore'),
    flf : Ext.create('Ext.data.JsonStore')
  },
  /**
  * @method initialize
  * apply close and boxready events to chart window
  */
  initialize: function () {
    var self = this;
    self.window.on("close", function () {
      App.service.Highlight.clear();
      self.data = [];
      App.service.Exporter.setDownloadCombotext();      
    });
    self.window.on("boxready", function (window) {

      window.setWidth(((__Global.year.Max - __Global.year.Min) + 1) * __Global.chart.BarWidth);
      window.setHeight(__Global.chart.Height);
      window.alignTo(App.service.Helper.getComponentExt('map-container'), 'bl-bl', [0, -25]);
      //window.alignTo(Ext.getBody(), 'bl-bl', [305, -25]);    
    });
  },
  /**
  * @method display
  * load requested data and show chart window
  * @param e
  * click event
  */
  display: function (e) {
    if (
      this.isBusy || 
      App.service.Polygon.activated || 
      App.service.Map.itsPolygon(e) || 
      !App.service.Watcher.get('Indicator') || 
      !App.util.Layer.current.getVisible()
    ){ 
      return false;
    } 
    this.e = e;
    this.doRequest();
  },
  /**
  * @method doRequest
  * do JSONP request with WMS getFeatureInfo and fill temporary data list
  */
  doRequest: function () {
    var self = this;
    if (self.isBusy) return false;
    var url = App.service.Map.getUrl(self.e, false);
    if (url){
      self.isBusy = true;
      Ext.data.JsonP.request({
        url : url,
        callbackName: 'ChartResponse',
        params: {format_options: 'callback:Ext.data.JsonP.ChartResponse'},
        success: function (results) {
          if (results.features.length > 0){
            self.dataResponse(results.features);
            App.service.Highlight.display(results.features);
            self.showWindow();
          }
          else{
            self.window.close();
          }
          App.service.Polygon.windowChart.close();
        },
        callback: function (results){
          self.isBusy = false;
          App.service.Exporter.setDownloadCombotext();        
        },
        failure: function(results){
          self.window.close();
        }
      });
    }
    else{
      self.window.close();
    }
  },
  /**
  * @method showWindow
  * add data list to chart, chart to window, set window title and show chart window
  */
  showWindow: function () {
    var self = this;
    var indicator = App.service.Watcher.getIndicator();
    var crop = App.service.Watcher.get('Crop');
    self.window.removeAll();
    if (!!indicator.chart && self.data.length > 0) {
      var first = self.data[0];
      var title = (first[ App.service.Watcher.get('Aggregation') + '_' + __Global.lang] || '') + ' '
        + App.service.Watcher.getAggregation()[__Global.lang + 'NameShort'];

      if (indicator.chart != 'Multiannual'){
        title += ' - ' + App.service.Map.getLegendTitle(true);
      }
      self.window.setTitle(title);

      if (indicator.chart != 'crops'){
      //if (typeof indicator.chart != 'object'){
        self.window.add(App.util.ChartTypes[indicator.chart](self.data));
      }
      else if (indicator.crops == 'all'){
        var chart = App.service.Helper.getById(__Crop, crop).chart;
        self.window.add(App.util.ChartTypes[chart](self.data));
      }
      self.userPolygon = false;
     // return self.window.show();
    }
    else{
      self.window.setTitle(i18n.chart.noChart + ' ' + indicator[__Global.lang + 'Name']);      
    }
    self.window.show();
  },
  /**
  * @method dataResponse
  * sort data response per year
  * @param data
  * temporary data list to be sorted
  */
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
  /**
  * @method loadData
  * set data to chart store
  */
  loadData: function () {
    var self = this;
    self.maxData = 0;
    var indicator = App.service.Watcher.getIndicator();    
    var yField = indicator.field;
    var crop = App.service.Watcher.get('Crop');
    if (!!indicator.crops) {
      yField = yField.replace('{crop}', crop);
    }    
    self.data.map(function (rec, i) {
      if (parseFloat(self.data[i][yField]) > self.maxData){
        self.maxData = parseFloat(self.data[i][yField]);
      }      
    });
    self.stores.defaults.setData(self.data);
  }

  /*exporter2Excel: function(){
    var indicator = App.service.Watcher.getIndicator();
    var aggregation = App.service.Watcher.get('Aggregation');
    if (aggregation != 'grid'){
      var indicator_field = '';
      var filename = '';
      var crop = App.service.Watcher.get('Crop');
      var outputname = indicator[__Global.lang + 'Name'].replace(/ /g,"_");
      if (!!indicator.crops) {
        if (crop == 'sum'){
          indicator.crops.map(function(c) {
            return indicator_field += ',' + indicator.id + '_' + c;
          });
        }
        else{
          indicator_field = ',' + indicator.id + '_' + crop;
        }
        filename = outputname + '_' + crop;
      }
      else{
        indicator_field = ',' + indicator.field;
        filename = outputname;
      }
      var aggregation_id = aggregation + '_id';
      var object_id = App.service.Chart.data[0][aggregation_id];
      var cql_filter = aggregation_id + '=' + object_id;
      var propertyname = aggregation_id + ',' + aggregation + '_' + __Global.lang + indicator_field;

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
  }*/

});
