/**
* @class __Aggregation
* list of aggregation levels with id, names in English and Russian, short names, tooltips, 
* superordnated map filters, etc. as configuration for aggregation map layer
*/
var __Aggregation = [
  /**
  * @property {Object[]} [oblast={id,enName,ruName,enNameShort,ruNameShort,enTooltip,ruTooltip,super_filter,
  * glossary}] province aggregation level
  * @property {String} oblast.id acronym as it is used in the WUEMoCA DB
  * @property {String} oblast.enName English name
  * @property {String} oblast.ruName Russian name
  * @property {String} oblast.enNameShort English short name
  * @property {String} oblast.ruNameShort Russian short name
  * @property {String} oblast.enTooltip English tooltip
  * @property {String} oblast.ruTooltip Russian tooltip
  * @property {String} oblast.super_filter superordinated map filter
  * @property {String[]} oblast.aoi_filter list of allowed filter clauses for CQL filter
  * @property {Boolean} oblast.tiled true for ol.layer.Tile, false for ol.layer.Image, depending on data volume
  * @property {String} oblast.glossary name of glossary page related to aggregation level
  */    
  {
  
    id             : 'oblast',
    enName         : 'Province (Oblast)',
    ruName         : 'Область',
    enNameShort    : 'Province',
    ruNameShort    : 'Область',
    enTooltip      : 'Available for Aral Sea Basin',
    ruTooltip      : 'Доступно для бассейна Аральского моря',        
    super_filter: 'oblast' ,        
    isDefault      : true,
    //items: false,
    glossary       : 'bme00017.htm#bookme_anchor30'
  }, 
  /**
  * @property rayon
  * district aggregation level
  */    
  {
    id             : 'rayon',
    enName         : 'District (Rayon)',
    ruName         : 'Район',
    enNameShort    : 'District',
    ruNameShort    : 'Район',
    enTooltip      : 'Available for Aral Sea Basin',
    ruTooltip      : 'Доступно для бассейна Аральского моря',         
    super_filter: 'oblast' ,
    //items: false,
    glossary       : 'bme00017.htm#bookme_anchor29'
  }, 
  /**
  * @property grid
  * regular raster aggregation level
  */    
  {
    id: 'grid',
    enName: 'regular Raster',
    ruName: 'Регулярный растр',
    enNameShort    : 'regular Raster',
    ruNameShort    : 'Рег. растр',
    enTooltip      : 'Available for Aral Sea Basin',
    ruTooltip      : 'Доступно для бассейна Аральского моря',   
    super_filter: 'oblast',     
    tiled: true,
    //items: false,
    glossary       : 'bme00017.htm#bookme_anchor24'
  },
  /**
  * @property buis
  * BISA aggregation level
  */    
  {
    id             : 'buis',
    enName         : 'BISA (Basin Irrig. System Auth.)',
    ruName         : 'БУИС (Бассейновое Управление Ирриг. Систем)',
    enNameShort    : 'BISA',
    ruNameShort    : 'БУИС',
    enTooltip      : 'Available for Uzbekistan only',
    ruTooltip      : 'Доступно для Узбекистана только',        
    super_filter: 'buis', 
    aoi_filter: [
        "country_id='UZB'",
        "oblast_id=1703",
        "oblast_id=1706",
        "oblast_id=1708",
        "oblast_id=1710",
        "oblast_id=1712",
        "oblast_id=1714",
        "oblast_id=1718",
        "oblast_id=1722",
        "oblast_id=1724",
        "oblast_id=1726",
        "oblast_id=1727",
        "oblast_id=1730",
        "oblast_id=1733",
        "oblast_id=1735",
        "buis_id",
        "uis_id"
    ],
    //items: false,
    glossary       : 'bme00017.htm#bookme_anchor28'
  }, 
  /**
  * @property uis
  * ISA aggregation level
  */    
  {
    id             : 'uis',
    enName         : 'ISA (Irrigation System Auth.)',
    ruName         : 'УИС (Управление Ирригационных Систем)',
    enNameShort    : 'ISA',
    ruNameShort    : 'УИС' ,
    enTooltip      : 'Available for Uzbekistan only',
    ruTooltip      : 'Доступно для Узбекистана только',         
    super_filter: 'buis' ,
    aoi_filter: [
        "country_id='UZB'",
        "oblast_id=1703",
        "oblast_id=1706",
        "oblast_id=1708",
        "oblast_id=1710",
        "oblast_id=1712",
        "oblast_id=1714",
        "oblast_id=1718",
        "oblast_id=1722",
        "oblast_id=1724",
        "oblast_id=1726",
        "oblast_id=1727",
        "oblast_id=1730",
        "oblast_id=1733",
        "oblast_id=1735",
        "buis_id",
        "uis_id"
    ],
    //items: false,
    glossary       : 'bme00017.htm#bookme_anchor27'
  }, 
  /*{
     id             : 'uis_rayon',
    enName         : 'District fractions of ISA',
    ruName         : 'Район фракции УИС',
    enNameShort    : 'Districts of ISA',
    ruNameShort    : 'Районы УИС' ,
    enTooltip      : 'Available for Uzbekistan only',
    ruTooltip      : 'Доступно для Узбекистана только',         
    super_filter: 'buis' ,
    aoi_filter: [
        "country_id='UZB'",
        "oblast_id=1703",
        "oblast_id=1706",
        "oblast_id=1708",
        "oblast_id=1710",
        "oblast_id=1712",
        "oblast_id=1714",
        "oblast_id=1718",
        "oblast_id=1722",
        "oblast_id=1724",
        "oblast_id=1727",
        "oblast_id=1730",
        "oblast_id=1733",
        "oblast_id=1735",
        "buis_id",
        "uis_id"
    ],
    //items: false,
    glossary       : 'bme00017.htm'
  }, */

  /**
  * @property wua
  * WUA aggregation level
  */    
  {
    id             : 'wua',
    enName         : 'WUA (Water User Association)',
    ruName         : 'АВП (Ассоциация водопользователей)',
    enNameShort    : 'WUA',
    ruNameShort    : 'АВП' ,
    enTooltip      : 'Available for Fergana and Khorezm provinces only',
    ruTooltip      : 'Доступно только для Ферганской и Хорезмской областей',        
    super_filter: 'oblast' ,
    aoi_filter: [
        "country_id='UZB'", 
        "oblast_id=1730", 
        "oblast_id=1733"
    ],
    tiled: true,
    //items: false,
    glossary       : 'bme00017.htm#bookme_anchor26'
  },  
  /**
  * @property command
  * channel command area aggregation level
  */    
  {
    id             : 'command',
    enName         : 'Channel Command Area',
    ruName         : 'Подкомандная зона канала',
    enNameShort    : 'Command Area',
    ruNameShort    : 'Подкомандная зона канала' ,
    enTooltip      : 'Available for Fergana valley only',
    ruTooltip      : 'Доступно только для Ферганской долины',        
    super_filter: 'oblast' ,
    aoi_filter: [
        "country_id='UZB'", 
        "country_id='KGZ'", 
        "country_id='TJK'",
        "oblast_id=1703",
        "oblast_id=1714",
        "oblast_id=1730",
        "oblast_id=3303",
        "oblast_id=3305",
        "oblast_id=3306",
        "oblast_id=3503"
    ],
    tiled: true,
    //items: false ,
    glossary       : 'bme00017.htm#bookme_anchor25'
  }

];