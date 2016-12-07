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
    this.deactivate();

    self.selectControl.on('select', function (e) {
      self.whenUnselect(e);
      if (e.selected.length < 1) return false;
      self.whenSelect(e);
    });

    self.drawControl.on('drawend', function (e) {
      self.registerPolygon(e.feature.getGeometry());
      self.rerenderFeatures();
      self.deactivate();
      App.service.Helper.hideComponents(['polygon-btn-deactivate']);
      App.service.Helper.showComponents(['polygon-btn-activate']);
    });

    self.rerenderFeatures();
    self.switchView(__LocalDB.get('Selections.UserPolygon', false));
  },

  switchView: function(val){
    App.service.Watcher.set('UserPolygon', val);
    this.layer.setVisible(val);
    this.selectControl.setActive(val);
    if (val == false){
      this.selectControl.getFeatures().clear();
      this.drawControl.setActive(false);
      this.activated = false;
      this.whenUnselect();
      this.windowChart.close();
      this.windowEdit.close();
      App.service.Map.setMainTitle();
    }
    else{
      App.service.Chart.window.close();
      App.service.Status.set(' ');
      App.service.Helper.getComponentExt('app-switcher').expand();
    }
    App.service.Helper.getComponentExt('legend-cx-irrigation').setValue(val);
    App.service.Helper.getComponentExt('legend-cx-current').setValue(!val);
    App.service.Helper.getComponentExt('polygon-btn-activate').setDisabled(!val);
    App.service.Map.setMainTitle();
    //App.service.Yearslider.didRender();
  },

  activate: function () {
    this.drawControl.setActive(true);
    this.selectControl.setActive(false);
    this.activated = true;
    this.selectControl.getFeatures().clear();
    this.whenUnselect();
    this.selected = false;
    this.windowChart.close();
  },

  deactivate: function () {
    this.drawControl.setActive(false);
    this.selectControl.setActive(true);
    this.activated = false;
  },

  getDefaultColor: function (feature) {
    var fillColor = '';
    var fillColorEmpty = 'rgba(127,205,187, 0.6)';
    var fillColorCalculated = 'rgba(29,145,192, 0.6)';
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
        text: feature.getProperties().name
      })
    });
  },

  getSelectColor: function (feature) {
    var fillColor = '';
    var fillColorEmpty = 'rgba(255, 255, 255, 0.6)';
    var fillColorCalculated = 'rgba(255,255,217, 0.6)';  
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
        text: feature.getProperties().name
      })
    });
  },

  updateWindowEdit: function () {
    var polygons = this.getSelectedPolygons();
    if (polygons.length == 1){
      App.service.Helper.setComponentsValue([
         { id: 'exportui-name',       value: polygons[0].info.name     || '' }
        ,{ id: 'exportui-location',   value: polygons[0].info.location || '' }
        ,{ id: 'exportui-area',   value: polygons[0].totalArea + ' ha' || '' }
      ]);
    }
  },

  whenUnselect: function (e) {
    App.service.Helper.disableComponents(['polygon-btn-edit', 'polygon-btn-calculate', 'polygon-btn-remove']);
    this.windowChart.close();
    this.windowEdit.close();
  },

  whenSelect: function (e) {
    App.service.Chart.window.close();
    if (e.deselected.length > 0 || !this.selected || this.selectControl.getFeatures().getLength() == 1){
      this.selected = [];
    }
    this.selected.push(e.selected[0]);

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
        App.service.Helper.enableComponents(['polygon-btn-edit', 'polygon-btn-remove']);
        this.updateWindowEdit();
        this.windowEdit.show();        
      }
      //multiple polygons
      else{
        App.service.Helper.enableComponents(['polygon-btn-remove']);
      }
    }
    //with name
    else{ 
      //single polygon
      if (polygons.length == 1){
        if (!this.windowEdit.isHidden()) this.updateWindowEdit();
        var name = polygons[0].info.name;
        App.service.Status.set(i18n.polygon.tooltip + ': ' + name);
        //no data
        if (polygons[0].data.length == 0){
          alert(i18n.polygon.pressCalculate);
          App.service.Helper.enableComponents(['polygon-btn-edit', 'polygon-btn-calculate', 'polygon-btn-remove']);
        }
        //calculated data
        else{
          App.service.Helper.enableComponents(['polygon-btn-edit', 'polygon-btn-remove']);
          this.showChartWindow();     
        }
      }
      //multiple polygons
      else{
        this.windowChart.close(); 
        this.windowEdit.close();
        App.service.Helper.enableComponents(['polygon-btn-calculate', 'polygon-btn-remove']);             
      }      
    }

  },

  registerPolygon: function (geometry) {
    var polygon = {
      uid: 'polygon-' + new Date().getTime(),
      info: { name: '', location: '' },
      totalArea: Array.isArray(geometry) ? this.calculateTotalArea(geometry, true) : this.calculateTotalArea(geometry, false),
      data: [],
      geometry: Array.isArray(geometry) ? geometry : geometry.getCoordinates()[0]
    };

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

  removeSelectedPolygons: function () {
    var indices = this.getSelectedIndices();
    for (i = 0; i < indices.length; ++i){
      this.all.splice(indices[i], 1); 
      if (indices[i+1]){
        indices[i+1] -= i+1; 
      }
    }
    this.saveAll(); 
    for (i = 0; i < this.selected.length; ++i){
      this.source.removeFeature(this.selected[i]);
    }
    this.selectControl.getFeatures().clear();
    this.whenUnselect();
    this.selected = false;
    this.windowEdit.close();
    this.windowChart.close();
  },

  save: function (info) {
    this.getSelectedPolygons()[0].info = info;
    this.rerenderFeatures();
    this.saveAll();
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

  calculate: function () {
    var self = this;
    var polygons = self.getSelectedPolygons();
    var sendRequest = false;
    for (i = 0; i < polygons.length; ++i){
      if (polygons[i].data.length == 0){
        sendRequest = true;
        break;
      }      
    }
    if (sendRequest){
      var index = 0;
      if (polygons.length > 1){
        self.progressBar = Ext.Msg.show({
          title: i18n.polygon.progressTitle,
          msg: i18n.polygon.progressMsg,
          progressText: '',
          width: 300,
          progress: true,
          closable: false,
          modal: false
        });
        self.progressBar.updateProgress(index, '0 %');
      }

      self.doRequest(index, polygons);
    }
    else{
      alert(i18n.polygon.alreadyCalculated);      
    }
  },

  doRequest: function (index, selectedPolygons) {
    var self = this;
    polygon = selectedPolygons[index];
    if (polygon.data.length == 0){
      self.isBusy = true;
      Ext.getBody().setStyle('cursor','progress');
      App.service.Helper.getComponentExt('polygon-btn-calculate').setStyle('cursor','progress');
      var geometry = self.prepareRequestGeometry(polygon.geometry);
      Ext.data.JsonP.request({
        url : __Global.api.Polygon + 'geometry=' + geometry,
        callbackName: 'PolygonResponse',
        params: {format_options: 'callback:Ext.data.JsonP.PolygonResponse'},
        success: function (results) {
          polygon.data = results;
          if (selectedPolygons.length == 1){
            alert(polygon.info.name + ': ' + i18n.polygon.success);  
            self.showChartWindow();
          }
        },
        callback: function(results){
          self.isBusy = false;
          index++;
          if (index < selectedPolygons.length){
            if (self.progressBar){
              self.progressBar.updateProgress(index/selectedPolygons.length, Math.round(100 * index/selectedPolygons.length) + ' %');
            }
            self.doRequest(index, selectedPolygons);
          }
          else{
            Ext.getBody().setStyle('cursor','auto');
            App.service.Helper.getComponentExt('polygon-btn-calculate').setStyle('cursor','pointer');
            self.rerenderFeatures();
            self.saveAll();
            if (self.progressBar){
              self.progressBar.close();
            }
          }
        },
        failure: function(results){
          if (selectedPolygons.length == 1){
            alert(polygon.info.name + ': ' + i18n.polygon.failure);      
          }
        }
      });
    }
    else{
      index++;
      if (index < selectedPolygons.length){
        if (self.progressBar){
          self.progressBar.updateProgress(index/selectedPolygons.length, Math.round(100 * index/selectedPolygons.length) + ' %');
        }
        self.doRequest(index, selectedPolygons);
      }      
    }
  },

  showChartWindow: function (){
    var self = this;
    if (self.getSelectedPolygons().length == 1){
      var polygon = self.getSelectedPolygons()[0];
      var indicator = App.service.Watcher.getIndicator();
      var crop = App.service.Watcher.get('Crop');
      if (polygon.data.length > 0) {
        if (!!indicator.chart && indicator.chart != 'Multiannual'){
          var title = polygon.info.name + ' - ' + App.service.Map.getLegendTitle(true);
          self.windowChart.setTitle(title);
          self.windowChart.removeAll();
          App.service.Chart.dataResponse(polygon.data);

          if (typeof indicator.chart != 'object'){
            self.windowChart.add(App.util.ChartTypes[indicator.chart](polygon.data));
          }
          else{
            var idx = indicator.crops.indexOf(crop);
            self.windowChart.add(App.util.ChartTypes[indicator.chart[idx]](polygon.data));
          }
          App.service.Chart.userPolygon = true;
          return self.windowChart.show();
        }
        self.windowChart.close();
        //alert('No chart available for selected indicator.');
      }
      else{
        self.windowChart.close();
        alert(i18n.polygon.pressCalculate);
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
      App.service.Polygon.rerenderFeatures();
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