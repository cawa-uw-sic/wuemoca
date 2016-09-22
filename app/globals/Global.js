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
    Max           : new Date().getFullYear(),
    Min           : 2000
  },

  api: {
    Country       : api + 'refreshCountries.jsp?' + langParam,
    Oblast        : api + 'refreshOblasts.jsp?' + langParam,
    Rayon         : api + 'refreshRayons.jsp?' + langParam,
    Buis          : api + 'refreshBUIS.jsp?' + langParam,
    Uis           : api + 'refreshUIS.jsp?' + langParam,
    Wua           : api + 'searchWUAs.jsp?' + langParam
  },

  urls: {
    Server        : server,
    Mapserver     : server + 'geoserver/',
    Documents     : server + 'wuemoca/documents/',
    Faq           : server + 'wuemoca/faq.html',
    Impressum     : server + 'wuemoca/documents/Impressum.pdf'
  },

  chart: {
    Width: 515,
    Height: 350,
    MaxBars: 10
  }

};