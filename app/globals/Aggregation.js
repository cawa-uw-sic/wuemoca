var __Aggregation = [

  /*{
    id: 'admin',
    enName: 'Administrative units',
    ruName: 'Админиcтративные объекты',
    isDefault: true,
    items: [*/
      {
        id             : 'oblast',
        enName         : 'Province (Oblast)',
        ruName         : 'Область',
        enNameShort    : 'Province',
        ruNameShort    : 'Область',
        filter: 'oblast',        
        isDefault      : true,
        items: false,
        glossary       : 'bme00057.htm'
      }, {
        id             : 'rayon',
        enName         : 'District (Rayon)',
        ruName         : 'Район',
        enNameShort    : 'District',
        ruNameShort    : 'Район',
        filter: 'oblast'  ,
        items: false,
        glossary       : 'bme00057.htm'
      }, {
        id             : 'wua',
        enName         : 'WUA (Water User Association)',
        ruName         : 'АВП (Ассоциация водопользователей)',
        enNameShort    : 'WUA',
        ruNameShort    : 'АВП' ,
        enTooltip      : 'Available for Fergana and Khorezm provinces only',
        ruTooltip      : 'Доступно только для Ферганской и Хорезмской областей',        
        filter: 'oblast'    ,
        tiled: true,
        items: false,
        glossary       : 'bme00057.htm'
      },
    /*]
  },

  {
    id: 'water',
    enName: 'Hydrographic units',
    ruName: 'Объекты водопользователей',
    items: [*/
      {
        id             : 'buis',
        enName         : 'BISA (Basin Irrig. System Admin.)',
        ruName         : 'БУИС (бассейн Управление ирригационной системы)',
        enNameShort    : 'BISA',
        ruNameShort    : 'БУИС',
        enTooltip      : 'Available for Uzbekistan only',
        ruTooltip      : 'Доступно для Узбекистана только',        
        filter: 'buis' ,        
        //isDefault      : true,
        items: false,
        glossary       : 'bme00057.htm'
      }, {
        id             : 'uis',
        enName         : 'ISA (Irrigation System Admin.)',
        ruName         : 'УИС (Управление ирригационной системы)',
        enNameShort    : 'ISA',
        ruNameShort    : 'УИС' ,
        enTooltip      : 'Available for Uzbekistan only',
        ruTooltip      : 'Доступно для Узбекистана только',         
        filter: 'buis'  ,
        items: false,
        glossary       : 'bme00057.htm'
      }, {
        id             : 'command',
        enName         : 'Channel Command Area',
        ruName         : 'Командная площадь',
        enNameShort    : 'Comm. Area',
        ruNameShort    : 'Comm. Area' ,
        enTooltip      : 'Available for Fergana valley only',
        ruTooltip      : 'Доступно только для Ферганской долины',        
        filter: 'oblast' ,
        tiled: true,
        items: false ,
        glossary       : 'bme00057.htm'
      },
     /* ]
  },

{
    id: 'natural',
    enName: 'Natural units',
    ruName: 'Еcтеcтвенные объекты',
    items: [
      {
        id             : 'segment',
        enName         : 'Elevation Zone',
        ruName         : 'Высота зоны',
        tiled          : true,
        isDefault      : true
      }, {
        id             : 'subbasin',
        enName         : 'River Subbasin',
        ruName         : 'Река подбассейна'
      }
    ]
  },*/

  {
    id: 'grid',
    enName: 'regular Raster',
    ruName: 'Регулярный растр',
    enNameShort    : 'reg. Raster',
    ruNameShort    : 'reg. Raster', 
    filter: 'oblast',     
    tiled: true,
    items: false,
    glossary       : 'bme00057.htm'
  }

];