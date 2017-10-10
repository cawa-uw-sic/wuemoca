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
        }).extend([
          //new ol.control.ScaleLine({className: 'ol-scale-line', target: document.getElementById('scale-line')})
          new ol.control.ScaleLine()
        ])
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
    App.service.Chart.window.close();
  },

  loadLayer: function () {
    var self = this;
    var map = self.instance;
    console.log('loadLayer - indicator: ' + App.service.Watcher.get('Indicator'));
    if (!!App.service.Watcher.get('Aggregation')){
      if (!!App.service.Watcher.get('Indicator')) {
        App.service.Helper.getComponentExt('switcher-btn-reset').setDisabled(false);
        if (!App.util.Layer.current || !self.compareLayers()){
          self.loadCurrentLayer();
          self.setMainTitle();
          self.setLegend();
          console.log('setDownloadCombotext loadLayer');
          App.service.Exporter.setDownloadCombotext();
          App.service.Status.set('&#160;');
        }
      }
      else {
        self.removeCurrentLayer();
        App.service.Helper.getComponentExt('switcher-btn-reset').setDisabled(true);
      }
      self.loadAdminLayer();
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
      var visible = true;
      if (App.service.Watcher.get('Current') == 'noshow' && App.service.Watcher.get('UserPolygon') == 'show'){
        visible = false;
      }
      App.util.Layer.admin = new ol.layer.Image({
        opacity: 1,
        visible: visible,
        source: new ol.source.ImageWMS({
          url: __Global.urls.Mapserver + 'wms?',
          serverType: 'geoserver',
          params: {
            LAYERS: __Global.geoserverWorkspace + ':ca_' + App.service.Watcher.get('Aggregation') + '_geom',
            TRANSPARENT: true,
            FORMAT: 'image/png',
            STYLES: 'ca_' + App.service.Watcher.get('Aggregation') + '_' + __Global.lang
          }
        })
      });
      map.addLayer(App.util.Layer.admin);
    }
  },

  removeCurrentLayer: function(){
    var map = this.instance;
    if (!!App.util.Layer.current){
      map.removeLayer(App.util.Layer.current);
    }    
    /*if (!!App.util.Layer.current && !!App.util.Layer.admin){
      map.removeLayer(App.util.Layer.current);
      map.removeLayer(App.util.Layer.admin);
    }*/
    App.util.Layer.current = null;
    //App.util.Layer.admin = null;
    App.service.Helper.getComponentExt('map-container').setTitle('');
    App.service.Status.set('&#160;');
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
      params['CQL_FILTER'] = CQLfilter;
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
    if (App.service.Watcher.getIndicator().yearsPrefix) {
      layerName += '_no_years';
    }
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
        title += aggregation[__Global.lang + 'NameShort'] + ' ' + i18n.aggreg.map + ':<br>';
      }
      else{
        title += i18n.polygon.showPolygon + ':<br>';
      }
      if (indicator[__Global.lang + 'NameShort']){
        title += indicator[__Global.lang + 'NameShort'];
      }
      else{
        title += indicator[__Global.lang + 'Name'];
      }
      if (!!indicator.crops && App.service.Watcher.get('Crop') != 'sum') title += ' ' + i18n.indicator._of + ' ' + App.service.Helper.getCropName();
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
    if (CQLfilter != '') {
      CQLfilter += ' and ' + year_filter;
    }
    else{
      CQLfilter += year_filter;
    }

    return App.util.Layer.current
      .getSource()
      .updateParams({
        'CQL_FILTER': CQLfilter
      });
  },

  getUrl: function (coordinate, allYears) {
    var view = this.instance.getView();
    var viewResolution = view.getResolution();
    return this.getLayerSource(allYears).getGetFeatureInfoUrl(
      coordinate, 
      viewResolution, 
      view.getProjection(),
      {
        'INFO_FORMAT': 'text/javascript',
        'FEATURE_COUNT': 50,
        'BUFFER': 1
      }
    );
  },

  itsPolygon: function (e) {
    return !!this.instance.forEachFeatureAtPixel(e.pixel,
      function(feature, layer) {
        return feature;
      }
    );
  },

  setLegend: function () {
    var self = this;
    var aggregation = App.service.Watcher.getAggregation();
    App.service.Helper.getComponentExt('legend-current').setVisible(true);
    App.service.Helper.getComponentExt('legend-panel').setVisible(true);
    App.service.Helper.getComponentExt('legend-cx-current').setBoxLabel(
      aggregation[__Global.lang + 'NameShort'] + ' ' + i18n.aggreg.map + ': ' +
      self.getLegendTitle(true, false)
    );
    var image_src = self.getLegendImage();
    if (image_src != ''){
      App.service.Helper.getComponentExt('legend-panel').setVisible(true);
      App.service.Helper.getComponentExt('legend-image').setSrc(image_src);
      App.service.Helper.getComponentExt('legend-text').setStyle({ lineHeight: self.getLegendMedianStyle() });
     // debugger;
      App.service.Helper.getComponentExt('legend-text').update(self.getLegendMedian());
    }
    else{
      App.service.Helper.getComponentExt('legend-panel').setVisible(false);
    }
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

  getLegendTitle: function(withUnit, thousand){
    var legend_title = '';
    var indicator = App.service.Watcher.getIndicator();
    if (!!indicator.crops){
      //indicators with crop list
      /*if (indicator.id == 'vc' && typeof indicator[__Global.lang + 'Legend'] == 'object'){
        legend_title = indicator[__Global.lang + 'Legend'][
          App.service.Helper.getById(__Crop, App.service.Watcher.get('Crop')).idx
        ];
      }
      else{*/
        legend_title = App.service.Helper.getCropName();
      //}
    }
    else{
      legend_title = indicator[__Global.lang + 'Legend'];
    }
    if (withUnit){
      if (indicator.id == 'firn' || (indicator.chart != 'Multiannual' && indicator.chart != 'Line')) {
        legend_title += i18n.chart._in;
        legend_title += thousand ? i18n.chart.thousand : '';
        legend_title += indicator[__Global.lang + 'Unit'];
      }
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
    var minimum = 0;
    if (indicator.mapType == 'colored' || App.service.Watcher.get('Aggregation') == 'grid'){
      if (!!indicator.median) {
        if (!!indicator.crops){
          var index = (typeof indicator.crops == 'object') ? indicator.crops.indexOf(crop) : App.service.Helper.getById(__Crop, crop).idx;
          median  = indicator.median  ? indicator.median  [index] : 0;
          maximum = indicator.maximum ? indicator.maximum [index] : 0;
        }
        else{
          median  = indicator.median;
          maximum = indicator.maximum;
        }
        if (!!indicator.minimum){
          minimum = indicator.minimum;
        }
      }

      if (!!median && median != 0) {
        if (typeof median == 'object'){
          if (indicator.id == 'yf' || indicator.id == 'pirf'){
            text = i18n.yield_classes.high + br + i18n.yield_classes.medium + br + i18n.yield_classes.low;
          }
          else if (indicator.id == 'vc' || indicator.id == 'vet'){
            text = i18n.vc_classes.more + br + i18n.vc_classes.equal + br + i18n.vc_classes.less;
          }
        }
        else{
          text = maximum + br + median + br + minimum;
        }
      }
    }
    if (indicator.id == 'mlu') {
      indicator[__Global.lang + 'CropNames'].map(function (c) {
        text += c + '<br />'
      });
    }
    return text;
  },

  getLegendMedianStyle: function () {
    return (App.service.Watcher.getIndicator().id == 'mlu') ? '135%' : '165%';
  },

  onAggregation: function(cb, val){
    //reset comboboxes
    var aoi_filter = App.service.Watcher.get('Aoi_Filter');
    if (!!aoi_filter){
      if (val == 'command'){
        App.service.Helper.resetComboboxes(['zoom-cb-rayon', 'zoom-cb-wua', 'zoom-cb-buis']);
      }
      else if (val == 'wua'){
        App.service.Helper.resetComboboxes(['zoom-cb-rayon', 'zoom-cb-buis']);        
      }
      else if (val == 'rayon'){
        App.service.Helper.resetComboboxes(['zoom-cb-wua', 'zoom-cb-buis']);
        if (App.service.Helper.getComponentValue('zoom-cb-oblast') != null){  
          if (App.service.Helper.getComponentValue('zoom-cb-oblast') == 'all'){
            App.service.Helper.resetComboboxes(['zoom-cb-oblast']);  
          } 
          else {
            if (App.service.Watcher.get('Rayon') == null){
              App.service.Watcher.set('Rayon', 'all');
              App.service.Helper.setComponentsValue([{ id: 'zoom-cb-rayon', selection: 'Rayon' }]);
            }
          }
        }      
      }      
      else if (val == 'buis'){
        App.service.Helper.resetComboboxes(['zoom-cb-uis', 'zoom-cb-oblast']);        
      } 
      else if (val == 'uis'){
        App.service.Helper.resetComboboxes(['zoom-cb-oblast']);
        if (App.service.Helper.getComponentValue('zoom-cb-buis') != null){  
          if (App.service.Helper.getComponentValue('zoom-cb-buis') == 'all'){
            App.service.Helper.resetComboboxes(['zoom-cb-buis']);  
          } 
          else {
            if (App.service.Watcher.get('Uis') == null){
              App.service.Watcher.set('Uis', 'all');
              App.service.Helper.setComponentsValue([{ id: 'zoom-cb-uis', selection: 'Uis' }]);
            }
          }
        }      
      }      
      else if (val == 'oblast'){
        App.service.Helper.resetComboboxes(['zoom-cb-rayon', 'zoom-cb-wua', 'zoom-cb-buis']);
      }       
      //reset filter
      if ((aoi_filter.indexOf(App.service.Watcher.getSuperFilterAggregation(val)) < 0)
        && (aoi_filter.indexOf('country') < 0)){
       // && (aoi_filter.indexOf(val) < 0)){
        App.service.Watcher.set('Aoi_Filter', false);
        console.log('onAggregation fillAggregations_new');        
        this.fillAggregations_new();
      }
      else{
        //set super filter
        if (aoi_filter.indexOf(' and ') >= 0){
          var super_aoi_filter = aoi_filter.split(' and ')[1];
          if (aoi_filter.indexOf(val) < 0 || super_aoi_filter.split('=')[0] == val + '_id'){
            //if (sub_aoi_filter.indexOf(App.service.Watcher.getSuperFilterAggregation(val)) < 0){
              App.service.Watcher.set('Aoi_Filter', super_aoi_filter);
            //}
          }
        }
      }
    }
    App.service.Helper.getComponentExt('zoom-btn-reset').setDisabled(!aoi_filter);
    App.service.Watcher.set('Aggregation', val);

    var aggregation = App.service.Watcher.getAggregation();
    //var label = '<a href="' + __Global.urls.GlossaryBase + aggregation['glossary'] + 
      //'" title="' + aggregation[__Global.lang + 'NameShort'] + ': ' + aggregation[__Global.lang + 'Tooltip'] + 
      //'" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>' + i18n.aggreg.label;
    if (cb.getItemId() == 'switcher-cb-aggregation'){
      var label = '<a href="' + __Global.urls.GlossaryBase + aggregation['glossary'] + 
        '" data-qtip="' + i18n.header.readmore + ' ' + aggregation[__Global.lang + 'NameShort'] + 
        '" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>' + i18n.aggreg.label;      
      cb.setFieldLabel(label);
    }

    if (App.service.Chart.click_coordinates && !App.service.Chart.window.isHidden()) App.service.Chart.doRequest();
    if (App.service.Watcher.get('UserPolygon') == 'show' && !App.service.Polygon.windowChart.isHidden()) {
      App.service.Polygon.showChartWindow();
    }
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

    this.fillAggregations_new();

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
            'CQL_FILTER': null
          });
      }
      else {
        App.util.Layer.current
          .getSource()
          .updateParams({
            'CQL_FILTER': CQLfilter
          });
          console.log('setDownloadCombotext filterAreaOfInterest');
        App.service.Exporter.setDownloadCombotext();
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
      if (aoi_filter.indexOf(' and ') >= 0){
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
      App.service.Map.filterAreaOfInterest('','0');
      App.service.Chart.window.close();

      //App.service.Helper.setComponentsValue([]);
    }
  },

  setIndicatorFilter: function(userPolygon){
    var indicatorStore = Ext.getStore('indicator');

    indicatorStore.removeAll();

    if (userPolygon){
      //duplicate array of nested objects
      var indicatorData = JSON.parse(JSON.stringify(__Indicator));
      var filteredData = [];
      indicatorData.map(function (indicator) {
        if (indicator.up) {
          filteredData.push(indicator);
        }
      });
      indicatorStore.loadData(filteredData);
      //multi-annual indicators are not visible with user polygons
      if (App.service.Watcher.getIndicator().chart == 'Multiannual'){
        App.service.Watcher.set('Indicator', 'uir');
        App.service.Helper.setComponentsValue([{id: 'switcher-cb-indicator', selection: 'Indicator'}]);
      }
    }
    else{
      indicatorStore.loadData(__Indicator);
    }
  }

});