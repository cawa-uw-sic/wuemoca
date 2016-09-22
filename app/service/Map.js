Ext.define('App.service.Map', {

  singleton: true,

  instance: false,

  initialize: function () {
    if (!this.instance) {
      this.instance = new ol.Map({
        view: App.util.Layer.olView,
        layers: App.util.Layer.background
      });
    }

    return this.instance;
  },

  setMapExtent: function (extent) {
    if (typeof extent == 'string') extent = extent.split(',');

    extent = extent.map(function (r) { return parseFloat(r); });

    extent = ol.proj.transformExtent(extent, __Global.projection.Geographic, __Global.projection.Mercator);

    this.instance.getView().fit(
      extent,
      this.instance.getSize()
    );
  },

  loadLayer: function () {
    var self = this;
    var map = this.instance;
    if (App.service.Watcher.get('Indicator') && App.service.Watcher.get('Aggregation')) {
      if (!App.util.Layer.current || !self.compareLayers()) {
        self.loadCurrentLayer();
        self.loadAdminLayer();
        self.setMainTitle();
        self.setLegend();
      }
    }
  },

  loadCurrentLayer: function () {
    var self = this;
    var map = self.instance;
    var aggregation = App.service.Watcher.getAggregation();

    var opts = {
      opacity: App.util.Layer.currentOpaque / 100,
      visible: true,
      source: self.getLayerSource(!!App.service.Watcher.getIndicator().years)
    };

    map.removeLayer(App.util.Layer.current);
    App.util.Layer.current = aggregation.tiled ? new ol.layer.Tile(opts) : new ol.layer.Image(opts);
    map.addLayer(App.util.Layer.current);
  },

  loadAdminLayer: function () {
    var map = this.instance;

    map.removeLayer(App.util.Layer.admin);
    App.util.Layer.admin = new ol.layer.Image({
      opacity: 1,
      visible: true,
      source: new ol.source.ImageWMS({
        url: __Global.urls.Mapserver + 'wms?',
        params: {
          LAYERS: 'wuemoca:ca_' + App.service.Watcher.get('Aggregation') + '_geom_' + __Global.Lang,
          TRANSPARENT: true,
          FORMAT: 'image/png'
        }
      })
    });
    map.addLayer(App.util.Layer.admin);
  },

  getLayerSource: function (yearIncluded) {
    var self = this;
    var aggregation = App.service.Watcher.getAggregation();

    var params = {
      LAYERS: self.getLayerName(),
      TRANSPARENT: true,
      FORMAT: 'image/png',
      STYLES: self.getLayerStyles()
    };

    if (yearIncluded) params['cql_filter'] = 'year=' + App.service.Watcher.get('Year');

    var opts = {
      url: __Global.urls.Mapserver + 'wms?',
      params: params
    };

    return aggregation.tiled ? new ol.source.TileWMS(opts) : new ol.source.ImageWMS(opts);
  },

  compareLayers: function () {
    var oldLayer = App.util.Layer.current.getSource().getParams();
    return oldLayer.LAYERS + oldLayer.STYLES == this.getLayerName() + this.getLayerStyles();
  },

  getLayerName: function () {
    var layerName = 'wuemoca:ca_' + App.service.Watcher.get('Aggregation');
    if (App.service.Watcher.getIndicator().yearsPrefix) layerName += '_noyears';
    return layerName;
  },

  getLayerStyles: function () {
    var styles = 'wuemoca:a_' + App.service.Watcher.get('Indicator');
    if (!!App.service.Watcher.get('Crop')) styles += '_' + App.service.Watcher.get('Crop');
    if (App.service.Watcher.get('Aggregation') == 'grid') styles += '_grid';
    if (App.service.Watcher.getIndicator().yearsPrefix) styles += '_noyears';
    return styles;
  },

  setMainTitle: function () {
    var panel = App.service.Helper.getComponentExt('map-container');
    if (panel.isVisible()) {
      var indicator = App.service.Watcher.getIndicator();
      var aggregation = App.service.Watcher.getAggregation();
      var title = indicator[__Global.Lang + 'Name'];
      if (!!App.service.Watcher.get('Crop')) title += ': ' + i18n.crop[App.service.Watcher.get('Crop')];
      title += '[' + aggregation[__Global.Lang + 'Name'] + ']';
      if (!!indicator.years) title += ' - ' + App.service.Watcher.get('Year');
      panel.setTitle(title);
    }
  },

  changeYear: function () {
    this.setMainTitle();
    return App.util.Layer.current
              .getSource()
              .updateParams({
                'cql_filter': 'year=' + App.service.Watcher.get('Year')
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

  setLegend: function () {
    var self = this;
    App.service.Helper.getComponentExt('legend-image').setSrc(self.getLegendImage());
    App.service.Helper.getComponentExt('legend-cx-current').setBoxLabel(self.getLegendTitle());
    App.service.Helper.getComponentExt('legend-text').setStyle({ lineHeight: self.getLegendMedianStyle() });
    App.service.Helper.getComponentExt('legend-text').update(self.getLegendMedian());
  },

  getLegendImage: function () {
    var img = App.service.Watcher.get('Indicator');
    img += !App.service.Watcher.get('Crop') ? '_nocrops' : '_' + App.service.Watcher.get('Crop');
    return 'resources/images/' + img + '.png';
  },

  getLegendTitle: function () {
    return App.service.Watcher.getIndicator()[ __Global.Lang + 'Name' ];
  },

  getLegendMedian: function () {
    var indicator     = App.service.Watcher.getIndicator();
    var crop          = App.service.Watcher.get('Crop');

    var text          = '';
    var br            = '<br><br><br>';

    var median        = 0;
    var maximum       = 0;

    if (!!indicator.crops) {
      var index = (typeof indicator.crops == 'object') ? indicator.crops.indexOf(crop) : __Crop.indexOf(crop);
      median  = indicator.median [index] || 0;
      maximum = indicator.maximum[index] || 0;
    }

    if (!!median && median != 0) {
      text = (typeof median == 'object')
            ? i18n.yield_classes.high + br + i18n.yield_classes.medium + br + i18n.yield_classes.low
            : '0' + br + median + br + maximum;
    }

    if (indicator.id == 'majority') {
      __CropMajority.map(function (c) { text += i18n.crop[c] + '<br />' });
    }

    return text;
  },

  getLegendMedianStyle: function () {
    return (App.service.Watcher.getIndicator().id == 'majority') ? '135%' : '150%';
  }

});