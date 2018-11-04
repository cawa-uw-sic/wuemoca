Ext.define('App.service.Polygon', {

  requires: [
    'App.util.Window'
  ],

  singleton: true,

  all: __LocalDB.get('Polygons', []),

  source: false,
  layer: false,

  drawControl: false,

  selectControl: false,
  //draw mode
  activated: false,

  selected: false,
  isBusy: false,

  progressBar: false,
  msgbox: false,
  importGeometry: false,
  importExtent: false,
  importWktGeometry: false,
  importData: false,
  importName: false,

  windowEdit: Ext.create('App.util.Window', {
    title: i18n.exportUI.title,
    cls: 'polygon-window',
    items: [{ xtype: 'app-polygon-form' }]
  }),

  windowChart: Ext.create('App.util.Window',{
    itemId: 'polygon-chart-window',
    cls: 'polygon-window',
    tools: [{
      type: 'prev',
      tooltip: i18n.chart.prevIndicator,
      callback: function() {
        App.service.Chart.changeIndicatorChart('prev');
        App.service.Polygon.showChartWindow();
      }
    }, {
      type: 'next',
      tooltip: i18n.chart.nextIndicator,
      callback: function() {
        App.service.Chart.changeIndicatorChart('next');
        App.service.Polygon.showChartWindow();
      }
    }]
  }),

  initialize: function () {

    var self = this;

    self.source = new ol.source.Vector();
    self.layer = new ol.layer.Vector({
      source: self.source,
      style: self.getDefaultColor
    });

    self.layer.setMap(App.service.Map.instance);

    self.drawControl = new ol.interaction.Draw({ type: ('MultiPolygon') });

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
      var geometry = e.feature.getGeometry();
      var geometry_wgs84 = geometry.clone().transform(
        __Global.projection.Mercator,
        __Global.projection.Geographic
      );
      //Geometry format for reading and writing data in the WellKnownText (WKT) format.
      var wkt_geometry = new ol.format.WKT().writeGeometry(geometry_wgs84);
      var polygon = self.registerPolygon(geometry.getExtent(), wkt_geometry, '');
      self.saveAll();
      self.rerenderFeatures();
      Ext.getStore('polygongrid').loadData(self.getGridData());
      self.calculate();
      //prevent from zoom in with dblclick - see https://github.com/openlayers/openlayers/issues/3610
      setTimeout(function(){self.deactivate();},251);
      App.service.Helper.hideComponents(['polygon-btn-deactivate']);
      App.service.Helper.showComponents(['polygon-btn-activate']);
    });
    self.windowChart.on("boxready", function (window) {
      window.setWidth(((__Global.year.Max - __Global.year.Min) + 1) * __Global.chart.BarWidth);
      window.setHeight(__Global.chart.Height);
      window.alignTo(App.service.Helper.getComponentExt('map-container'), 'bl-bl', [0, -25]);
    });
    self.windowChart.on("close", function () {
      if (self.msgbox){
        self.msgbox.close();
        self.msgbox = false;
      }
    });
  },

  switchView: function(val){
    App.service.Watcher.set('UserPolygon', val ? 'show' : 'noshow');
    App.service.Helper.getComponentExt('legend-userpolygon').setVisible(val);
    this.layer.setVisible(val);
    this.selectControl.setActive(val);
    App.service.Helper.getComponentExt('exporter-window').hide();
    var legendwindow = App.service.Helper.getComponentExt('legend-window');
    if (val == false){
      this.deselectMapAndList();
      this.drawControl.setActive(false);
      this.activated = false;
      this.windowChart.close();
      this.windowEdit.close();
      if (!legendwindow.isHidden()){
        legendwindow.alignTo(App.service.Helper.getComponentExt('legend-button'), 'tr-tr', [0, 0]);
        legendwindow.removeCls('polygon-window');
      }
      App.service.Helper.getComponentExt('app-zoom').setTitle(i18n.adminFilters.title);
      App.service.Helper.getComponentExt('map-container').removeCls('polygon-panel');
      App.service.Helper.getComponentExt('map-controls').removeCls('polygon-panel');
    }
    else{
      this.cleanLocalDB();
      this.rerenderFeatures();
      App.service.Status.set('&#160;');
      App.service.Helper.getComponentExt('app-switcher').expand();
      App.service.Helper.getComponentExt('app-zoom').collapse();
      App.service.Helper.getComponentExt('app-zoom').setTitle(i18n.adminFilters.title_userPolygon);
      App.service.Map.filterAreaOfInterest('','0');
      App.service.Helper.getComponentExt('legend-cx-irrigation').setValue(true);
      legendwindow.hide();
      App.service.Helper.getComponentExt('exporter-btn-download').setDisabled(true);
      App.service.Map.removeCurrentLayer();
      App.service.Helper.getComponentExt('map-container').addCls('polygon-panel');
      App.service.Helper.getComponentExt('map-controls').addCls('polygon-panel');
    }
    App.service.Helper.getComponentExt('legend-cx-current').setValue(!val);
    App.service.Helper.getComponentExt('polygon-btn-activate').setDisabled(!val);
    App.service.Exporter.setDownloadCombotext();
    App.service.Map.setMainTitle();
    App.service.Map.setIndicatorFilter(val);
    var store_indicator_export = Ext.getStore('indicatorexport');
    store_indicator_export.removeAll();
    App.service.Helper.getComponentExt('exporter-tag-indicator').clearValue();
    var indicators = App.service.Exporter.getIndicators(val);
    store_indicator_export.setData(indicators);
  },

  deselectMapAndList: function(){
    this.selectControl.getFeatures().clear();
    App.service.Helper.getComponentExt('polygon-grid').getSelectionModel().deselectAll();
    this.windowChart.close();
    this.windowEdit.close();
    this.selected = false;
    App.service.Polygon.toggleDisabledButtons(true);
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
    var area_ha = '';
    if (!!polygon.data[0]){
      if (!polygon.data[0].area_ha){
        if (!!polygon.totalArea && !isNaN(polygon.totalArea)){
          area_ha = parseFloat(polygon.totalArea).toFixed() + ' ha';
        }
      }
      else{
        area_ha = parseFloat(polygon.data[0].area_ha).toFixed() + ' ha'
      }
    }
    App.service.Helper.setComponentsValue([
       { id: 'exportui-name',       value: polygon.info.name          || '' }
      ,{ id: 'exportui-location',   value: polygon.info.location      || '' }
      ,{ id: 'exportui-area',       value: area_ha }
    ]);
  },

  whenSelect: function () {
    self = this;
    App.service.Chart.window.close();
    if (!this.selected || this.selectControl.getFeatures().getLength() == 1){
      this.selected = [];
    }

    this.selected.push(this.selectControl.getFeatures().item(0));

    var polygons = this.getSelectedPolygons();
    var nameEmpty = false;
    for (i = 0; i < polygons.length; ++i){
      if (polygons[i].info.name == ''){
        nameEmpty = true;
        break;
      }
    }
    //no name, cannot be the case
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
        //no data
        if (polygons[0].data.length == 0){
          Ext.Msg.show({
            cls: 'polygon-window',
            title: i18n.polygon.progressTitle,
            message: i18n.polygon.calculation_message,
            icon: Ext.Msg.QUESTION,
            buttons: Ext.Msg.YESNO,
            buttonText: {
              yes: i18n.yesno.yes,
              no: i18n.yesno.no
            },
            fn: function(btn) {
              if (btn === 'yes') {
                self.calculate();
              }
            }
          });
        }
        //calculated data
        else{
          if (!polygons[0].data[0].empty){
            this.showChartWindow(polygons[0]);
          }
        }
        App.service.Polygon.toggleDisabledButtons(false);
      }
      //multiple polygons
      else{
        this.windowChart.close();
        this.windowEdit.close();
      }
    }
    if (!App.service.Helper.getComponentExt('exporter-window').isHidden()){
      App.service.Exporter.setDownloadCombotext();
    }
  },

  registerPolygon: function (extent, wkt_geometry) {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the 11 characters after the decimal.
    var uniqueId = 'p-' + Math.random().toString(36).substr(2);
    //var uniqueId = 'p-' + Date.now().toString().split('').reverse().join('');
    var polygon = {
      uid: uniqueId,
      info: { name: uniqueId, location: '' },
      data: [],
      wkt_geometry: wkt_geometry,
      extent: extent
    }
    this.all.push(polygon);
    this.saveAll();
    return polygon;
  },

  createFeature: function (polygon) {
    var feature = new ol.format.WKT().readFeature(polygon.wkt_geometry, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
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
      this.deselectMapAndList();
      this.saveAll();
      this.rerenderFeatures();
      this.windowEdit.close();
      this.windowChart.close();
      Ext.getStore('polygongrid').loadData(this.getGridData());
    }
  },
  removeAllPolygons: function () {
      this.all = [];
      this.deselectMapAndList();
      this.saveAll();
      this.rerenderFeatures();
      this.windowEdit.close();
      this.windowChart.close();
      Ext.getStore('polygongrid').loadData(this.getGridData());
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
        if (extent.length > 0){
          griddata.push({uid: polygon.uid, name: polygon.info.name, extent: extent});
        }
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
    //var source = self.layer.getSource();

    self.source.clear();
    var removeIndices = [];
    self.all.map(function (polygon, index) {
      if (!!polygon.wkt_geometry){
        self.source.addFeature(self.createFeature(polygon));
      }
      else{
        removeIndices.push(index);
      }
    });
    //remove polygons without geometry
    for (i = 0; i < removeIndices.length; ++i){
      self.all.splice(removeIndices[i], 1);
      if (removeIndices[i+1]){
        removeIndices[i+1] -= i+1;
      }
    }
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
    var emptyPolygons = [];
    for (i = 0; i < polygons.length; ++i){
      if (polygons[i].data.length == 0){
        emptyPolygons.push(polygons[i]);
      }
    }
    var count = emptyPolygons.length;
    var msg = i18n.polygon.progressMsg1 + ' ' + (count).toString() + ' ';
    msg += count > 1 ? i18n.polygon.progressMsg2multi : i18n.polygon.progressMsg2single;
    if (count > 0){
      var index = 0;
      self.progressBar = Ext.Msg.show({
        cls: 'polygon-window',
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
      var count_success = 0;
      var removearray = [];
      self.doRequest(index, emptyPolygons, count_success, removearray);
    }
    else{
      Ext.Msg.alert('', i18n.polygon.alreadyCalculated);
     }
  },
  /**
  * @method doRequest
  * send Ext.Ajax.request to server JSP with parameter geometry (comma separated list of coordinates)
  * to aggregate DB raster tables to the polygon and calculate all indicators.
  * This function is calling itself (recursive) until the list of not calculated polygons is finished
  * @param index
  * index in the list of not calculated polygons
  * @param emptyPolygons
  * list of not calculated polygons
  * @param count_success
  * number of successfully calculated polygons in the list
  * @param removearray
  * array with polygons to be removed
  */
  doRequest: function (index, emptyPolygons, count_success, removearray) {
    var self = this;
    polygon = emptyPolygons[index];
    self.isBusy = true;
    Ext.getBody().setStyle('cursor','progress');

    Ext.Ajax.request({
      url: __Global.api.Polygon,
      //default is 30000, increased to calculate large polygons
      timeout: 1000000,
      //HTTP method: "GET" if no parameters are being sent, and "POST" if parameters are being sent.
      method: 'POST',
      params: {
        wkt_geometry: polygon.wkt_geometry,
        maxyear: __Global.year.Max
      },
      success: function(response) {
        polygon.data = Ext.decode(response.responseText);
        if (polygon.data[0].WKT == 'wkt_alt'){
          var wkt_alt = polygon.wkt_geometry.split('),(').join(')),((');
          polygon.wkt_geometry = wkt_alt;

        }
        if (response.responseText.indexOf('empty') == -1){
          count_success++;
          for (d = 0; d < polygon.data.length; ++d) {
            delete polygon.data[d].WKT;
          }

        }
        else{
          if (response.responseText.indexOf('failed') == -1){
            removearray.push(polygon);
          }
        }
      },
      callback: function(){
        self.isBusy = false;
        index++;

        if (index < emptyPolygons.length){
          if (self.progressBar){
            //self.progressBar.msgButtons.ok.enable();
            self.progressBar.updateProgress(
              index/emptyPolygons.length,
              Math.round(100 * index/emptyPolygons.length) + ' %'
            );
          }
          //recursive function
          self.doRequest(index, emptyPolygons, count_success, removearray);
        }
        else{
          //loop finished
          var message = undefined;
          if (emptyPolygons.length == 1){
            if (count_success == 1){
              message = polygon.info.name + ': ' + i18n.polygon.success;
              self.zoomToPolygon(polygon.extent);
              //not valid because irrigated area smaller than 30 ha
              if (polygon.data[0].valid == 'novalid'){
                message += '<br>' + i18n.polygon.smallerThan30ha_single;
              }
            }
          }
          else if (index == emptyPolygons.length) {
            if (count_success == emptyPolygons.length){
              message = i18n.polygon.success;
            }
            else{
              message = i18n.polygon.partlyCalculated;
            }
            //not valid because irrigated area smaller than 30 ha
            if (polygon && polygon.data[0].valid == 'novalid'){
              message += '<br>' + i18n.polygon.smallerThan30ha_multi;
            }
          }

          if (removearray.length > 0){
            if (message != undefined){
              message += '<br>';
            }
            else{
              message = '';
            }
            message += i18n.polygon.outside + ' ';
            for (var i = 0; i < removearray.length; i++){
              message += removearray[i].info.name;
              if (i < removearray.length-1){
                message += ', ';
              }
              self.removeSelectedPolygons(removearray[i]);
            }

            message += (removearray.length == 1) ? ' ' + i18n.polygon.removed_single : ' ' + i18n.polygon.removed_multi;
                      //message = polygon.info.name + ' ' + i18n.polygon.outside;
          }
          if (self.progressBar){
            self.progressBar.msgButtons.ok.enable();
            self.progressBar.updateProgress(
              index/emptyPolygons.length,
              Math.round(100 * index/emptyPolygons.length) + ' %',
              message
            );
          }
          Ext.getBody().setStyle('cursor','auto');


          self.saveAll();
          self.rerenderFeatures();
        }
      },
      failure: function(response){
        if (emptyPolygons.length == 1){
          var timeout_message = '';
          if (response.timedout){
            timeout_message = i18n.polygon.largearea;
          }
          Ext.Msg.alert('', polygon.info.name + ': ' + i18n.polygon.failure + timeout_message + '!');
        }
      }
    });
  },

  showChartWindow: function (polygon){
    var self = this;
    self.windowChart.close();
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
      var indicator = App.service.Watcher.getIndicator();
      //var crop = App.service.Watcher.get('Crop');
      var crop = App.service.Watcher.getCrop();

      if (polygon.data.length > 0) {
        self.windowChart.removeAll();
        if (!!indicator.id){
          if (!!indicator.chart && indicator.chart != 'Multiannual'){
            App.service.Chart.data = App.service.Chart.dataResponse(polygon.data);

            if (indicator.chart != 'crops'){
              self.windowChart.add(App.util.ChartTypes[indicator.chart](polygon.data));
            }
            else if (indicator.crops == 'sum' || indicator.crops == 'avg' || indicator.crops == 'all'){
              self.windowChart.add(App.util.ChartTypes[crop.chart](polygon.data));
            }
            var bigdata = 'no';
            if (App.service.Chart.maxData > 1000){
              bigdata = 'thousand';
              if (App.service.Chart.maxData > 1000000){
                bigdata = 'million';
              }
            }
            var title = polygon.info.name + ': ' + App.service.Map.getLegendTitle(true, bigdata);
            self.windowChart.setTitle(title);
            App.service.Chart.userPolygon = true;
          }
          else{
            self.windowChart.setTitle(i18n.chart.noChart + ' ' + indicator[__Global.lang + 'Name']);
          }
        }
        else{
          self.windowChart.setTitle(i18n.indicator.leftPanel);
        }

        self.windowChart.show();
        if (App.service.Chart.maxData == 0 && !!title){
          setTimeout(function(){
            self.msgbox = Ext.Msg.show({
              cls: 'polygon-window',
              title: i18n.chart.title_nodata,
              message: i18n.chart.nodata + '<br>' + App.service.Map.getLegendTitle(false),
              //buttons: Ext.Msg.OK,
              closeAction: 'destroy',
              closable: true,
              modal: false
            });

            self.msgbox.alignTo(App.service.Helper.getComponentExt('polygon-chart-window'),'c-c');
            }, 251
          );
        }
      }
      //no calculated data
      else{
        self.windowChart.close();
      }
    }
  },

  calculateTotalArea: function (multipolygon){
  //calculateTotalArea: function (coordinates){
    var wgs84Sphere = new ol.Sphere(6378137);
    var polygons = multipolygon.getPolygons();
    for (var i = 0; i < polygons.length; i++){
      var coordinates = polygons[0].getLinearRing(0).getCoordinates();
    }
    var area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
    return (area/10000).toFixed();
  },

  calculateExtent: function (polygon, array){
    var extent = [];
    return extent;
  },

  uploadShapefile: function (event) {
    App.service.Polygon.deselectMapAndList();
    loadshp({
      url: event.target.files[0],
      encoding: 'UTF-8',
      EPSG: 4326
    }, function(data) {
      var count = 0;
      //data.features are all polygons of the shapefile
      data.features.map(function (polygon) {
          count++;
          var extent = ol.proj.transformExtent(
            polygon.geometry.extent,
            __Global.projection.Geographic,
            __Global.projection.Mercator
          );
          //workaround for bug of uploaded shapefiles with multipart geometry (considered as donut)
          //Geometry format for reading and writing data in the WellKnownText (WKT) format.
          var wkt_geometry = new ol.format.WKT().writeGeometry(new ol.geom.MultiPolygon([polygon.geometry.coordinates]))

          App.service.Polygon.registerPolygon(extent, wkt_geometry);
      })
      if (count > 0){
        App.service.Polygon.saveAll();
        App.service.Polygon.rerenderFeatures();
        Ext.getStore('polygongrid').loadData(App.service.Polygon.getGridData());
        App.service.Polygon.calculate();
      }
    });
  },

  /**
  * @method writePolygon
  * send Ext.Ajax.request to server JSP with parameters geometry and all indicator values
  * to insert the values in a temporary server PostGIS table.
  * The Geoserver map layer mypolygon points to this table and provides WFS download options in three different formats
  */
  writePolygon: function(allPolygons, index){
    var self = this;
    if (self.isBusy) return false;
    var userPolygon = true;
    var export_indicators = App.service.Exporter.indicator;
    var fieldlist = App.service.Exporter.getExportFields(userPolygon, export_indicators);
    var parameters = {};
    var polygon = null;

    if (!allPolygons){
      var selectedPolygons = self.getSelectedPolygons();
      if (selectedPolygons.length > 0){
        polygon = selectedPolygons[0];
        //first=true means that the temporary server PostGIS table will be emptied
        parameters['first'] = 'true';
      }
    }
    else if (allPolygons && self.all.length > 0){
      polygon = self.all[index];
      //first=true means that the temporary server PostGIS table will be emptied, first=false data will be appended
      if (index == 0){
        parameters['first'] = 'true';
      }
      else{
        parameters['first'] = 'false';
      }
    }
    if (!!polygon){
      parameters['datasets'] = polygon.data.length;
      for (d = 0; d < polygon.data.length; ++d) {
        parameters['uid_' + d] = polygon.uid;
        parameters['name_' + d] = polygon.info.name.replace(/'/g,"");
        parameters['location_' + d] = !!polygon.info.location ? polygon.info.location.replace(/'/g,"") : '';
        //parameters['area_ha_' + d] = polygon.totalArea;
        for (f = 0; f < fieldlist.length; ++f) {
          var value = polygon.data[d][fieldlist[f]];
          if (!!value && value != Infinity && value != 'NaN'){
            parameters[fieldlist[f] + '_' + d] = value;
          }
        }
      }
      parameters['wkt_geometry'] = polygon.wkt_geometry;
      self.isBusy = true;
      App.service.Polygon.toggleDisabledButtons(true);

      //write polygon to temporary server PostGIS table
      Ext.Ajax.request({
        url: __Global.api.writePolygon,
        //default is 30000, increased to pass large polygons
        timeout: 1000000,
        method: 'POST',
        params: parameters,
        success: function (response) {
          self.isBusy = false;
          index++;

          if (allPolygons && index < self.all.length){
            //recursive function
            self.writePolygon(allPolygons, index);
          }
          else{
            App.service.Exporter.downloadWFS(true);
            App.service.Polygon.toggleDisabledButtons(false);
          }
        },
        callback: function () {

        },
        failure: function(response){
          var timeout_message = '';
          if (response.timedout){
            timeout_message = i18n.polygon.largearea;
          }
          Ext.Msg.alert('', polygon.info.name + ': ' + 'download failed ' + timeout_message + '!');
        }
      });
    }
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
  },

  toggleDisabledButtons: function (disabled) {
    App.service.Helper.getComponentExt('polygon-btn-download').setDisabled(this.all.length == 0);
    App.service.Helper.getComponentExt('polygon-btn-wue').setDisabled(disabled);
    App.service.Helper.getComponentExt('polygon-btn-prod').setDisabled(disabled);
    App.service.Helper.getComponentExt('polygon-btn-loss').setDisabled(disabled);
  },

  importSelectedGeometry: function (coordinates, extent, wkt_geometry){
    this.importGeometry = coordinates;
    this.importExtent = extent;
    this.importWktGeometry = wkt_geometry;
  },

  importSelectedData: function(data, name){
    if (data){
      //vir must be set to null otherwise there is confusion with not exsting wf
      //index indicators can be -1 in the WUEMoCA DB, if so they are set to null in the user database
      //c can be calculated backwards
      for (var d = 0; d < data.length; d++){
        //delete data[d]['vir'];
        // if (!!data[d]['vir'] && data[d]['vir'] > 0){
        //   //rule of three: vir = ((etf * firn) / (wf * 100000)).toFixed(2);
        //   etf = data[d]['etf'];
        //   firn = data[d]['firn'];
        //   vir = data[d]['vir'];
        //   data[d]['wf'] = ((etf * firn)/(vir * 100000)).toFixed(2);
        // }
        // else{
          data[d]['wf'] = null;
          data[d]['vir'] = null;
        //}
        if (data[d]['eprod_avg'] < 0){
          data[d]['eprod_avg'] = null;
        }
        if (data[d]['vc_non'] < 0){
          data[d]['vc_non'] = null;
        }
        var crops = ['cotton', 'wheat', 'rice'];
        crops.map(function (crop) {
          if (!!data[d]['eprod_' + crop] && data[d]['eprod_' + crop] > 0 && data[d]['pirf_' + crop] > 0){
            //rule of three: eprod = (pirf * c) / (etf * firf * 10)
            var etf = data[d]['etf_' + crop];
            var firf = data[d]['firf_' + crop];
            var eprod = data[d]['eprod_' + crop];
            var pirf = data[d]['pirf_' + crop];
            data[d]['c_' + crop] = (eprod * etf * firf * 10) / pirf;
          }
          else{
            data[d]['eprod_' + crop] = null;
          }
          if (data[d]['vc_' + crop] < 0){
            data[d]['vc_' + crop] = null;
          }
        });
      }

      var userPolygon = true;
      var export_indicators = '';
      var fieldlist = App.service.Exporter.getExportFields(userPolygon, export_indicators);
      for (var d = 0; d < data.length; d++){
        for(var key in data[d]) {
          //_ha is to be kept, because e.g. fallow_ha is used for recalculation of fp, in case firn is modified by users (productivity calculation tool)
          if (key.indexOf('_ha') == -1 ){
            if (fieldlist.indexOf(key) == -1){
              delete data[d][key];
            }
          }
        }
      }
    }
    this.importData = data;
    this.importName = name;
  },

  importPolygon: function (){
    self = this;
    var existingUid = '';
    var existingName = '';
    var polygonExist = false;
    for (a = 0; a < this.all.length; ++a) {
      if (this.all[a].info.name == this.importName){
        polygonExist = true;
        existingUid = this.all[a].uid;
        existingName = this.all[a].info.name;
        break;
      }
    }
    if (!polygonExist){
      this.newImportPolygon(this.importName);
        //clean memory
      this.importGeometry = false;
      this.importExtent = false;
      this.importWktGeometry = false;
      this.importData = false;
      this.importName = false;
    }
    else{
        var messagebox = Ext.Msg.show({
          cls: 'polygon-window',
          title: 'Name does already exist',
          message: existingName + ' is already in the Polygon list.<br>Transfer it anyway?',
          icon: Ext.Msg.QUESTION,
          buttons: Ext.Msg.YESNO,
          buttonText: {
            yes: i18n.yesno.yes,
            no: i18n.yesno.no
          },
          fn: function(btn) {
            if (btn === 'yes') {
              self.newImportPolygon(existingName + ' (copy)');
            }
            else{
              self.selectRowInGrid(existingUid);
            }
              //clean memory - does not work!!
            self.importGeometry = false;
            self.importExtent = false;
            self.importWktGeometry = false;
            self.importData = false;
            self.importName = false;
          }
        });
    }


  },

  newImportPolygon: function(name){
    var newpolygon = this.registerPolygon(this.importExtent, this.importWktGeometry);
    newpolygon.data = this.importData;
    newpolygon.info.name = name;
    this.saveAll();
    this.rerenderFeatures();
    Ext.getStore('polygongrid').loadData(this.getGridData());
    this.selectRowInGrid(newpolygon.uid);
  },

  cleanLocalDB: function(){
    self = this;
      var polygons = self.all;

      var change = false;

      self.all.map(function (polygon) {
        if (self.replaceAbbr(polygon, 'fir_n', 'firn')) change = true;
        if (self.replaceAbbr(polygon, 'v_water', 'vc_non')) change = true;
        if (self.replaceAbbr(polygon, 'v_sum', 'vc_non')) change = true;
        if (self.replaceAbbr(polygon, 'y_wheat', 'yf_wheat')) change = true;
        if (self.replaceAbbr(polygon, 'y_cotton', 'yf_cotton')) change = true;
        if (self.replaceAbbr(polygon, 'y_rice', 'yf_rice')) change = true;
        //if (self.replaceAbbr(polygon, 'cr', 'lur')) change = true;
        if (self.replaceAbbr(polygon, 'v_wheat', 'vc_wheat')) change = true;
        if (self.replaceAbbr(polygon, 'v_cotton', 'vc_cotton')) change = true;
        if (self.replaceAbbr(polygon, 'v_rice', 'vc_rice')) change = true;
        if (self.replaceAbbr(polygon, 'vet', 'vc_non')) change = true;
        if (self.replaceAbbr(polygon, 'etf', 'etf_non')) change = true;
        if (self.replaceAbbr(polygon, 'prod_$_sum', 'prod_gp_sum')) change = true;
        if (self.replaceAbbr(polygon, 'prod_$ha_avg', 'prod_pf_avg')) change = true;
        if (self.replaceAbbr(polygon, 'prod_$m3_avg', 'prod_pw_avg')) change = true;
        if (self.replaceAbbr(polygon, 'coefficient', 'kpd')) change = true;
        if (self.replaceAbbr(polygon, 'groundwater', 'gwc')) change = true;
        if (self.replaceAbbr(polygon, 'rains', 'rain')) change = true;
        if (self.replaceAbbr(polygon, 'prod_wf_sum', 'prod_wf')) change = true;
        if (self.replaceAbbr(polygon, 'prod_gwc', 'gwc_rel')) change = true;
        if (self.replaceAbbr(polygon, 'prod_rain', 'rain_rel')) change = true;
        if (self.replaceAbbr(polygon, 'prod_doll_sum', 'prod_gp_sum')) change = true;
        if (self.replaceAbbr(polygon, 'prod_dollha_avg', 'prod_pf_avg')) change = true;
        if (self.replaceAbbr(polygon, 'prod_dollm3_avg', 'prod_pw_avg')) change = true;
        if (self.replaceAbbr(polygon, 'wf_rate_sum', 'wf_calc_sum')) change = true;
        if (self.replaceAbbr(polygon, 'wf_m3ha', 'wf_rel')) change = true;
        if (self.replaceAbbr(polygon, 'gwc_m3ha', 'gwc_rel')) change = true;
        if (self.replaceAbbr(polygon, 'rain_m3ha', 'rain_rel')) change = true;
        __Crop.map(function (crop) {
          if (crop.idx == 0) return false;
          if (self.replaceAbbr(polygon, 'wf_' + crop.id, 'wf_calc_' + crop.id)) change = true;
          if (self.replaceAbbr(polygon, 'wf_rate_' + crop.id, 'wf_calc_' + crop.id)) change = true;
          if (self.replaceAbbr(polygon, 'prod_doll_' + crop.id, 'prod_gp_' + crop.id)) change = true;
          if (self.replaceAbbr(polygon, 'prod_dollha_' + crop.id, 'prod_pf_' + crop.id)) change = true;
          if (self.replaceAbbr(polygon, 'prod_dollm3_' + crop.id, 'prod_pw_' + crop.id)) change = true;
          if (self.replaceAbbr(polygon, 'prod_kgm3_' + crop.id, 'prod_yw_' + crop.id)) change = true;
        });


        //update wkt_geometry
        if (!polygon.wkt_geometry && !!polygon.geometry && polygon.geometry.length != 0){
          change = true;
          var old_geometry = polygon.geometry;
          if (!old_geometry[0][0][0]){
            old_geometry = [[old_geometry]];
          }
          var multipolygon = new ol.geom.MultiPolygon(old_geometry);

          var wkt_geometry = new ol.format.WKT().writeGeometry(multipolygon.transform(__Global.projection.Mercator,__Global.projection.Geographic));
          polygon.wkt_geometry = wkt_geometry;
          delete polygon.geometry;

        }
        if (!!polygon.wkt_alt){
          delete polygon.wkt_alt;
        }

      });

      if (change){
        this.saveAll();
      }
  },

  replaceAbbr: function(polygon, oldkey, newkey){
    var change = false;
    for (var d = 0; d < polygon.data.length; d++){
      var keys = Object.keys(polygon.data[d]);
      for (var j=0; j < keys.length; j++) {
        if (keys[j] == oldkey){
          change = true;
          polygon.data[d][newkey] = polygon.data[d][oldkey];
          delete polygon.data[d][oldkey];
        }
      }
    }
    return change;
  }

});
