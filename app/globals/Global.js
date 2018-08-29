var server = 'https://wuemoca.geographie.uni-wuerzburg.de';
var server_sic = 'http://wuemoca.net';
var server_wfs = server + ':443';

//SIC server settings
//disable google analytics scripts in index.html
//server = server_sic;
//server_wfs = server;

var api = server + '/mvc-backend/';

var documents = server + '/mvc-documents/';

var geoserver_workspace = 'wuemoca_v3';

var glossaryName = '20170407_CAWa_WUEMoCA_Glossary_beta_version_v01';

var langParam = 'lang=' + locale;
/**
* @class __Global
* global settings
*/
var __Global = {};

/**
* proxy settings
*/
__Global.proxy = {
    Type          : 'jsonp',
    Reader        : 'json'
};

__Global.lang            = locale;
/**
* projection collection
*/
__Global.projection = {
    Geographic    : 'EPSG:4326',
    Mercator      : 'EPSG:3857'
};
/**
* min and max year, max year is read from the DB
*/
__Global.year = {
    Max           : 0,
    Min           : 2000
};
/**
* max decade is read from the DB
*/
__Global.decade = {
    Max           : ''
};
/**
* @property api
* backend JSP script collection
* @property api.Report
* script for request of DB values for report
* @property api.Indicator    
* script for getting indicator specific values from DB (e.g. median)
* @property api.Polygon   
* script for DB aggregation on-the-fly with indicator calculation for user polygon
* @property api.Country    
* script for getting country list with extent from DB
* @property api.Oblast    
* script for getting oblast list with extent from DB
* @property api.Rayon   
* script for getting rayon list with extent from DB
* @property api.Buis    
* script for getting BUIS list with extent from DB
* @property api.Uis    
* script for getting UIS list with extent from DB
* @property api.Wua    
* script for getting WUA list with extent from DB
* @property api.writePolygon    
* script for writing values and geometry to temporary DB table
* @property api.WUE    
* script for DB aggregation on-the-fly of monthly and decadal ET actual
*/         
__Global.api = {
    Report        : api + 'report.jsp?',
    Indicator     : api + 'indicator.jsp?',
    Polygon       : api + 'calculatePolygon_v7_multi.jsp?',
    Country       : api + 'refreshCountries.jsp?' + langParam,
    Oblast        : api + 'refreshOblasts.jsp?' + langParam,
    Rayon         : api + 'refreshRayons.jsp?' + langParam,
    Buis          : api + 'refreshBUIS.jsp?' + langParam,
    Uis           : api + 'refreshUIS.jsp?' + langParam,
    Wua           : api + 'searchWUAs.jsp?' + langParam,
    writePolygon  : api + 'writePolygon_multi.jsp?',
    WUE           : api + 'calculateWUE_multi.jsp?'
};
/**
*  collection of URLs of backend documents
*/
__Global.urls = {
    Mapserver     : server + '/geoserver/',
    Mapserver_WFS : server_wfs + '/geoserver/' + geoserver_workspace + '/ows?' +
        'service=WFS&version=1.0.0&request=GetFeature&format_options=CHARSET:UTF-8&',        
    //important: http://scriptasylum.com/tutorials/frameredirect/frameredirect.html
    /*insert in head section of index.htm of Glossary on Server:
    var fname="content";     //MAIN CONTENT AREA FRAME **NAME**
    window.onload=function(){
      var d=document.location.search;
      var h=document.location.hash; //anchor
      if(d!='')top.frames[fname].document.location.href=d.substring(d.lastIndexOf('?')+1,d.length) + h;
    }
    */  
    Glossary      : documents + glossaryName + '.htm',
    GlossaryBase  : documents + glossaryName + '.htm?' + glossaryName + '/',
    //Faq           : 'bme00057.htm#bookme_anchor3',
    Faq           : 'bme00040.htm',    
    Intro         : 'bme00001.htm',
    Imprint     : documents + 'Imprint.pdf',
    Manual        : documents + 'Manual.pdf',
    AcronymPDF      : documents + 'WUEMoCA_Overview_indicators.pdf',
    VideoHeader        : documents + 'WUEMoCA_general_information.gif'
};
/**
* Geoserver workspace
*/
__Global.geoserverWorkspace = geoserver_workspace;
/**
* chart settings
*/
__Global.chart = {
    Height: 330,
    BarWidth: 32
};

//};