Ext.define('App.service.Polygon', {

  requires: [
    'App.util.Window'
  ],

  singleton: true,
  all: __LocalDB.get('Polygons', []),

  source: false,
  layer: false,

  drawControl: false,
  modifyControl: false,
  selectControl: false,

  activated: false,

  selected: false,
  isBusy: false,

  progressBar: false,

  windowEdit: Ext.create('App.util.Window', { title: i18n.exportUI.title, items: [{ xtype: 'app-polygon-form' }] }),

  windowChart: Ext.create('App.util.Window'),

  initialize: function () {

    var self = this;

    self.source = new ol.source.Vector();
    self.layer = new ol.layer.Vector({
      source: self.source,
      style: self.getDefaultColor
    });

    self.layer.setMap(App.service.Map.instance);

    self.drawControl = new ol.interaction.Draw({ type: ('Polygon') });

    self.selectControl = new ol.interaction.Select({
      layers: [self.layer],
      style: self.getSelectColor
    });

    App.service.Map.instance.addInteraction(self.drawControl);
    App.service.Map.instance.addInteraction(self.selectControl);
    self.deactivate();
    self.switchView(App.service.Watcher.get('UserPolygon') == 'show');

    self.selectControl.on('select', function (e) {

      if (e.selected.length < 1) {
        self.deselectMapAndList();       
        return false;
      }
      var uid = e.selected[0].get('uid');
      self.selectRowInGrid(uid);
    });

    self.drawControl.on('drawend', function (e) {
      var polygon = self.registerPolygon(e.feature.getGeometry());
      self.saveAll();
      self.rerenderFeatures();
      Ext.getStore('polygongrid').loadData(self.getGridData());      
      self.selectRowInGrid(polygon.uid);
      //prevent from zoom in with dblclick - see https://github.com/openlayers/openlayers/issues/3610
      setTimeout(function(){self.deactivate();},251);      
      App.service.Helper.hideComponents(['polygon-btn-deactivate']);
      App.service.Helper.showComponents(['polygon-btn-activate']);
    });
  },

  switchView: function(val){
    App.service.Watcher.set('UserPolygon', val ? 'show' : 'noshow');
    this.layer.setVisible(val);
    this.selectControl.setActive(val);
    if (val == false){
      this.deselectMapAndList();
      this.drawControl.setActive(false);
      this.activated = false;
      this.windowChart.close();
      this.windowEdit.close();
    }
    else{
      this.rerenderFeatures();
      App.service.Chart.window.close();
      App.service.Status.set('');
      App.service.Helper.getComponentExt('app-switcher').expand();
      App.service.Helper.getComponentExt('legend-cx-irrigation').setValue(true);
      App.service.Helper.getComponentExt('legend-window').hide();

    }
    App.service.Helper.getComponentExt('legend-cx-current').setValue(!val);
    App.service.Helper.getComponentExt('polygon-btn-activate').setDisabled(!val);
    App.service.Map.setMainTitle();

  },
  deselectMapAndList: function(){
    this.selectControl.getFeatures().clear();
    App.service.Helper.getComponentExt('polygon-grid').getSelectionModel().deselectAll();
    this.windowChart.close();
    this.windowEdit.close();
    this.selected = false;
  },
  activate: function () {
    this.drawControl.setActive(true);
    this.selectControl.setActive(false);
    this.activated = true;
    this.windowChart.close();
    this.deselectMapAndList();
  },

  deactivate: function () {
    this.drawControl.setActive(false);
    this.selectControl.setActive(true);
    this.activated = false;
  },

  getDefaultColor: function (feature) {
    var fillColor = '';
    var fillColorEmpty = 'rgba(127,205,187, 0.5)';
    var fillColorCalculated = 'rgba(29,145,192, 0.5)';
    if (feature.getProperties().data.length == 0){
      fillColor = fillColorEmpty;
    }
    else{
      fillColor = fillColorCalculated;      
    }
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: fillColor
      }),
      stroke: new ol.style.Stroke({
        color: '#016c59'
      }),
      text: new ol.style.Text({
        font: '12px sans-serif',
        text: feature.getProperties().name
      })
    });
  },

  getSelectColor: function (feature) {
    var fillColor = '';
    var fillColorEmpty = 'rgba(255,64,64, 0.6)';
    var fillColorCalculated = 'rgba(227,0,34, 0.6)';  
    if (feature.getProperties().data.length == 0){
      fillColor = fillColorEmpty;
    }
    else{
      fillColor = fillColorCalculated;      
    }      
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: fillColor
      }),
      stroke: new ol.style.Stroke({
        color: '#4d004b'
      }),
      text: new ol.style.Text({
        font: '12px sans-serif',
        fill: new ol.style.Fill({
          color: '#ffffff'
        }),
        text: feature.getProperties().name
      })
    });
  },

  updateWindowEdit: function (polygon) {
    var changeSelection = true;
    var selectedPolygons = this.getSelectedPolygons();
    if (selectedPolygons && selectedPolygons.length == 1){
      if (selectedPolygons[0].uid == polygon.uid){
        changeSelection = false;
      }
    }

    if (changeSelection){
      this.selectRowInGrid(polygon.uid);
    }
    App.service.Helper.setComponentsValue([
       { id: 'exportui-name',       value: polygon.info.name          || '' }
      ,{ id: 'exportui-location',   value: polygon.info.location      || '' }
      ,{ id: 'exportui-area',       value: polygon.totalArea + ' ha'  || '' }
    ]);
  },

  whenSelect: function () {
    App.service.Chart.window.close();
    if (!this.selected || this.selectControl.getFeatures().getLength() == 1){
      this.selected = [];
    }

    this.selected.push(this.selectControl.getFeatures().a[0]);

    var polygons = this.getSelectedPolygons();
    var nameEmpty = false;
    for (i = 0; i < polygons.length; ++i){
      if (polygons[i].info.name == ''){
        nameEmpty = true;
        break;
      }      
    }
    //no name
    if (nameEmpty){
      this.windowChart.close();
      //single polygon
      if (polygons.length == 1){
        this.updateWindowEdit(polygons[0]);
        this.windowEdit.show();        
      }
    }
    //with name
    else{ 
      //single polygon
      if (polygons.length == 1){
        if (!this.windowEdit.isHidden()) this.updateWindowEdit(polygons[0]);
        var name = polygons[0].info.name;
        App.service.Status.set(i18n.polygon.tooltip + ': ' + name);
        //no data
        if (polygons[0].data.length == 0){
          this.calculate();
        }
        //calculated data
        else{
          //if (!this.windowChart.isHidden()) this.showChartWindow(polygons[0]);
          this.showChartWindow(polygons[0]);
        }
      }
      //multiple polygons
      else{
        this.windowChart.close(); 
        this.windowEdit.close();
      }      
    }

  },

  registerPolygon: function (geometry) {
    var uniqueId = 'p-' + Date.now().toString().split('').reverse().join('');
    var polygon = {
      uid: uniqueId,
      info: { name: uniqueId, location: '' },
      totalArea: Array.isArray(geometry) ? this.calculateTotalArea(geometry, true) : this.calculateTotalArea(geometry, false),
      data: [],
      geometry: Array.isArray(geometry) ? geometry : geometry.getCoordinates()[0],
      extent: Array.isArray(geometry) ? this.calculateExtent(geometry, true) : this.calculateExtent(geometry, false)
    }

    this.all.push(polygon);
    this.saveAll();

    return polygon;
  },

  createFeature: function (polygon) {
    var feature = new ol.Feature(new ol.geom.Polygon([polygon.geometry]));
    feature.set('uid',  polygon.uid);
    feature.set('data', polygon.data);
    feature.set('name', polygon.info.name);
    return feature;
  },

  removeSelectedPolygons: function (polygon) {
    var changeSelection = true;
    var selectedPolygons = this.getSelectedPolygons();
    if (selectedPolygons && selectedPolygons.length == 1){
      if (polygon){
        if (selectedPolygons[0].uid == polygon.uid){
          changeSelection = false;
        }
      }
      else{
        polygon = selectedPolygons[0];
      }
    }

    if (polygon && changeSelection){
      this.selectRowInGrid(polygon.uid);
    }
    if (polygon){

      var indices = this.getSelectedIndices();
      for (i = 0; i < indices.length; ++i){
        this.all.splice(indices[i], 1); 
        if (indices[i+1]){
          indices[i+1] -= i+1; 
        }
      }
      this.saveAll();
      this.rerenderFeatures();
      /*for (i = 0; i < this.selected.length; ++i){
        this.source.removeFeature(this.selected[i]);
      }*/
      this.deselectMapAndList();
      this.windowEdit.close();
      this.windowChart.close();
      Ext.getStore('polygongrid').loadData(this.getGridData());
    }
  },

  selectFeatureFromGrid: function(uid){
    this.selectControl.getFeatures().clear();
    var feature = null;
    var features = this.layer.getSource().getFeatures();
    for (var f = 0; f < features.length; ++f) {
      if (features[f].get('uid') == uid){
        feature = features[f];
      }
    }
    if (feature){
      this.selectControl.getFeatures().push(feature);
      this.whenSelect();
    }
  },

  selectRowInGrid: function(uid){
    var rec = Ext.getStore('polygongrid').findRecord("uid", uid); 
    App.service.Helper.getComponentExt('polygon-grid').getSelectionModel().select(rec);    
  },

  getGridData: function(){
    self = this;
    var griddata = [];
    this.all.map(
      function(polygon){
        var extent = polygon.extent;
        if (!extent){
          extent = Array.isArray(polygon.geometry) ? self.calculateExtent(polygon.geometry, true) : self.calculateExtent(polygon.geometry, false);         
        }
        griddata.push({ uid: polygon.uid, name: polygon.info.name, extent: extent});
    });
    return griddata.reverse();
  },

  zoomToPolygon: function(extent){
    var transformation = false;
    App.service.Map.setMapExtent(extent, transformation); 
  },

  save: function (info) {
    this.getSelectedPolygons()[0].info = info;


    this.saveAll();
    this.rerenderFeatures();
    Ext.getStore('polygongrid').loadData(this.getGridData());      
    this.selectRowInGrid(this.getSelectedPolygons()[0].uid);    
  },

  saveAll: function () {
    __LocalDB.set('Polygons', this.all);
  },

  rerenderFeatures: function () {
    var self = this;
    var source = self.layer.getSource();
    source.clear();
    self.all.map(function (polygon) {
      source.addFeature(self.createFeature(polygon));
    });
  },

  /*getSelectedIndex: function () {
    return this.all.map(function (d) {
      return d.uid;
    }).indexOf(this.selected.get('uid'));
  },*/

  getSelectedIndices: function () {
    var indices = [];
    for (a = 0; a < this.all.length; ++a) {
      for (i = 0; i < this.selected.length; ++i) {
        if (this.all[a].uid == this.selected[i].get('uid')){
          indices.push(a);
        }
      }
    }
    return indices;
  },

  getSelectedPolygons: function () {
    var polygons = [];
    for (a = 0; a < this.all.length; ++a) {
      for (i = 0; i < this.selected.length; ++i) {
        if (this.all[a].uid == this.selected[i].get('uid')){
          polygons.push(this.all[a]);
        }
      }
    }
    return polygons;
  },  

  getPolygonFromUID: function(uid){
    for (a = 0; a < this.all.length; ++a) {
      if (this.all[a].uid == uid){
        return this.all[a];
      }
    }    
  },

  calculate: function () {
    var self = this;
    var polygons = self.all;
    //var polygons = self.getSelectedPolygons();
    //var sendRequest = false;
    var emptyPolygons = [];
    for (i = 0; i < polygons.length; ++i){
      if (polygons[i].data.length == 0){
        emptyPolygons.push(polygons[i]);
        //sendRequest = true;
        //break;
      }      
    }
    var count = emptyPolygons.length;
    var msg = i18n.polygon.progressMsg1 + ' ' + (count).toString() + ' ';
    msg += count > 1 ? i18n.polygon.progressMsg2multi : i18n.polygon.progressMsg2single;
    if (count > 0){
      var index = 0;
      //if (emptyPolygons.length > 1){
        self.progressBar = Ext.Msg.show({
          title: i18n.polygon.progressTitle,
          msg: msg,
          progressText: '',
          width: 300,
          progress: true,
          closable: false,
          modal: false,
          buttons: Ext.Msg.OK
        });
        self.progressBar.msgButtons.ok.disable();
        self.progressBar.updateProgress(index, '0 %');
      //}

      self.doRequest(index, emptyPolygons);
    }
    else{
      Ext.Msg.alert('', i18n.polygon.alreadyCalculated);
     }
  },

  doRequest: function (index, emptyPolygons) {
    var self = this;
    polygon = emptyPolygons[index];
    self.isBusy = true;
    Ext.getBody().setStyle('cursor','progress');
    var geometry = self.prepareRequestGeometry(polygon.geometry);
    Ext.data.JsonP.request({
      url : __Global.api.Polygon + 'geometry=' + geometry,
      callbackName: 'PolygonResponse',
      params: {format_options: 'callback:Ext.data.JsonP.PolygonResponse'},
      success: function (results) {
        polygon.data = results;
      },
      callback: function(results){
        self.isBusy = false;
        index++;
        if (results){ 
          var message = undefined;
          if (emptyPolygons.length == 1){
            message = polygon.info.name + ': ' + i18n.polygon.success;  
            self.zoomToPolygon(polygon.extent);
          }
          else if (index == emptyPolygons.length) {
            message = i18n.polygon.success;
          }                
          if (self.progressBar){
            self.progressBar.updateProgress(
              index/emptyPolygons.length, 
              Math.round(100 * index/emptyPolygons.length) + ' %', 
              message
            );
          }
        }
        if (index < emptyPolygons.length){
          //recursive function
          self.doRequest(index, emptyPolygons);
        }
        else{
          //loop finished
          Ext.getBody().setStyle('cursor','auto');
          self.saveAll();
          self.rerenderFeatures();
          if (self.progressBar){
            self.progressBar.msgButtons.ok.enable();
          }
        }
      },
      failure: function(results){
        if (emptyPolygons.length == 1){
          Ext.Msg.alert('', polygon.info.name + ': ' + i18n.polygon.failure);
        }
      }
    });
  },

  showChartWindow: function (polygon){
    var self = this;
    var changeSelection = true;
    var selectedPolygons = self.getSelectedPolygons();
    if (selectedPolygons && selectedPolygons.length == 1){
      if (polygon){
        if (selectedPolygons[0].uid == polygon.uid){
          changeSelection = false;
        }
      }
      else{
        polygon = selectedPolygons[0];
      }
    }

    if (polygon && changeSelection){
      self.selectRowInGrid(polygon.uid);
    }
    if (polygon){
      //var polygon = self.getSelectedPolygons()[0];
      var indicator = App.service.Watcher.getIndicator();
      var crop = App.service.Watcher.get('Crop');

      if (polygon.data.length > 0) {
        self.windowChart.removeAll();
        if (!!indicator.id){
          if (!!indicator.chart && indicator.chart != 'Multiannual'){
            var title = polygon.info.name + ' - ' + App.service.Map.getLegendTitle(true);
            self.windowChart.setTitle(title);

            App.service.Chart.dataResponse(polygon.data);

            if (typeof indicator.chart != 'object'){
              self.windowChart.add(App.util.ChartTypes[indicator.chart](polygon.data));
            }
            else{
              var idx = indicator.crops.indexOf(crop);
              self.windowChart.add(App.util.ChartTypes[indicator.chart[idx]](polygon.data));
            }
            App.service.Chart.userPolygon = true;
            //return self.windowChart.show();
          }
          else{
            self.windowChart.setTitle(i18n.chart.noChart + ' ' + indicator[__Global.Lang + 'Name']);      
          }
        }
        else{
          self.windowChart.setTitle(i18n.indicator.leftPanel);
        }
        self.windowChart.show();
      }
      //no calculated data
      else{
        self.windowChart.close();
        self.calculate();
        //alert(i18n.polygon.pressCalculate);
      }

    }
  },

  calculateTotalArea: function (polygon, array){
    var wgs84Sphere = new ol.Sphere(6378137);
    var coordinates = [];

    if (!array){
      var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
        __Global.projection.Mercator, 
        __Global.projection.Geographic
      ));
      coordinates = geom.getLinearRing(0).getCoordinates();
    }
    else{
      coordinates = App.service.Helper.transformPoints(
        polygon,
        __Global.projection.Mercator,
        __Global.projection.Geographic
      );
    }
    var area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
    return (area/10000).toFixed();
  },

  calculateExtent: function (polygon, array){
    var extent = [];

    if (!array){
      extent = polygon.getLinearRing(0).getExtent();
    }
    else{
      var geometry = new ol.geom.Polygon([polygon]);
      extent = geometry.getExtent();
    }
    return extent;
  },  

  prepareRequestGeometry: function (geometry) {
    var result = [];
    App.service.Helper.transformPoints(
      geometry,
      __Global.projection.Mercator,
      __Global.projection.Geographic
    ).map(function (g) {
      result.push(g.join(' '));
    });
    return result.join(',');
  },

  uploadShapefile: function (event) {
    App.service.Polygon.deselectMapAndList();
    loadshp({
      url: event.target.files[0],
      encoding: 'UTF-8',
      EPSG: 4326
    }, function(data) {
      data.features.map(function (polygon) {
        var geometry = App.service.Helper.transformPoints(
          polygon.geometry.coordinates[0],
          __Global.projection.Geographic,
          __Global.projection.Mercator
        )
        App.service.Polygon.registerPolygon(geometry);
      })
      App.service.Polygon.saveAll();
      App.service.Polygon.rerenderFeatures();
      Ext.getStore('polygongrid').loadData(App.service.Polygon.getGridData()); 
      App.service.Polygon.calculate();
    });
  },

  interpolateColor: function(color1, color2, color3, minimum, median, maximum, value){
    var red1 = (color1 & 0xff0000) >> 16;
    var green1 = (color1 & 0x00ff00) >> 8;
    var blue1 = (color1 & 0x0000ff) >> 0;

    var red2 = (color2 & 0xff0000) >> 16;
    var green2 = (color2 & 0x00ff00) >> 8;
    var blue2 = (color2 & 0x0000ff) >> 0;

    var red3 = (color3 & 0xff0000) >> 16;
    var green3 = (color3 & 0x00ff00) >> 8;
    var blue3 = (color3 & 0x0000ff) >> 0;

    if (value < median){
      redResult = this.interpolate(red1, red2, value, minimum, median);
      greenResult = this.interpolate(green1, green2, value, minimum, median);
      blueResult = this.interpolate(blue1, blue2, value, minimum, median);
    }
    else if (value == median){
      redResult = red2;
      greenResult = green2;
      blueResult = blue2;
    }
    else if (value > median){
      redResult = this.interpolate(red2, red3, value, median, maximum);
      greenResult = this.interpolate(green2, green3, value, median, maximum);
      blueResult = this.interpolate(blue2, blue3, value, median, maximum);
    }
    //RGB to Hex: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    return ((1 << 24) + (redResult << 16) + (greenResult << 8) + blueResult).toString(16).slice(1,7);
  },

  interpolate: function(color_a, color_b, idx, min, max){
    if (color_a < color_b) {
      return ((color_b - color_a) * (idx / (max-min))) + color_a;
    }
    else {
      return ((color_a - color_b) * (1 - (idx / (max-min)))) + color_b;
    }

  }

});