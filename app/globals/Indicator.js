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
{
    id             : 'eprod',
    field          : 'eprod',
    enName         : 'Water Productivity',
    ruName         : 'продуктивность воды',
    enTooltip      : 'Economic revenue per unit of water used (considering cotton, rice and wheat harvest)',
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
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
},
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
   },


{
    id             : 'prod_$',
    field          : 'prod_$_{crop}',
    enName         : 'Productivity',
    ruName         : 'Продуктивность',
    enTooltip      : 'Productivity in $, G2=G1*price($/tons)',
    ruTooltip      : 'Продуктивность в $, G2=G1*price($/tons)',
    enUnit         : '$',
    ruUnit         : '$',
    crops          : 'all',
    aggregation    : 'all',
    enGroup        : 'Productivity',
    ruGroup        : 'Продуктивность',
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Productivity $',
    ruLegend       : 'Продуктивность $',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    color          : '#006837',
    decimals       : 1,
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
},
{
    id             : 'prod_tm3',
    field          : 'prod_tm3_{crop}',
    enName         : 'Water productivity',
    ruName         : 'Продуктивность воды',
    enTooltip      : 'Water productivity in kg/m3, Pw1=G1/Wy(m3)',
    ruTooltip      : 'Продуктивность воды в кг/м3, Pw1=G1/Wy(m3)',
    enUnit         : 'kg/m3',
    ruUnit         : 'кг/м3',
    crops          : 'all',
    aggregation    : 'all',
    enGroup        : 'Productivity',
    ruGroup        : 'Продуктивность',
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Water productivity kg/m3',
    ruLegend       : 'Продуктивность воды кг/м3',
    median         : 0,
    maximum        : 1,
    chart          : 'Defaults',
    color          : '#006837',
    decimals       : 1,
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
},
{
    id             : 'prod_$m3',
    field          : 'prod_$m3_{crop}',
    enName         : 'Water productivity',
    ruName         : 'Продуктивность воды',
    enTooltip      : 'Water productivity in $/m3, Pw2=G2/Wy(m3)',
    ruTooltip      : 'Продуктивность воды в $/м3, Pw2=G2/Wy(m3)',
    enUnit         : '$/m3',
    ruUnit         : '$/м3',
    crops          : 'all',
    aggregation    : 'all',
    enGroup        : 'Productivity',
    ruGroup        : 'Продуктивность',
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Water productivity $/m3',
    ruLegend       : 'Продуктивность воды $/м3',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    color          : '#006837',
    decimals       : 1,
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
},
/*{
    id             : 'prod_tha',
    field          : 'prod_tha_{crop}',
    enName         : 'Land productivity',
    ruName         : 'Продуктивность земли',
    enTooltip      : 'Land productivity in tons/ha, Pg1=G1/N',
    ruTooltip      : 'Продуктивность земли в тонны/га, Pg1=G1/N',
    enUnit         : 'tons/ha',
    ruUnit         : 'тонны/га',
    crops          : 'all',
    aggregation    : 'all',
    enGroup        : 'Productivity',
    ruGroup        : 'Продуктивность',
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Land productivity in tons/ha',
    ruLegend       : 'Продуктивность земли в тонны/га',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    color          : '#006837',
    decimals       : 1,
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
},*/
{
    id             : 'prod_$ha',
    field          : 'prod_$ha_{crop}',
    enName         : 'Land productivity',
    ruName         : 'Продуктивность земли',
    enTooltip      : 'Land productivity in $/ha, Pg2=G2/N',
    ruTooltip      : 'Продуктивность земли в $/га, Pg2=G2/N',
    enUnit         : '$/ha',
    ruUnit         : '$/га',
    crops          : 'all',
    aggregation    : 'all',
    enGroup        : 'Productivity',
    ruGroup        : 'Продуктивность',
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Land productivity in $/ha',
    ruLegend       : 'Продуктивность земли в $/га',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    color          : '#006837',
    decimals       : 1,
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
},
{
    id             : 'prod_$ha_avg',
    field          : 'prod_$ha_avg',
    enName         : 'Land productivity average',
    ruName         : 'Средне взвешенная продуктивность земли',
    enTooltip      : 'Land productivity average in $/ha',
    ruTooltip      : 'Средне взвешенная продуктивность земли в $/га',
    enUnit         : '$/ha',
    ruUnit         : '$/га',
    crops          : false,
    aggregation    : 'all',
    enGroup        : 'Productivity',
    ruGroup        : 'Продуктивность',
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Land productivity average in $/ha',
    ruLegend       : 'Средне взвешенная продуктивность земли в $/га',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    color          : '#006837',
    decimals       : 1,
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
},
{
    id             : 'prod_$m3_avg',
    field          : 'prod_$m3_avg',
    enName         : 'Water productivity average',
    ruName         : 'Средне взвешенная продуктивность воды',
    enTooltip      : 'Water productivity average in $/m3',
    ruTooltip      : 'Средне взвешенная продуктивность воды в $/м3',
    enUnit         : '$/m3',
    ruUnit         : '$/м3',
    crops          : false,
    aggregation    : 'all',
    enGroup        : 'Productivity',
    ruGroup        : 'Продуктивность',
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Water productivity average in $/m3',
    ruLegend       : 'Средне взвешенная продуктивность воды в $/м3',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    color          : '#006837',
    decimals       : 1,
    up             : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
},
{
    id             : 'prod_wf',
    field          : 'prod_wf',
    enName         : 'Specific water supply',
    ruName         : 'Удельная водоподача',
    enTooltip      : 'Specific water supply in m3/ha',
    ruTooltip      : 'Удельная водоподача в м3/га',
    enUnit         : 'm3/ha',
    ruUnit         : 'м3/га',
    crops          : false,
    aggregation    : 'all',
    enGroup        : 'Productivity',
    ruGroup        : 'Продуктивность',
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Specific water supply in m3/ha',
    ruLegend       : 'Удельная водоподача в м3/га',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    color          : '#006837',
    decimals       : 1,
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
