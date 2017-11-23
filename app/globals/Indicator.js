/**
* @class __Indicator
* list of indicators with id, DB field, English and Russian names, short names, tooltips, units, settings of crops, 
* aggregation, years, legend, chart
*/
var __Indicator = [
  /**
  * @property firn
  * firn indicator
  */
  {
    id             : 'firn',
    field          : 'firn',
    enName         : 'Net irrigated area',
    ruName         : 'Орошаемая площадь',
    enTooltip      : 'Averaged area equipped with irrigation infrastructure',
    ruTooltip      : 'Площадь оснащенная ирригационной инфраструктурой',
    enUnit         : 'ha',
    ruUnit         : 'га',
    crops          : false,
    aggregation    : 'all',
    enGroup        : 'Land use',
    ruGroup        : 'Землепользование',    
    years          : 'all',
    mapType        : 'labeled',
    enLegend       : 'Irrigated area',
    ruLegend       : 'Поливная площадь',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : firn_color,
    decimals       : 0,
    up             : true,
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
    ruName         : 'Доля с/х культур в площади орошения',
    enNameShort    : 'Irrigated acreage',
    ruNameShort    : 'Орошаемые площади',
    enTooltip      : 'Crop-specific area under irrigation',
    ruTooltip      : 'Долевое соотношение с/х культур в общей площади орошаемого земледелия',    
    enUnit         : 'ha',
    ruUnit         : 'га',
    crops          : 'all',
    aggregation    : 'all',
    enGroup        : 'Land use',
    ruGroup        : 'Землепользование',    
    years          : 'all',
    mapType        : 'labeled',
    chart          : 'crops',
    enLegend       : 'crops',
    ruLegend       : 'crops',
    median         : 0,
    maximum        : 0,
    decimals       : 0,
    up             : true,
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
    ruName         : 'Доля с/х культур в орошаемом землепользовании',
    enNameShort    : 'Irrigated land use',
    ruNameShort    : 'Использование орошаемых земель',
    enTooltip      : 'Crop-specific area share of actually irrigated land',
    ruTooltip      : 'Долевое соотношение с/х культур в орошаемом земледелии',       
    enUnit         : '%',
    ruUnit         : '%',
    crops          : 'all',    
    aggregation    : 'all',
    enGroup        : 'Land use',
    ruGroup        : 'Землепользование',    
    years          : 'all',
	mapType        : 'colored',
    enLegend       : 'crops',
    ruLegend       : 'crops',
    median         : 0,
    maximum        : 0,   
    chart          : 'crops', 
    decimals       : 1,
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor12'
  }, 
  /**
  * @property pirf
  * pirf indicator
  */
  {
    id             : 'pirf',
    field          : 'pirf_{crop}',
    enName         : 'Farm gross output actual',
    ruName         : 'Фактическая валовая продукция',
    enTooltip      : 'Actual crop harvest quantities produced',
    ruTooltip      : 'Общий объем продукции',      
    enUnit         : 'tons',
    ruUnit         : 'тонны',
    crops          : ['cotton', 'wheat', 'rice'],
    aggregation    : 'all',
    enGroup        : 'Productivity',
    ruGroup        : 'Продуктивность урожая',    
    years          : 'all',
    mapType        : 'labeled',
    enLegend       : ['Cotton', 'Wheat', 'Rice'],
    ruLegend       : ['Хлопок', 'Пшеница', 'рис'],
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    decimals       : 0,
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor10'
  }, 
  /**
  * @property yf
  * yf indicator
  */
  {
    id             : 'yf',
    field          : 'yf_{crop}',
    enName         : 'Crop yield',
    ruName         : 'Урожайность',
    enTooltip      : 'Actual crop production per unit of harvested area',
    ruTooltip      : 'Урожайность орошаемых земель',       
    enUnit         : 't/ha',
    ruUnit         : 'т/га',
    crops          : ['cotton', 'wheat', 'rice'],
    aggregation    : 'all',
    enGroup        : 'Productivity',
    ruGroup        : 'Продуктивность урожая',       
    years          : 'all',
    mapType        : 'colored',
    enLegend       : ['Cotton', 'Wheat', 'Rice'],
    ruLegend       : ['Хлопок', 'Пшеница', 'рис'],
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    decimals       : 1,
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
   }, 
  /**
  * @property fp
  * fp indicator
  */
  {
    id             : 'fp',
    field          : 'fp',
    enName         : 'Temporarily unused irrigable land',
    ruName         : 'Временно неиспользуемые орошаемые земли',
    enNameShort    : 'Fallow land',
    ruNameShort    : 'Временно неиспользуемые орошаемые земли',
    enTooltip      : 'Area share of fallow land in total net irrigated area',
    ruTooltip      : 'Доля паров в общей площади орошаемой земли',     
    enUnit         : '%',
    ruUnit         : '%',
    crops          : false,
    aggregation    : 'all',
    enGroup        : 'Land use',
    ruGroup        : 'Землепользование',    
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Fallow land',
    ruLegend       : 'Площадь неисп. земель',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    color          : fp_color,
    decimals       : 1,
    up             : true,
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
    enTooltip      : 'Variety of different crop types (spatially)',
    ruTooltip      : 'Вариативность различных видов сельхоз культур (Обратный индекс разнообразия Симпсона)',       
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    crops          : false,
    aggregation    : 'all',
    enGroup        : 'Land use',
    ruGroup        : 'Землепользование',    
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Crop type diversity',
    ruLegend       : 'Индекс разнообразия сельскохозяйственных культур',
    median         : 0,
    maximum        : 0, 
    chart          : 'Line',
    color          : cd_color,
    decimals       : 2,
    up             : true,
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
    enTooltip      : 'Predominant land use based on average frequency',
    ruTooltip      : 'Преобладающий тип культур в течение всего периода исследования',     
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    enGroup        : 'Multi-annual, regular Raster only',
    ruGroup        : 'Многолетняя, только Регулярный растр',
    years          : false,
    mapType        : 'colored',
    enLegend       : 'Predominant land use',
    ruLegend       : 'Преобладающий тип урожая',
    croplist       : ['cotton', 'wheat', 'rice', 'fallow', 'double', 'alfa', 'orchard', 'garden', 'other'],
    enCropNames    : ['Cotton', 'Wheat', 'Rice', 'Fallow land', 'Wheat/Other crop', 'Alfalfa', 'Orchard/Vineyard', 
                    'Urban Garden', 'Other crop'],
    ruCropNames    : ['хлопок', 'пшеница', 'рис', 'Неиспользуемые земли', 'пшеница/другая культура', 'люцерна', 
                    'фруктовый сад/Виноградник', 'Городской сад', 'другая культура'],
    chart          : 'Multiannual',
    up             : false,
    glossary       : 'bme00073.htm#bookme_anchor13'
  }, 
  /**
  * @property lur
  * lur indicator
  */
  {
    id             : 'lur',
    field          : 'lur',
    enName         : 'Land use rotation',
    ruName         : 'Севооборот',
    enTooltip      : 'Average number of land use types including double usage and fallow land',
    ruTooltip      : 'Среднее количество изменения типов культур в течение всего периода исследования',       
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    enGroup        : 'Multi-annual, regular Raster only',
    ruGroup        : 'Многолетняя, только Регулярный растр',
    years          : false,
    mapType        : 'colored',
    enLegend       : 'Number of land use types',
    ruLegend       : 'Количество типов культур',
    median         : 0,
    maximum        : 0,
    minimum        : 1,
    chart          : 'Multiannual',
    legendcolors   : [lur_dark, lur_color, lur_bright],
    decimals       : 1,  
    up             : false,  
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
    enTooltip      : 'Average number of years in which land was not cultivated',
    ruTooltip      : 'Среднее количество неиспользования земель в годах, в течение всего периода исследования',
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    enGroup        : 'Multi-annual, regular Raster only',
    ruGroup        : 'Многолетняя, только Регулярный растр',
    years          : false,
    mapType        : 'colored',
    enLegend       : 'Years of fallow',
    ruLegend       : 'Годы залежные',
    median         : 0,
    maximum        : 0,
    chart          : 'Multiannual',
    legendcolors   : [flf_bright, flf_color, flf_dark],
    decimals       : 1,  
    up             : false,    
    glossary       : 'bme00073.htm#bookme_anchor9'
  },
  /**
  * @property v_water
  * v_water indicator
  */
  {
    id             : 'vet',
    field          : 'vet',
    enName         : 'Available Water for irrigated land',
    ruName         : 'Индекс водообеспоченности',
    enNameShort    : 'Available Water',
    ruNameShort    : 'водоснабжение', 
    enTooltip      : 'Ratio of actual to potential evapotranspiration',
    ruTooltip      : 'Соотношение фактической эвапотранспирации с потребностью в воде',     
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    crops          : false,
    aggregation    : 'all',
    enGroup        : 'Water use efficiency',
    ruGroup        : 'Эффективность использования воды',     
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Available Water',
    ruLegend       : 'Общее водоснабжение',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    decimals       : 2,
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
   },  
  /**
  * @property v_water
  * v_water indicator
  */
  {
    id             : 'vc',
    field          : 'vc_{crop}',
    enName         : 'Available Water per crop',
    ruName         : 'Индекс водообеспоченности',
    enNameShort    : 'Available Water',
    ruNameShort    : 'водоснабжение', 
    enTooltip      : 'Ratio of actual evapotranspiration to crop water demand',
    ruTooltip      : 'Соотношение фактической эвапотранспирации с потребностью в воде',     
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    crops          : ['cotton', 'wheat', 'rice'],
    aggregation    : 'all',
    enGroup        : 'Water use efficiency',
    ruGroup        : 'Эффективность использования воды',     
    years          : 'all',
    mapType        : 'colored',
    enLegend       : ['Cotton', 'Wheat', 'Rice'],
    ruLegend       : ['Хлопок', 'Пшеница', 'рис'],
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    decimals       : 2,
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
   },   
     /**
  * @property vir
  * vir indicator
  */
 {
    id             : 'vir',
    field          : 'vir',
    enName         : 'Irrigation efficiency',
    ruName         : 'Индекс эффективности ирригации',
    enTooltip      : 'Efficiency in delivering water beneficially used to produce crop',
    ruTooltip      : 'Индекс количества потерь воды',
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    crops          : false,
    aggregation    : ['oblast', 'rayon'],
    enGroup        : 'Water use efficiency',
    ruGroup        : 'Эффективность использования воды',    
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Irrigation efficiency',
    ruLegend       : 'Индекс эффективности ирригации',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : vir_color,
    decimals       : 2,
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
   },
     /**
  * @property eprod
  * eprod indicator
  */
/*{
    id             : 'eprod',
    field          : 'eprod',
    enName         : 'Water Productivity',
    ruName         : 'продуктивность воды',
    enTooltip      : 'Economic revenue per unit of water used (considering cotton, rice and wheat)',
    ruTooltip      : 'Выход (деньги) по отношению к входным (водным)',
    enUnit         : '$/m³',
    ruUnit         : '$/m³',
    crops          : false,
    aggregation    : 'all',
    enGroup        : 'Water use efficiency',
    ruGroup        : 'Эффективность использования воды', 
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Water Productivity',
    ruLegend       : 'продуктивность воды',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : '#006837',
    decimals       : 1,
    up             : false,    
    glossary       : 'bme00073.htm#bookme_anchor16'
},*/ 

     /**
  * @property etf
  * etf indicator
  */
  {
    id             : 'etf',
    field          : 'etf',
    enName         : 'Actual evapotranspiration',
    ruName         : 'Фактическая эвапотранспирация',
    enTooltip      : 'Actual quantity of water lost by evaporation and transpiration during the vegetation period',
    ruTooltip      : 'Фактическое количество воды, теряемой при испарении и транспирации',
    enUnit         : 'mm',
    ruUnit         : 'мм',
    crops          : false,
    aggregation    : 'all',
    enGroup        : 'Water use efficiency',
    ruGroup        : 'Эффективность использования воды',    
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Actual Evapotranspiration',
    ruLegend       : 'Фактическая эвапотранспирация',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    decimals       : 0,
    up             : true,
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
    enName         : 'Actual monthly evapotranspiration',
    ruName         : 'Фактическая эвапотранспирация',
    enNameShort    : 'Evapotranspiration monthly',
    ruNameShort    : 'эвапотранспирация',
    enTooltip      : 'Actual quantity of water lost by evaporation and transpiration per month of vegetation ' +
    'period (March-Oct)',
    ruTooltip      : 'Количество воды, потерянной с орошаемой поверхности в течение одного года',
    enUnit         : 'mm',
    ruUnit         : 'мм',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
    chart          : false,
    decimals       : 0,
    glossary       : 'bme00073.htm#bookme_anchor16'
   } ,
      {
    id             : 'etf_mX_1/2/3',
    field          : 'etf_mX_1/2/3',
    enName         : 'Actual decadal evapotranspiration',
    ruName         : 'Фактическая эвапотранспирация',
    enNameShort    : 'Evapotranspiration decadal',
    ruNameShort    : 'эвапотранспирация',
    enTooltip      : 'Actual quantity of water lost by evaporation and transpiration per decade of month',
    ruTooltip      : 'Количество воды, потерянной с орошаемой поверхности в течение одного года',
    enUnit         : 'mm',
    ruUnit         : 'мм',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
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
    enName         : 'Irrigation efficiency monthly',
    ruName         : 'Индекс эффективности ирригации',
    enNameShort    : 'Irrigation Effectiveness monthly',
    ruNameShort    : 'Эффективность ирригации',  
    enTooltip      : 'Efficiency in delivering water beneficially used to produce crop per month of vegetation ' +
    'period (March-Oct)',
    ruTooltip      : 'Индекс количества потерь воды',
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
    chart          : false,
    decimals       : 2,
    glossary       : 'bme00073.htm#bookme_anchor16'
   },
    {
    id             : 'vir_mX_1/2/3',
    field          : 'vir_mX_1/2/3',
    enName         : 'Irrigation efficiency decadal',
    ruName         : 'Индекс эффективности ирригации',
    enNameShort    : 'Irrigation Effectiveness decadal',
    ruNameShort    : 'Эффективность ирригации',  
    enTooltip      : 'Efficiency in delivering water beneficially used to produce crop per decade of month',
    ruTooltip      : 'Индекс количества потерь воды',
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
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
    enName         : 'Water intake seasonal',
    ruName         : 'Индекс эффективности ирригации',
    enNameShort    : 'Water intake',
    ruNameShort    : 'Эффективность ирригации',  
    enTooltip      : 'Water intake',
    ruTooltip      : 'Индекс количества потерь воды',
    enUnit         : 'Mio. m³',
    ruUnit         : 'Млн. М³',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
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
    ruUnit         : 'Млн. М³',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
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
    ruUnit         : 'Млн. М³',
    crops          : false,
    aggregation    : 'userPolygon',
    years          : 'all',
    chart          : false,
    decimals       : 2,
    glossary       : 'bme00073.htm#bookme_anchor16'
   }
];
