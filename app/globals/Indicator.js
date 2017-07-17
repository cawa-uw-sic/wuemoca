/**
* @class __Indicator
* list of indicators with id, DB field, English and Russian names, short names, tooltips, units, settings of crops, 
* aggregation, years, legend, chart
*/
var __Indicator = [
  /**
  * @property fir_n
  * fir_n indicator
  */
  {
    id             : 'fir_n',
    field          : 'fir_n',
    enName         : 'Net irrigated area',
    ruName         : 'Орошаемая площадь нетто',
    enNameShort         : 'Net irrigated area',
    ruNameShort         : 'Орошаемая площадь нетто',
    enTooltip      : 'Averaged area equipped with irrigation infrastructure',
    ruTooltip      : 'Площадь оснащенная ирригационной инфраструктурой',
    enUnit         : 'ha',
    ruUnit         : 'га',
    crops          : false,
    aggregation    : 'all',
    enGroup: 'All aggregation levels',
    ruGroup: 'Все уровни агрегации',    
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'labeled',
    enLegend       : 'Irrigated area',
    ruLegend       : 'Поливная площадь',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : '#de2d26',
    decimals       : 0,
    up: true,
    glossary       : 'bme00073.htm#bookme_anchor14'
  }, 
  /**
  * @property firf
  * firf indicator
  */
  {
    id             : 'firf',
    field          : 'firf_{crop}',
    enName         : 'Irrigated acreage per crop',
    ruName         : 'Посевная орошаемая площадь',
    enNameShort    : 'Irrigated acreage',
    ruNameShort    : 'Посевная орошаемая площадь',
    enTooltip      : 'Crop-specific area under irrigation',
    ruTooltip      : 'Площадь активного орошаемых пахотных земель',    
    enUnit         : 'ha',
    ruUnit         : 'га',
    crops          : 'all',
    aggregation    : 'all',
    enGroup: 'All aggregation levels',
    ruGroup: 'Все уровни агрегации',    
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'labeled',
    chart: 'crops',
    enLegend: 'crops',
    ruLegend: 'crops',
    median         : 0,
    maximum        : 0,
    decimals       : 0,
        up: true,
    glossary       : 'bme00073.htm#bookme_anchor11'
  }, 
  /**
  * @property uir
  * uir indicator
  */
  {
    id             : 'uir',
    field          : 'uir_{crop}',
    enName         : 'Irrigated land use per crop',
    ruName         : 'Использование орошаемых земель под с/х культурами',
    enNameShort    : 'Irrigated land use',
    ruNameShort    : 'Использование орошаемых земель',
    enTooltip      : 'Crop-specific area share of actually irrigated areas',
    ruTooltip      : 'Используйте интенсивность по отношению к чистой орошаемой площади',       
    enUnit         : '%',
    ruUnit         : '%',
    crops          : 'all',    
    aggregation    : 'all',
    enGroup: 'All aggregation levels',
    ruGroup: 'Все уровни агрегации',    
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'colored',
    enLegend: 'crops',
    ruLegend: 'crops',
    median         : 0,
    maximum        : 0,   
    chart: 'crops', 
    decimals       : 1,
        up: true,
    glossary       : 'bme00073.htm#bookme_anchor12'
  }, 
  /**
  * @property pirf
  * pirf indicator
  */
  /*{
    id             : 'pirf',
    field          : 'pirf_{crop}',
    enName         : 'Farm gross output actual',
    ruName         : 'Фактическая валовая продукция',
    enNameShort         : 'Gross output',
    ruNameShort         : 'Валовая продукция ',
    enTooltip      : 'Crop quantities (harvests) produced',
    ruTooltip      : 'Урожай количество орошаемых земель',      
    enUnit         : 'tons',
    ruUnit         : 'тонны',
    crops          : ['cotton', 'wheat', 'rice'],
    aggregation    : 'all',
    enGroup: 'All aggregation levels',
    ruGroup: 'Все уровни агрегации',    
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'labeled',
    enLegend       : ['Cotton', 'Wheat', 'Rice'],
    ruLegend       : ['Хлопок', 'Пшеница', 'рис'],
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    decimals       : 0,
    glossary       : 'bme00073.htm#bookme_anchor10'
  }, */
  /**
  * @property y
  * y indicator
  */
  /*{
    id             : 'y',
    field          : 'y_{crop}',
    enName         : 'Yield',
    ruName         : 'Урожайность',
    enNameShort         : 'Yield',
    ruNameShort         : 'Урожайность',  
    enTooltip      : 'Crop production per hectare of harvested area',
    ruTooltip      : 'Урожайность орошаемых земель',       
    enUnit         : 't/ha',
    ruUnit         : 'т/га',
    crops          : ['cotton', 'wheat', 'rice'],
    aggregation    : 'all',
    enGroup: 'All aggregation levels',
    ruGroup: 'Все уровни агрегации',    
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'colored',
    enLegend       : ['Cotton', 'Wheat', 'Rice'],
    ruLegend       : ['Хлопок', 'Пшеница', 'рис'],
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    decimals       : 1,
    glossary       : 'bme00073.htm#bookme_anchor16'
   }, */
  /**
  * @property fp
  * fp indicator
  */
  {
    id             : 'fp',
    field          : 'fp',
    enName         : 'Temporary unused irrigable land',
    ruName         : 'Временно неиспользуемые орошаемые земли',
    enNameShort         : 'Fallow land',
    ruNameShort         : 'Временно неиспользуемые орошаемые земли',
    enTooltip      : 'Area share of fallow land in total net irrigated area',
    ruTooltip      : 'Неиспользование интенсивность по отношению к чистой орошаемой площади',     
    enUnit         : '%',
    ruUnit         : '%',
    crops          : false,
    aggregation    : 'all',
    enGroup: 'All aggregation levels',
    ruGroup: 'Все уровни агрегации',    
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'colored',
    enLegend       : 'Fallow land',
    ruLegend       : 'Площадь неисп. земель',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    color          : fp_color,
    decimals       : 1,
        up: true,
    glossary       : 'bme00073.htm#bookme_anchor15'
  }, 
  /**
  * @property cd
  * cd indicator
  */
  {
    id             : 'cd',
    field          : 'cd',
    enName         : 'Irrigated crop type diversity',
    ruName         : 'Разнообразие с/х культур',
    enNameShort         : 'Crop type diversity',
    ruNameShort         : 'Разнообразие с/х культур',
    enTooltip      : 'Variety of different crop types (Inverse Simpson Diversity Index)',
    ruTooltip      : 'Индекс различных типов культур соседних областей',       
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    enGroup: 'Regular Raster only',
    ruGroup: 'Только Регулярный растр',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'colored',
    enLegend       : 'Crop diversity index',
    ruLegend       : 'Индекс разнообразия сельскохозяйственных культур',
    median         : 0,
    maximum        : 0, 
    chart          : 'Line',
    color          : '#989800',
    decimals       : 2,
        up: true,
    glossary       : 'bme00073.htm#bookme_anchor7'
  }, 
  /**
  * @property mlu
  * mlu indicator
  */
  {
    id             : 'mlu',
    field          : 'mlu',
    enName         : 'Major land use',
    ruName         : 'Основные виды землепользования',
    enNameShort         : 'Major land use',
    ruNameShort         : 'Основные виды землепользования', 
    enTooltip      : 'Predominant land use based on average frequency',
    ruTooltip      : 'Преобладающий тип культур в течение всего периода исследования',     
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    enGroup: 'Regular Raster only',
    ruGroup: 'Только Регулярный растр',
    years          : false,
    yearsPrefix    : true,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'colored',
    enLegend       : 'Predominant crop type',
    ruLegend       : 'Преобладающий тип урожая',
    croplist       : ['cotton', 'wheat', 'rice', 'fallow', 'double', 'alfa', 'orchard', 'garden', 'other'],
    enCropNames    : ['Cotton', 'Wheat', 'Rice', 'Fallow land', 'Wheat/Other crop', 'Alfalfa', 'Orchard/Vineyard', 
                    'Urban Garden', 'Other crop'],
    ruCropNames    : ['хлопок', 'пшеница', 'рис', 'Неиспользуемые земли', 'пшеница/другая культура', 'люцерна', 
                    'фруктовый сад/Виноградник', 'Городской сад', 'другая культура'],
    chart          : 'Multiannual',
    exportUserPolygon: true,
        up: false,
    glossary       : 'bme00073.htm#bookme_anchor13'
  }, 
  /**
  * @property cr
  * cr indicator
  */
  {
    id             : 'cr',
    field          : 'cr',
    enName         : 'Crop rotation',
    ruName         : 'Севооборот',
    enNameShort         : 'Crop rotation',
    ruNameShort         : 'Севооборот',
    enTooltip      : 'Average number of crop type alternations',
    ruTooltip      : 'Среднее количество изменения типов культур в течение всего периода исследования',       
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    enGroup: 'Regular Raster only',
    ruGroup: 'Только Регулярный растр',
    years          : false,
    yearsPrefix    : true,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'colored',
    enLegend       : 'Number of crop types',
    ruLegend       : 'Количество типов культур',
    median         : 0,
    maximum        : 0,
    chart          : 'Multiannual',
    exportUserPolygon: false,
    legendcolors   : [cr_dark, cr_color, cr_bright],
    decimals       : 1,  
        up: false,  
    glossary       : 'bme00073.htm#bookme_anchor8'
  }, 
  /**
  * @property flf
  * flf indicator
  */
  {
    id             : 'flf',
    field          : 'flf',
    enName         : 'Fallow land frequency',
    ruName         : 'Частота неисп.земель',
    enNameShort    : 'Fallow land frequency',
    ruNameShort    : 'Частота неиспользования земель',
    enTooltip      : 'Average number of years that land was not cultivated',
    ruTooltip      : 'Среднее количество неиспользования земель в годах, в течение всего периода исследования',
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    enGroup: 'Regular Raster only',
    ruGroup: 'Только Регулярный растр',
    years          : false,
    yearsPrefix    : true,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'colored',
    enLegend       : 'Years of fallow',
    ruLegend       : 'Годы залежные',
    median         : 0,
    maximum        : 0,
    chart          : 'Multiannual',
    exportUserPolygon: false,
    legendcolors   : [flf_bright, flf_color, flf_dark],
    decimals       : 1,  
        up: false,    
    glossary       : 'bme00073.htm#bookme_anchor9'
  },
  /**
  * @property v_water
  * v_water indicator
  */
  {
    id             : 'v_water',
    field          : 'v_water',
    enName         : 'Available Water Supply Index',
    ruName         : 'Водообеспеченность орошаемых земель',
    enNameShort    : 'Water Supply Index',
    ruNameShort    : 'водоснабжение', 
    enTooltip      : 'Index of available water delivery',
    ruTooltip      : 'Водообеспеченность орошаемых земель',     
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['rayon', 'oblast'],
    enGroup        : 'District/Province only',
    ruGroup        : 'District/Province only',    
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'colored',
    enLegend       : 'Water Supply Index',
    ruLegend       : 'водоснабжение',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : '#081d58',
    decimals       : 2,
        up: false,
    glossary       : 'bme00073.htm#bookme_anchor16'
   },  
     /**
  * @property vir
  * vir indicator
  */
 {
    id             : 'vir',
    field          : 'vir',
    enName         : 'Irrigation Effectiveness Index',
    ruName         : 'Индекс эффективности ирригации',
    enNameShort    : 'Irrigation Effectiveness',
    ruNameShort    : 'Эффективность ирригации',  
    enTooltip      : 'Index of amount of water losses',
    ruTooltip      : 'Индекс количества потерь воды',
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['oblast'],
    enGroup        : 'Province only',
    ruGroup        : 'Province only',    
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'colored',
    enLegend       : 'Irrigation Effectiveness Index annual',
    ruLegend       : 'Индекс эффективности ирригации',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : '#2c7fb8',
    decimals       : 2,
        up: true,
    glossary       : 'bme00073.htm#bookme_anchor16'
   },
     /**
  * @property y
  * y indicator
  */
 /* {
    id             : 'e_prod',
    field          : 'e_prod',
    enName         : 'Water Productivity',
    ruName         : 'продуктивность воды',
    enNameShort         : 'Water Productivity',
    ruNameShort         : 'продуктивность воды',
    enTooltip      : 'Output (money) in relation to input (water)',
    ruTooltip      : 'Выход (деньги) по отношению к входным (водным)',
    enUnit         : '$/m³',
    ruUnit         : '$/m³',
    crops          : false,
    aggregation    : 'all',
    enGroup: 'All aggregation levels',
    ruGroup: 'Все уровни агрегации',    
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'colored',
    enLegend       : 'Water Productivity',
    ruLegend       : 'продуктивность воды',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    decimals       : 1,
    glossary       : 'bme00073.htm#bookme_anchor16'
   }, */
     /**
  * @property y
  * y indicator
  */
  {
    id             : 'etf',
    field          : 'etf',
    enName         : 'Actual Evapotranspiration',
    ruName         : 'Фактическая эвапотранспирация',
    enNameShort         : 'Evapotranspiration',
    ruNameShort         : 'эвапотранспирация',
    enTooltip      : 'Amount of water lost from the irrigated surface within one year',
    ruTooltip      : 'Количество воды, потерянной с орошаемой поверхности в течение одного года',
    enUnit         : 'mm',
    ruUnit         : 'мм',
    crops          : false,
    aggregation    : 'all',
    enGroup: 'All aggregation levels',
    ruGroup: 'Все уровни агрегации',    
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'colored',
    enLegend       : 'Actual Evapotranspiration annual',
    ruLegend       : 'Фактическая эвапотранспирация',
    median         : 556,
    maximum        : 1705,
    chart          : 'Defaults',
    decimals       : 0,
        up: true,
    glossary       : 'bme00073.htm#bookme_anchor16'
   }
];
var __Indicator_userPolygon = [
  /**
  * @property y
  * y indicator
  */
   {
    id             : 'etf_mX',
    field          : 'etf_mX',
    enName         : 'Actual Evapotranspiration monthly',
    ruName         : 'Фактическая эвапотранспирация',
    enNameShort         : 'Evapotranspiration monthly',
    ruNameShort         : 'эвапотранспирация',
    enTooltip      : 'Amount of water lost from the irrigated surface per month of vegetation period (March-Oct)',
    ruTooltip      : 'Количество воды, потерянной с орошаемой поверхности в течение одного года',
    enUnit         : 'mm',
    ruUnit         : 'мм',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
    yearsPrefix    : false,
    chart          : false,
    decimals       : 0,
    glossary       : 'bme00073.htm#bookme_anchor16'
   } ,
      {
    id             : 'etf_mX_1/2/3',
    field          : 'etf_mX_1/2/3',
    enName         : 'Actual Evapotranspiration decadal',
    ruName         : 'Фактическая эвапотранспирация',
    enNameShort         : 'Evapotranspiration decadal',
    ruNameShort         : 'эвапотранспирация',
    enTooltip      : 'Amount of water lost from the irrigated surface within per decade of month',
    ruTooltip      : 'Количество воды, потерянной с орошаемой поверхности в течение одного года',
    enUnit         : 'mm',
    ruUnit         : 'мм',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
    yearsPrefix    : false,
    chart          : false,
    decimals       : 0,
    glossary       : 'bme00073.htm#bookme_anchor16'
   } ,
 
        /**
  * @property vir
  * vir indicator
  */
 {
    id             : 'vir_mX',
    field          : 'vir_mX',
    enName         : 'Irrigation Effectiveness Index monthly',
    ruName         : 'Индекс эффективности ирригации',
    enNameShort    : 'Irrigation Effectiveness monthly',
    ruNameShort    : 'Эффективность ирригации',  
    enTooltip      : 'Index of amount of water losses per month of vegetation period (March-Oct)',
    ruTooltip      : 'Индекс количества потерь воды',
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
    yearsPrefix    : false,
    chart          : false,
    decimals       : 2,
    glossary       : 'bme00073.htm#bookme_anchor16'
   },
    {
    id             : 'vir_mX_1/2/3',
    field          : 'vir_mX_1/2/3',
    enName         : 'Irrigation Effectiveness Index decadal',
    ruName         : 'Индекс эффективности ирригации',
    enNameShort    : 'Irrigation Effectiveness decadal',
    ruNameShort    : 'Эффективность ирригации',  
    enTooltip      : 'Index of amount of water losses per decade of month',
    ruTooltip      : 'Индекс количества потерь воды',
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
    yearsPrefix    : false,
    chart          : false,
    decimals       : 2,
    glossary       : 'bme00073.htm#bookme_anchor16'
   },
           /**
  * @property vir
  * vir indicator
  */
 {
    id             : 'wf',
    field          : 'wf',
    enName         : 'Water intake',
    ruName         : 'Индекс эффективности ирригации',
    enNameShort    : 'Water intake',
    ruNameShort    : 'Эффективность ирригации',  
    enTooltip      : 'Water intake',
    ruTooltip      : 'Индекс количества потерь воды',
    enUnit         : 'Mio. m³',
    ruUnit         : '',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
    yearsPrefix    : false,
    chart          : false,
    decimals       : 2,
    glossary       : 'bme00073.htm#bookme_anchor16'
   },
           /**
  * @property vir
  * vir indicator
  */
 {
    id             : 'wf_mX',
    field          : 'wf_mX',
    enName         : 'Water intake monthly',
    ruName         : 'Индекс эффективности ирригации',
    enNameShort    : 'Water intake monthly',
    ruNameShort    : 'Эффективность ирригации',  
    enTooltip      : 'Water intake per month of vegetation period (March-Oct)',
    ruTooltip      : 'Индекс количества потерь воды',
    enUnit         : 'Mio. m³',
    ruUnit         : '',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
    yearsPrefix    : false,
    chart          : false,
    decimals       : 2,
    glossary       : 'bme00073.htm#bookme_anchor16'
   },
    {
    id             : 'wf_mX_1/2/3',
    field          : 'wf_mX_1/2/3',
    enName         : 'Water intake decadal',
    ruName         : 'Индекс эффективности ирригации',
    enNameShort    : 'Water intake decadal',
    ruNameShort    : 'Эффективность ирригации',  
    enTooltip      : 'Water intake per decade of month',
    ruTooltip      : 'Индекс количества потерь воды',
    enUnit         : 'Mio. m³',
    ruUnit         : '',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
    yearsPrefix    : false,
    chart          : false,
    decimals       : 2,
    glossary       : 'bme00073.htm#bookme_anchor16'
   }
];
