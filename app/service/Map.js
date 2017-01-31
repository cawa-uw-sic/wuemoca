Ext.define('App.service.Map', {

  singleton: true,

  instance: false,

  initialize: function () {
    if (!this.instance) {
      this.instance = new ol.Map({
        view: App.util.Layer.olView,
        layers: App.util.Layer.background,
        controls: ol.control.defaults({
          attributionOptions: ({
            collapsible: false
          })
        })       
      });
    }
    __LocalDB.updateLocalDB();
    return this.instance;
  },

  setMapExtent: function (extent, transformation) {
    if (typeof extent == 'string') extent = extent.split(',');

    extent = extent.map(function (r) { return parseFloat(r); });
    
    if (transformation){
      extent = ol.proj.transformExtent(extent, __Global.projection.Geographic, __Global.projection.Mercator);
    }

    this.instance.getView().fit(
      extent,
      this.instance.getSize(),
      {maxZoom: 12}
    );
  },

  loadLayer: function () {
    var self = this;
    var map = self.instance;
    console.log('loadLayer - indicator: ' + App.service.Watcher.get('Indicator'));
    if (App.service.Watcher.get('Indicator') && App.service.Watcher.get('Aggregation')) {
      App.service.Helper.getComponentExt('switcher-btn-reset').setDisabled(false);
      if (!App.util.Layer.current || !self.compareLayers()){ 
        self.loadCurrentLayer();
        self.loadAdminLayer();
        self.setMainTitle();
        self.setLegend();
        self.setShapefileBtntext();
      }
    }
    else{
      self.removeCurrentLayer(); 
      App.service.Helper.getComponentExt('switcher-btn-reset').setDisabled(true);
    }
  },

  loadCurrentLayer: function () {
    var self = this;
    var map = self.instance;
    var aggregation = App.service.Watcher.getAggregation();

    var opts = {
      opacity: App.util.Layer.currentOpaque / 100,
      visible: App.service.Watcher.get('Current') == 'show' ? true : false,
      source: self.getLayerSource(!!App.service.Watcher.getIndicator().years)
    };

    map.removeLayer(App.util.Layer.current);
    App.util.Layer.current = aggregation.tiled ? new ol.layer.Tile(opts) : new ol.layer.Image(opts);
    map.addLayer(App.util.Layer.current);
    self.hideShowElements(App.util.Layer.current.getVisible());
  },

  loadAdminLayer: function () {
    var map = this.instance;

    map.removeLayer(App.util.Layer.admin);
    if (App.service.Watcher.get('Aggregation') != 'command' && App.service.Watcher.get('Aggregation') != 'grid'){
      App.util.Layer.admin = new ol.layer.Image({
        opacity: 1,
        visible: App.service.Watcher.get('Current') == 'show' ? true : false,
        source: new ol.source.ImageWMS({
          url: __Global.urls.Mapserver + 'wms?',
          serverType: 'geoserver',          
          params: {
            LAYERS: __Global.geoserverWorkspace + ':ca_' + App.service.Watcher.get('Aggregation') + '_geom',            
            TRANSPARENT: true,
            FORMAT: 'image/png',
            STYLES: 'ca_' + App.service.Watcher.get('Aggregation') + '_' + __Global.Lang
          }
        })
      });
      map.addLayer(App.util.Layer.admin);
    }
  },

  removeCurrentLayer: function(){
    var map = this.instance;
    if (!!App.util.Layer.current && !!App.util.Layer.admin){
      map.removeLayer(App.util.Layer.current);
      map.removeLayer(App.util.Layer.admin);
    }
    App.util.Layer.current = null;
    App.util.Layer.admin = null;    
    App.service.Helper.getComponentExt('map-container').setTitle(''); 
    App.service.Status.set('');
    App.service.Chart.window.close();
    App.service.Helper.getComponentExt('legend-current').setVisible(false);  
    App.service.Helper.getComponentExt('legend-panel').setVisible(false); 
    this.hideShowElements(false);
  },

  hideShowElements: function(currentLayer){
    App.service.Helper.getComponentExt('switcher-container-aggreg').setVisible(currentLayer);
    App.service.Yearslider.didRender();
  },

  getLayerSource: function (yearIncluded) {
    var self = this;
    var aggregation = App.service.Watcher.getAggregation();

    var year_filter = false;

    var params = {
      LAYERS: self.getLayerName(),
      TRANSPARENT: true,
      FORMAT: 'image/png',
      STYLES: self.getLayerStyles(),
      TILED: aggregation.tiled
    };

    if (yearIncluded) {
      year_filter = 'year=' + App.service.Watcher.get('Year');
    } 

    var aoi_filter = App.service.Watcher.get('Aoi_Filter'); 
    var CQLfilter = '';
    if (!!aoi_filter){
      CQLfilter = aoi_filter;
    }
    else{
      App.service.Helper.clearZoomCombos();
    }

    if (CQLfilter != ''){
      if (!!year_filter) {
        CQLfilter += ' and ' + year_filter;
      }
    }
    else{
      if (!!year_filter) {
        CQLfilter += year_filter;
      }     
    }
    if (CQLfilter != ''){
      params['cql_filter'] = CQLfilter;
    }

    var opts = {
      url: __Global.urls.Mapserver + 'wms?',
      serverType: 'geoserver',       
      params: params
    };

    return aggregation.tiled ? new ol.source.TileWMS(opts) : new ol.source.ImageWMS(opts);
  },

  compareLayers: function () {
    var oldLayer = App.util.Layer.current.getSource().getParams();
    return oldLayer.LAYERS + oldLayer.STYLES == this.getLayerName() + this.getLayerStyles();
  },

  getLayerName: function () {
    var layerName = __Global.geoserverWorkspace + ':ca_' + App.service.Watcher.get('Aggregation');
    if (App.service.Watcher.getIndicator().yearsPrefix) layerName = __Global.geoserverWorkspace + ':ca_' + App.service.Watcher.get('Aggregation') + '_no_years';
    return layerName;
  },

  getLayerStyles: function () {
    var styles = 'a_' + App.service.Watcher.get('Indicator');
    if (!!App.service.Watcher.get('Crop')) styles += '_' + App.service.Watcher.get('Crop');
    if (App.service.Watcher.get('Aggregation') == 'grid') styles += '_grid';
    if (App.service.Watcher.getIndicator().yearsPrefix) styles += '_no_years';
    return styles;
  },

  setMainTitle: function () {
    var userPolygon = App.service.Watcher.get('UserPolygon');
    var panel = App.service.Helper.getComponentExt('map-container');
    if (panel.isVisible()) {
      var indicator = App.service.Watcher.getIndicator();
      var aggregation = App.service.Watcher.getAggregation();
      var title = '';
      if (userPolygon == 'noshow'){
        title += aggregation[__Global.Lang + 'NameShort'] + ' ' + i18n.aggreg.map;
      }
      else{
        title += i18n.polygon.showPolygon;
      }
      if (indicator[__Global.Lang + 'NameShort']){
        title += ': ' + indicator[__Global.Lang + 'NameShort'];       
      }
      else{
        title += ': ' + indicator[__Global.Lang + 'Name'];
      }
      if (!!indicator.crops) title += ' ' + i18n.indicator._of + ' ' + App.service.Helper.getCropName();
      if (userPolygon == 'noshow'){
        if (!!indicator.years) {
          title += ' <b>' + App.service.Watcher.get('Year') + '</b>';
        }
        else if (!!indicator.yearsPrefix) {
          title += ' ' + __Global.year.Min + '-' + __Global.year.Max;
        }
      }
      panel.setTitle(title);
    }
  },

  changeYear: function () {
    this.setMainTitle();
    var aoi_filter = App.service.Watcher.get('Aoi_Filter');
    var CQLfilter = (!!aoi_filter) ? aoi_filter : '';
    var year_filter = 'year=' + App.service.Watcher.get('Year');
    if (CQLfilter != ''){
      CQLfilter += ' and ' + year_filter;
    }
    else{
      CQLfilter += year_filter;
    }

    return App.util.Layer.current
      .getSource()
      .updateParams({
        'cql_filter': CQLfilter
      });
  },

  getUrl: function (e, allYears) {
    var view = this.instance.getView();
    var viewResolution = view.getResolution();
    return this.getLayerSource(allYears).getGetFeatureInfoUrl(
      e.coordinate, viewResolution, view.getProjection(),
      {'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50}
    );
  },

  itsPolygon: function (e) {
    return !!this.instance.forEachFeatureAtPixel(e.pixel,
      function(feature, layer) {
        return feature;
      }
    );
  },

  setShapefileBtntext: function(){
    var aggregation = App.service.Watcher.getAggregation();
    var aoi_filter = App.service.Watcher.get('Aoi_Filter');
    var button = App.service.Helper.getComponentExt('switcher-btn-shapefile');
    button.setText(
      i18n.exp.download + ' ' + (!!aoi_filter ? i18n.exp.filtered + ' ' : '') + 
      aggregation[__Global.Lang + 'NameShort'] + ' ' + i18n.aggreg.map + ' ' + i18n.exp.asSHP
    );
    button.setTooltip(
      i18n.exp.tooltipSHP1 + (!!aoi_filter ? i18n.exp.filtered + ' ' : '') + aggregation[__Global.Lang + 'NameShort'] + 
      ' ' +  i18n.exp.tooltipSHP2
    );
  },

  setLegend: function () {
    var self = this;
    var aggregation = App.service.Watcher.getAggregation();
    App.service.Helper.getComponentExt('legend-current').setVisible(true);  
    App.service.Helper.getComponentExt('legend-panel').setVisible(true); 
    App.service.Helper.getComponentExt('legend-cx-current').setBoxLabel(
      aggregation[__Global.Lang + 'NameShort'] + ' ' + i18n.aggreg.map + ': ' +
      self.getLegendTitle(true)
    ); 
    App.service.Helper.getComponentExt('legend-image').setSrc(self.getLegendImage());
    App.service.Helper.getComponentExt('legend-text').setStyle({ lineHeight: self.getLegendMedianStyle() });
   // debugger;
    App.service.Helper.getComponentExt('legend-text').update(self.getLegendMedian());
  },

  getLegendImage: function () {
    var image_src = '';
    if (App.service.Watcher.getIndicator().mapType == 'colored' || App.service.Watcher.get('Aggregation') == 'grid'){
      var img = App.service.Watcher.get('Indicator');
      img += !App.service.Watcher.get('Crop') ? '_nocrops' : '_' + App.service.Watcher.get('Crop');
      image_src = 'resources/images/' + img + '.png';
    }
    return image_src;
  },

  getLegendTitle: function(withUnit){
    var legend_title = '';
    var indicator = App.service.Watcher.getIndicator();
    if (indicator[__Global.Lang + 'Legend'].length > 1){
      //indicators with crop list
      legend_title = App.service.Helper.getCropName();
    } 
    else{
      legend_title = indicator[__Global.Lang + 'Legend'][0];
    }
    if (withUnit && (indicator['chart'] != 'Multiannual' && indicator[__Global.Lang + 'Unit'] != '-')) {
      legend_title += i18n.chart._in + indicator[__Global.Lang + 'Unit'];
    }
    return legend_title;
  },

  getLegendMedian: function () {
    var indicator     = App.service.Watcher.getIndicator();
    var crop          = App.service.Watcher.get('Crop');

    var text          = '';
    var br            = '<br><br><br>';

    var median        = 0;
    var maximum       = 0;
    if (indicator.mapType == 'colored' || App.service.Watcher.get('Aggregation') == 'grid'){
      if (!!indicator.median) {
        if (!!indicator.crops){
          var index = (typeof indicator.crops == 'object') ? indicator.crops.indexOf(crop) : __Crop.indexOf(crop);
          median  = indicator.median  ? indicator.median  [index] : 0;
          maximum = indicator.maximum ? indicator.maximum [index] : 0;
        }
        else{
          median  = indicator.median;
          maximum = indicator.maximum;
        }
      }

      if (!!median && median != 0) {
        text = (typeof median == 'object')
              ? i18n.yield_classes.high + br + i18n.yield_classes.medium + br + i18n.yield_classes.low
              : '0' + br + median + br + maximum;
      }


    }
    if (indicator.id == 'mlu') {
      indicator[__Global.Lang + 'CropNames'].map(function (c) { 
        text += c + '<br />' 
      });
    }
    return text;
  },

  getLegendMedianStyle: function () {
    return (App.service.Watcher.getIndicator().id == 'mlu') ? '135%' : '150%';
  },

  filterAreaOfInterest: function(aoi, id, super_aoi, super_id){
    var aoi_filter = false;
    if (id != '0'){
      if (isNaN(id)){
        aoi_filter = aoi + "_id='" + id + "'";
      }
      else{
        aoi_filter = aoi + "_id=" + id;        
      }
      if (!!super_aoi){
        if (isNaN(super_id)){
          aoi_filter += ' and ' + super_aoi + "_id='" + super_id + "'";
        }
        else{
          aoi_filter += ' and ' + super_aoi + "_id=" + super_id;        
        }        
      }
    }
    App.service.Watcher.set('Aoi_Filter', aoi_filter);

        //if (App.service.Watcher.get('Aggregation') != aoi){
                console.log('filterAreaOfInterest fillAggregations_new'); 
    this.fillAggregations_new();
  //}
    if (aoi_filter == false){
      App.service.Helper.clearZoomCombos();
    }

    App.service.Helper.getComponentExt('zoom-btn-reset').setDisabled(!aoi_filter);
    var CQLfilter = !!aoi_filter ? aoi_filter : '';

    var year_filter = false;
    if (!!App.service.Watcher.getIndicator().years) {
      year_filter = 'year=' + App.service.Watcher.get('Year');
    } 

    if (CQLfilter != ''){
      if (!!year_filter) {
        CQLfilter += ' and ' + year_filter;
      }
    }
    else{
      if (!!year_filter) {
        CQLfilter += year_filter;
      }     
    }
    if (App.util.Layer.current){
      if (CQLfilter == ''){
        App.util.Layer.current
          .getSource()
          .updateParams({
            'cql_filter': null
          });     
      }
      else {
        App.util.Layer.current
          .getSource()
          .updateParams({
            'cql_filter': CQLfilter
          });
        this.setShapefileBtntext();  
      }
    }
  },

  fillAggregations_new: function () {
    availableAggregations = App.service.Watcher.getIndicator().aggregation;
    var aoi_filter = App.service.Watcher.get('Aoi_Filter');
    var aggregationStore = Ext.getStore('aggregation');
    var aggregationData = __Aggregation;
    if (typeof availableAggregations == 'object') {
      aggregationData = [];
      __Aggregation.map(function (aggregation) {
        if (availableAggregations.indexOf(aggregation.id) >= 0) {
          aggregationData.push(aggregation); 
        }
      });
     /* if (availableAggregations.indexOf(App.service.Watcher.get('Aggregation')) < 0) {
        App.service.Watcher.set('Aggregation', availableAggregations[0]);
        App.service.Helper.setComponentsValue([{ id: 'switcher-cb-aggregation', selection: 'Aggregation' }]);
      }*/
    }
    if (aoi_filter){
      if (aoi_filter.indexOf('and') >= 0){
        var super_aoi_filter = aoi_filter.split(' and ')[1];
        aoi_filter = super_aoi_filter;
      }
      var filteredData = [];
      aggregationData.map(function (aggregation) {
        if (!aggregation.aoi_filter 
          || aggregation.aoi_filter.indexOf(aoi_filter) >= 0 
          || aggregation.aoi_filter.indexOf(aoi_filter.split('=')[0]) >= 0
           /*|| aggregation.aoi_filter.join().indexOf(aoi_filter.split('=')[1].slice(0, 4)) >= 0
          || aoi_filter.indexOf(aggregation.id) >= 0*/
          ) {
          filteredData.push(aggregation); 
        }
      });
      aggregationData = filteredData;

    } 
    aggregationStore.removeAll();
    aggregationStore.loadData(aggregationData);

    var aggreg_ids = [];
    aggregationData.map(function (aggregation) {
      aggreg_ids.push(aggregation.id);
    });          
    if (aggreg_ids.indexOf(App.service.Watcher.get('Aggregation')) < 0) {
      App.service.Watcher.set('Aggregation', aggreg_ids[0]);
      App.service.Helper.setComponentsValue([{ id: 'switcher-cb-aggregation', selection: 'Aggregation' }]);
    }


  }

});