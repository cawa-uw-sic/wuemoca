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

  windowEdit: Ext.create('App.util.Window', { title: i18n.exportUI.title, items: [{ xtype: 'app-polygon-form' }] }),

  windowUpload: Ext.create('App.util.Window', { title: 'Upload a shapefile', items: [{ xtype: 'app-polygon-formupload' }] }),

  windowChart: Ext.create('App.util.Window'),

  initialize: function () {

    var self = this;

    self.source = new ol.source.Vector();
    self.layer = new ol.layer.Vector({
      source: self.source,
      style: self.getDefaultColor
    });

    self.layer.setMap(App.service.Map.instance);

    //self.layer.setVisible(__LocalDB.get('Selections.UserPolygon', false));

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
    }
    else{
      App.service.Chart.window.close();
      //App.service.Highlight.clear();
      App.service.Status.set(' ');
      App.service.Helper.getComponentExt('app-switcher').expand();
    }
    App.service.Helper.getComponentExt('legend-cx-irrigation').setValue(val);
    App.service.Helper.getComponentExt('legend-cx-current').setValue(!val);
    App.service.Helper.getComponentExt('polygon-btn-activate').setDisabled(!val);
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
    return new ol.style.Style({
      fill: new ol.style.Fill({
        //color: '#41b6c4'
        color: 'rgba(65, 182, 196, 0.7)'
      }),
      stroke: new ol.style.Stroke({
        color: '#2b8cbe'
      }),
      text: new ol.style.Text({
        text: feature.getProperties().name
      })
    });
  },

  getSelectColor: function (feature) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.7)'
        //color: '#fff'
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
    var polygon = this.all[this.getSelectedIndex()];
    App.service.Helper.setComponentsValue([
       { id: 'exportui-name',       value: polygon.info.name     || '' }
      ,{ id: 'exportui-location',   value: polygon.info.location || '' }
      ,{ id: 'exportui-area',   value: polygon.totalArea + ' ha' || '' }
    ]);
  },

  whenUnselect: function (e) {
    App.service.Helper.disableComponents(['polygon-btn-edit', 'polygon-btn-calculate', 'polygon-btn-remove']);
    this.windowChart.close();
    this.windowEdit.close();
    //if (!this.windowEdit.isHidden()) this.windowEdit.close();
  },

  whenSelect: function (e) {
    App.service.Chart.window.close();
    this.selected = e.selected[0];
    if (!this.windowEdit.isHidden()) this.updateWindowEdit();
    var name = this.all[this.getSelectedIndex()].info.name;
    if (name == ''){
      this.windowChart.close();
      App.service.Helper.enableComponents(['polygon-btn-edit', 'polygon-btn-remove']);
      this.updateWindowEdit();
      this.windowEdit.show();
    }
    else{
      App.service.Helper.enableComponents(['polygon-btn-edit', 'polygon-btn-calculate', 'polygon-btn-remove']);
      App.service.Status.set('Selected polygon: ' + name);
      this.showChartWindow();
    }


  },

  registerPolygon: function (geometry) {
    var polygon = {
      uid: 'polygon-' + new Date().getTime(),
      info: { name: '', location: '' },
      totalArea: Array.isArray(geometry) ? '' : this.calculateTotalArea(geometry),
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

  removeSelectedPolygon: function () {
    this.all.splice(this.getSelectedIndex(), 1);
    this.saveAll();
    this.source.removeFeature(this.selected);
    this.selectControl.getFeatures().clear();
    this.whenUnselect();
    this.selected = false;
    this.windowEdit.close();
    this.windowChart.close();
  },

  save: function (info) {

    this.all[this.getSelectedIndex()].info = info;
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

  getSelectedIndex: function () {
    return this.all.map(function (d) {
      return d.uid;
    }).indexOf(this.selected.get('uid'));
  },

  calculate: function () {
    var polygon = this.all[this.getSelectedIndex()];
    if (polygon.data.length == 0){
      var transformedGeometry = this.prepareRequestGeometry(polygon.geometry);
      this.doRequest(transformedGeometry);
    }
    else{
      alert('Indicators already calculated!');
    }
  },

  doRequest: function (geometry) {
    var self = this;
    self.isBusy = true;
    Ext.getBody().setStyle('cursor','progress');
    App.service.Helper.getComponentExt('polygon-btn-calculate').setStyle('cursor','progress');

    Ext.data.JsonP.request({
      url : __Global.api.Polygon + 'geometry=' + geometry,
      callbackName: 'PolygonResponse',
      params: {format_options: 'callback:Ext.data.JsonP.PolygonResponse'},
      success: function (results) {
        self.isBusy = false;
        Ext.getBody().setStyle('cursor','auto');
        App.service.Helper.getComponentExt('polygon-btn-calculate').setStyle('cursor','auto');
        var polygon = self.all[self.getSelectedIndex()];
        polygon.data = results;
        self.saveAll();
        alert('Indicators of ' +  polygon.info.name + ' calculated successfully');
        self.showChartWindow();
      }
    });
  },

  showChartWindow: function (){
    var self = this;
    var polygon = self.all[self.getSelectedIndex()];
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
      alert('No chart available for selected indicator.');
    }
    else{
      self.windowChart.close();
      alert('First press ' + i18n.polygon.calculate + '!');
    }
  },

  calculateTotalArea: function (polygon){
    var wgs84Sphere = new ol.Sphere(6378137);
    var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
    __Global.projection.Mercator, __Global.projection.Geographic));
    var coordinates = geom.getLinearRing(0).getCoordinates();
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