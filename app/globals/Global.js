var server = 'https://wuemoca.geographie.uni-wuerzburg.de/';
var api = server + 'mvc-backend/';
var lang = locale;
var langParam = 'lang=' + lang;

var __Global = {

  Lang            : lang,

  proxy: {
    Type          : 'jsonp',
    Reader        : 'json'
  },

  projection: {
    Geographic    : 'EPSG:4326',
    Mercator      : 'EPSG:3857'
  },

  year: {
    Max           : 2015,
    Min           : 2000
  },

  api: {
    Polygon       : api + 'calculatePolygon_v3.jsp?',
    Country       : api + 'refreshCountries.jsp?' + langParam,
    Oblast        : api + 'refreshOblasts.jsp?' + langParam,
    Rayon         : api + 'refreshRayons.jsp?' + langParam,
    Buis          : api + 'refreshBUIS.jsp?' + langParam,
    Uis           : api + 'refreshUIS.jsp?' + langParam,
    Wua           : api + 'searchWUAs.jsp?' + langParam,
    PrintChart    : api + 'getChartValues.jsp?' + langParam
  },

  urls: {
    Server        : server,
    Mapserver     : server + 'geoserver/',
    Documents     : server + 'wuemoca/documents/',
    Faq           : server + 'wuemoca/documents/glossary_wuemoca_vers2.htm',
    Impressum     : server + 'wuemoca/documents/Impressum.pdf'
  },

  geoserverWorkspace : 'wuemoca_v3',

  chart: {
    Width: 450,
    Height: 350,
    MaxBars: 10
  }

};