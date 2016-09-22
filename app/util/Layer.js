var LayerParams = {
  Irrigation  : 'wuemoca:ca_irrigation_mask_smooth',
  Country     : 'wuemoca:ca_country_geom_' + lang,
  Channel     : 'wuemoca:channel_geom_'+lang,
  Aggreg      : 'wuemoca:ca_{aggreg}',
  Styles      : 'wuemoca:ca_{type}_{crop}',
  Grid        : 'wuemoca:ca_{aggreg}_{type}_{crop}'
};

var BackgroundLayers = {
  ocm: new ol.layer.Tile({
    visible: true,
    maxResolution: 200,
    source: new ol.source.OSM({
      url: "https://{a-c}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png"
    })
  }),

  osm: new ol.layer.Tile({
    visible: true,
    minResolution: 200,
    source: new ol.source.OSM()
  }),

  irrigation: new ol.layer.Tile({
    opacity: 0.8,
    visible: false,
    source: new ol.source.TileWMS({
      url: __Global.urls.Mapserver + 'wms?',
      params: {
        LAYERS: LayerParams.Irrigation,
        TRANSPARENT: true,
        FORMAT: 'image/png'
      }
    })
  }),

  country: new ol.layer.Image({
    opacity: 1,
    visible: true,
    source: new ol.source.ImageWMS({
      url: __Global.urls.Mapserver + 'wms?',
      params: {
        LAYERS: LayerParams.Country,
        TRANSPARENT: true,
        FORMAT: 'image/png'
      }
    })
  }),

  channel: new ol.layer.Image({
    opacity: 1,
    visible: true,
    source: new ol.source.ImageWMS({
      url: __Global.urls.Mapserver + 'wms?',
      params: {
        LAYERS: LayerParams.Channel,
        TRANSPARENT: true,
        FORMAT: 'image/png'
      }
    })
  }),

  highlight: new ol.layer.Vector({
    opacity: 1,
    visible: true,
    zIndex: 15,
    source: new ol.source.Vector({}),
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: [255,0,0,0.2]
      }),
      stroke: new ol.style.Stroke({
        color: [255,0,0,0.6],
        width: 2
      })
    })
  })
}

Ext.define('App.util.Layer', {

  singleton: true,

  current: false,
  currentOpaque: 80,

  admin: false,

  irrigVisible: false,

  background: [
     BackgroundLayers.ocm
    ,BackgroundLayers.osm
    ,BackgroundLayers.irrigation
    ,BackgroundLayers.country
    ,BackgroundLayers.channel
    ,BackgroundLayers.highlight
  ],

  params: LayerParams,

  olView: new ol.View({
    projection: ol.proj.get('EPSG:3857'),
    center: ol.proj.fromLonLat([65.751278, 40.611368]),
    zoom: 6
  })

});