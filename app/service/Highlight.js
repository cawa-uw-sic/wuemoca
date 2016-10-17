Ext.define('App.service.Highlight', {

  singleton: true,

  display: function (features) {
    this.clear();
    if (features.length > 0) {
      features[0].geometry.coordinates.map(function (polygon) {
        polygon[0] = polygon[0].map(function (point) {
          if (!!App.service.Watcher.getIndicator().yearsPrefix){
            point = ol.proj.transform(point, 'EPSG:4326', 'EPSG:3857');
          }
          return point;
        })
        var feature = new ol.Feature({
          geometry: new ol.geom.Polygon([polygon[0]])
        });
        BackgroundLayers.highlight.getSource().addFeature(feature);
      });
    }
  },

  clear: function () {
    BackgroundLayers.highlight.getSource().clear();
  }

});