var server = 'https://wuemoca.geographie.uni-wuerzburg.de/';
var api = server + 'mvc-backend/';
var documents = server + 'wuemoca/documents/';
var glossaryName = 'glossary_wuemoca_vers2_test';
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
    Max           : 2016,
    Min           : 2000
  },

  api: {
    Report        : api + 'report.jsp?',
    Indicator     : api + 'indicator.jsp?',
    Polygon       : api + 'calculatePolygon_v4.jsp?',
    Country       : api + 'refreshCountries.jsp?' + langParam,
    Oblast        : api + 'refreshOblasts.jsp?' + langParam,
    Rayon         : api + 'refreshRayons.jsp?' + langParam,
    Buis          : api + 'refreshBUIS.jsp?' + langParam,
    Uis           : api + 'refreshUIS.jsp?' + langParam,
    Wua           : api + 'searchWUAs.jsp?' + langParam,
    writePolygon  : api + 'writePolygon.jsp?'
  },

  urls: {
    Server        : server,
    Mapserver     : server + 'geoserver/',
    Glossary      : documents + glossaryName + '.htm',
    GlossaryBase  : documents + glossaryName + '.htm?' + glossaryName + '/',
    //Faq           : 'bme00057.htm#bookme_anchor3',
    Faq           : 'bme00057.htm',    
    Intro         : 'bme00004.htm',
    Impressum     : documents + 'Imprint.pdf',
    Manual        : documents + 'Manual.pdf'
  },

  geoserverWorkspace : 'wuemoca_v3',

  chart: {
    //Width: 600,
    Height: 350,
    //MaxBars: 10,
    BarWidth: 36
  }

};