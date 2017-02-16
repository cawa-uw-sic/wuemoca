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
        enTooltip      : 'Available for Aral Sea Basin',
        ruTooltip      : 'Доступно для бассейна Аральского моря',
        filter: 'oblast' ,
        isDefault      : true,
        items: false,
        glossary       : 'bme00017.htm'
      }, {
        id             : 'rayon',
        enName         : 'District (Rayon)',
        ruName         : 'Район',
        enNameShort    : 'District',
        ruNameShort    : 'Район',
        enTooltip      : 'Available for Aral Sea Basin',
        ruTooltip      : 'Доступно для бассейна Аральского моря',
        filter: 'oblast' ,
        items: false,
        glossary       : 'bme00017.htm'
      }, {
        id             : 'wua',
        enName         : 'WUA (Water User Association)',
        ruName         : 'АВП (Ассоциация водопользователей)',
        enNameShort    : 'WUA',
        ruNameShort    : 'АВП' ,
        enTooltip      : 'Available for Fergana and Khorezm provinces only',
        ruTooltip      : 'Доступно только для Ферганской и Хорезмской областей',
        filter: 'oblast' ,
        aoi_filter: [
            "oblast_id=1730",
            "oblast_id=1733"/*,
            "country_id='UZB'"*/
        ],
        tiled: true,
        items: false,
        glossary       : 'bme00017.htm'
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
        ruName         : 'БУИС (Бассейновое Управление Ирригационных Систем)',
        enNameShort    : 'BISA',
        ruNameShort    : 'БУИС',
        enTooltip      : 'Available for Uzbekistan only',
        ruTooltip      : 'Доступно для Узбекистана только',
        filter: 'buis',
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
        items: false,
        glossary       : 'bme00017.htm'
      }, {
        id             : 'uis',
        enName         : 'ISA (Irrigation System Admin.)',
        ruName         : 'УИС (Управление Ирригационных Систем)',
        enNameShort    : 'ISA',
        ruNameShort    : 'УИС' ,
        enTooltip      : 'Available for Uzbekistan only',
        ruTooltip      : 'Доступно для Узбекистана только',
        filter: 'buis' ,
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
        items: false,
        glossary       : 'bme00017.htm'
      }, {
        /* id             : 'uis_rayon',
        enName         : 'District fractions of ISA',
        ruName         : 'Район фракции УИС',
        enNameShort    : 'Districts of ISA',
        ruNameShort    : 'Районы УИС' ,
        enTooltip      : 'Available for Uzbekistan only',
        ruTooltip      : 'Доступно для Узбекистана только',
        filter: 'buis' ,
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
        items: false,
        glossary       : 'bme00017.htm'
      }, {*/
        id             : 'command',
        enName         : 'Channel Command Area',
        ruName         : 'Подкомандная зона канала',
        enNameShort    : 'Comm. Area',
        ruNameShort    : 'Подкомандная зона канала' ,
        enTooltip      : 'Available for Fergana valley only',
        ruTooltip      : 'Доступно только для Ферганской долины',
        filter: 'oblast' ,
        aoi_filter: [
           /* "country_id='UZB'",
            "country_id='KGZ'",
            "country_id='TJK'",*/
            "oblast_id=1703",
            "oblast_id=1714",
            "oblast_id=1730",
            "oblast_id=3303",
            "oblast_id=3306",
            "oblast_id=3503"
        ],
        tiled: true,
        items: false ,
        glossary       : 'bme00017.htm'
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
         enTooltip      : 'Available for Aral Sea Basin',
        ruTooltip      : 'Доступно для бассейна Аральского моря',
    filter: 'oblast',
    tiled: true,
    items: false,
    glossary       : 'bme00017.htm'
  }

];