/**
* Highlighting of clicked map units
*/
Ext.define('App.service.Highlight', {

  singleton: true,

  display: function (coordinates) {
    this.clear();
    var feature = new ol.Feature({
      geometry: new ol.geom.MultiPolygon(coordinates)
    });     
    var feature_transform = new ol.Feature({
      geometry: new ol.geom.MultiPolygon(coordinates).transform(__Global.projection.Geographic, __Global.projection.Mercator)
    });     
    BackgroundLayers.highlight.getSource().addFeature(feature);
  },

  clear: function () {
    BackgroundLayers.highlight.getSource().clear();
  }

});