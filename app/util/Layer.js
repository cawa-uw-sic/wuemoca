var LayerParams = {
  Irrigation  : __Global.geoserverWorkspace + ':irrigation_extent',
  Country     : __Global.geoserverWorkspace + ':ca_country_geom',
  Channel     : __Global.geoserverWorkspace + ':channel_geom',
  Aggreg      : __Global.geoserverWorkspace + ':ca_{aggreg}',
  Styles      : __Global.geoserverWorkspace + ':ca_{type}_{crop}',
  Grid        : __Global.geoserverWorkspace + ':ca_{aggreg}_{type}_{crop}'
};

var BackgroundLayers = {

  satellite: new ol.layer.Tile({
    preload: Infinity,
    visible: false,
    source: new ol.source.BingMaps({
      key: 'AmlVh-kGlvEqlwjR_MtTKkdwxKSDwhkzsfzcbnmCedxGE_5oBZECnZ3MRXCKH-vb',
      imagerySet: 'AerialWithLabels'
    })
  }),

  street: new ol.layer.Tile({
    preload: Infinity,
    visible: true,
    source: new ol.source.BingMaps({
      key: 'AmlVh-kGlvEqlwjR_MtTKkdwxKSDwhkzsfzcbnmCedxGE_5oBZECnZ3MRXCKH-vb',
      imagerySet: 'Road'
    })
  }),

  ocm: new ol.layer.Tile({
    visible: true,
    maxResolution: 200,
    source: new ol.source.OSM({
      url: "https://{a-c}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=48db33c5dbf84800ac86e6a7776caf8f"
    })
  }),

  osm: new ol.layer.Tile({
    visible: true,
    minResolution: 200,
    source: new ol.source.OSM()
  }),

  irrigation: new ol.layer.Tile({
    opacity: 0.8,
    visible: App.service.Watcher.get('IrrigationExtent') == 'show' ? true : false,
    //visible: false,
    source: new ol.source.TileWMS({
      url: __Global.urls.Mapserver + 'wms?',
      serverType: 'geoserver',
      params: {
        LAYERS: LayerParams.Irrigation,
        TRANSPARENT: true,
        FORMAT: 'image/png',
        TILED: true
      }
    })
  }),

  irrigation_overview: new ol.layer.Image({
    opacity: 1,
    visible: true,
    source: new ol.source.ImageWMS({
      url: __Global.urls.Mapserver + 'wms?',
      serverType: 'geoserver',     
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
      serverType: 'geoserver',      
      params: {
        LAYERS: LayerParams.Country,
        TRANSPARENT: true,
        FORMAT: 'image/png',
        STYLES: 'ca_country_' + __Global.lang
      }
    })
  }),

  channel: new ol.layer.Image({
    opacity: 1,
    visible: true,
    source: new ol.source.ImageWMS({
      url: __Global.urls.Mapserver + 'wms?',
      serverType: 'geoserver',       
      params: {
        LAYERS: LayerParams.Channel,
        TRANSPARENT: true,
        FORMAT: 'image/png',
        STYLES: 'channel_' + __Global.lang
      }
    })
  }),

  highlight: new ol.layer.Vector({
    opacity: 1,
    visible: true,
    zIndex: 15,
    source: new ol.source.Vector({}),
    style: new ol.style.Style({
      /*fill: new ol.style.Fill({
        color: [255,0,0,0.2]
      }),*/
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

  //irrigVisible: false,

  background: [
     BackgroundLayers.ocm
    ,BackgroundLayers.osm
     //BackgroundLayers.street
    ,BackgroundLayers.satellite
    ,BackgroundLayers.irrigation
    ,BackgroundLayers.country
    ,BackgroundLayers.channel
    ,BackgroundLayers.highlight
  ],

  overview: [
     BackgroundLayers.street
    ,BackgroundLayers.irrigation_overview
    //,BackgroundLayers.country
  ],

  params: LayerParams,

  olView: new ol.View({
    projection: ol.proj.get('EPSG:3857'),
    center: ol.proj.fromLonLat([65.751278, 40.611368]),
    zoom: 6
  })

});