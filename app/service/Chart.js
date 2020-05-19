/**
* chart methods
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
  window: Ext.create('App.util.Window',{
    tools: [{
      type: 'prev',
      itemId: 'chart-tool-prev',
      tooltip: i18n.chart.prevIndicator,
      callback: function() {
        App.service.Chart.changeIndicatorChart('prev');
        App.service.Chart.showWindow();
      }
    }, {
      type: 'next',
      itemId: 'chart-tool-next',      
      tooltip: i18n.chart.nextIndicator, 
      callback: function() {
        App.service.Chart.changeIndicatorChart('next');
        App.service.Chart.showWindow();
      }
    }]
  }),  
/**
 * @property e click event
 */
  e: false,
/**
 * @property click_coordinates coordinates of click event
 */
  click_coordinates: false,
/**
 * @property data data list stored with the chart
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
 * @property stores.lur chart store for gauge charts (land use rotation)
 * @property stores.flf chart store for gauge charts (fallow land frequency) 
 */
  stores: {
    defaults: Ext.create('Ext.data.JsonStore'),
    lur     : Ext.create('Ext.data.JsonStore'),
    flf     : Ext.create('Ext.data.JsonStore')
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
      self.click_coordinates = false;
      App.service.Exporter.setDownloadCombotext(); 
        
    });
    self.window.on("boxready", function (window) {
      window.setWidth(((__Global.year.Max - __Global.year.Min) + 1) * __Global.chart.BarWidth);
      window.setHeight(__Global.chart.Height);
      window.alignTo(App.service.Helper.getComponentExt('map-container'), 'bl-bl', [0, -25]);
    });
  },

  /**
  * @method display
  * load requested data and show chart window
  * @param e
  * click event
  */
  display: function (e) {
    //reasons for no request for getfeatureinfo: 
    //isBusy: another request is running, 
    //an user polygon was clicked, 
    //no indicator was selected, 
    //respective layer is invisible
    if (
      this.isBusy || 
      App.service.Polygon.activated || 
      App.service.Map.itsPolygon(e) || 
      !App.service.Watcher.get('Indicator') || 
      (!!App.util.Layer.current && !App.util.Layer.current.getVisible()) ||
      (!!App.util.Layer.admin && !App.util.Layer.admin.getVisible())       
    ){ 
      this.window.close();
      return false;
    } 
    this.e = e;
    this.click_coordinates = e.coordinate;
    this.doRequest();
  },

  /**
  * @method doRequest
  * do JSONP request with WMS getFeatureInfo and fill temporary data list
  */
  doRequest: function () {
    var self = this;
    if (self.isBusy) return false;
    var url = App.service.Map.getUrl(self.click_coordinates, false, false);
    
    if (!!url){
      self.isBusy = true;
      Ext.data.JsonP.request({
        url : url,
        callbackName: 'ChartResponse',
        params: {format_options: 'callback:Ext.data.JsonP.ChartResponse'},
        success: function (results) {
          if (results.features.length > 0){
            //features with values for all available years
            self.data = self.dataResponse(results.features);
            //all annual geometries are identical, for geometry (in EPSG:4326) take the first feature
            var coordinates = results.features[0].geometry.coordinates;
            App.service.Highlight.display(coordinates);
            self.showWindow();
            //prepare import possibility to user polygon
            if (App.service.Watcher.getIndicator().chart != 'Multiannual'){
              var first = self.data[0];
              var name = (first[ App.service.Watcher.get('Aggregation') + '_' + __Global.lang] || '') + ' '
                + App.service.Watcher.getAggregation()[__Global.lang + 'NameShort'];
              //store multipolygon coordinates, extent and wkt_geometry
              //Geometry format for reading and writing data in the WellKnownText (WKT) format in WGS 84.
              var wkt_geometry = new ol.format.WKT().writeGeometry(new ol.geom.MultiPolygon(coordinates).transform(__Global.projection.Mercator, __Global.projection.Geographic));        
              App.service.Polygon.importSelectedGeometry(
                coordinates, 
                BackgroundLayers.highlight.getSource().getExtent(),
                wkt_geometry
              );
              //duplicate array of nested objects, don't change original data
              var data_copy = JSON.parse(JSON.stringify(self.data));
              App.service.Polygon.importSelectedData(data_copy, name);
            }
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
    self.window.removeAll();
    if (!!indicator.chart && self.data.length > 0) {
      if (indicator.chart != 'crops'){
        self.window.add(App.util.ChartTypes[indicator.chart](self.data));
      }
      else {
        self.window.add(App.util.ChartTypes[App.service.Watcher.getCrop().chart](self.data));
      }

      var first = self.data[0];
      var title = (first[ App.service.Watcher.get('Aggregation') + '_' + __Global.lang] || '') + ' '
        + App.service.Watcher.getAggregation()[__Global.lang + 'NameShort'];

      if (indicator.chart != 'Multiannual'){
        var bigdata = 'no';
        if (self.maxData > 1000){
          bigdata = 'thousand';
          if (self.maxData > 1000000){
            bigdata = 'million';
          }
        }
        title += ': ' + App.service.Map.getLegendTitle(true, bigdata);
        App.service.Helper.showComponents(['chart-tool-prev', 'chart-tool-next']);
      }
      else{
        App.service.Helper.hideComponents(['chart-tool-prev', 'chart-tool-next']);
      }
      self.window.setTitle(title);
      self.userPolygon = false;

    }
    else{
      self.window.setTitle(i18n.chart.noChart + ' ' + indicator[__Global.lang + 'Name'] + ' ' + (indicator[__Global.lang + 'Affix'] || ''));      
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
    var properties = [];
    if (data[0].properties){
      var gid = data[0].properties.gid;
      for (var i = 0; i < data.length; i++) {
        //take only data with the same gid and not from current year
        if ((data[i].properties.gid == gid) && (!data[i].properties.year || data[i].properties.year <= __Global.year.Max))  {
          properties.push(data[i].properties);
        }
      }
    }
    else{
      var gid = data[0].gid;
      for (var i = 0; i < data.length; i++) {
        //take only data with the same gid and not from current year
        if ((data[i].gid == gid) && (!data[i].year || data[i].year <= __Global.year.Max))  {
          properties.push(data[i]);
        }
      }      
    }
    properties.sort(function (a, b) {
      if (a.year > b.year) return 1;
      if (a.year < b.year) return -1;
      return 0;
    });
    return properties;
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
      //adapt max data
      if (self.data[i][yField] != Infinity && parseFloat(self.data[i][yField]) > self.maxData){
        self.maxData = parseFloat(self.data[i][yField]);
      } 
      //hide no data values in line charts
      if (indicator.chart == 'Line'){
        if (parseFloat(self.data[i][yField]) == -1 || (!self.data[i][yField] && indicator.id != 'cd')){
          self.data[i][yField] = Infinity;
        }
      }     
    });
    self.stores.defaults.setData(self.data);
  },

  changeIndicatorChart: function(direction){
    var ind = App.service.Watcher.get('Indicator');
    var crop = App.service.Watcher.get('Crop');
    var list = App.service.Helper.getIndicators_Crops(this.userPolygon);
    var index = 0;
    list.map(function (l) {
      if (l.ind == ind && l.crop == crop) index = l.id;
    });
    var new_index = (direction == 'prev') ? index - 1 : index + 1;
    if (new_index == 0){
      new_index = list.length;
    }
    else if (new_index > list.length){
      new_index = 1;
    }
    var new_ind = '';
    var new_crop = '';
    list.map(function (l) {
      if (l.id == new_index) {
        new_ind = l.ind;
        new_crop = l.crop;
      }
    });    
    App.service.Watcher.set('Indicator', new_ind);
    App.service.Watcher.set('Crop', new_crop);    
    if (ind != new_ind){       
      App.service.Helper.setComponentsValue([{id: 'switcher-cb-indicator', selection: 'Indicator'}]);
    }
    App.service.Map.fillCrops();
  }

});
