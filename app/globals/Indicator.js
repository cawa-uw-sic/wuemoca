/**
* @class __Indicator
* list of indicators with id, DB field, English and Russian names, short names, tooltips, units, settings of crops,
* aggregation, years, legend, chart
* used to fill the indicator drop down menu
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
    enTooltip      : 'Averaged area equipped with irrigation infrastructure (actual and potential irrigated cropland)',
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
    userDB         : true,
    serverDB       : true,
    glossary       : 'bme00073.htm#bookme_anchor14',
    prodform       :'2-noyears',
    enProdTooltip  :'changes affect all indicators based on net irrigated area',
    ruProdTooltip  :'changes affect all indicators based on net irrigated area'
  },   
  /**
  * @property firf
  * firf indicator
  */
  {
    id             : 'firf',
    field          : 'firf_{crop}',
    enName         : 'Crop acreage',
    ruName         : 'Доля с/х культур в площади орошения',
    enNameShort    : 'Acreage',
    ruNameShort    : 'Орошаемые площади',
    enTooltip      : 'Crop area under irrigation',
    ruTooltip      : 'Долевое соотношение с/х культур в общей площади орошаемого земледелия',
    enUnit         : 'ha',
    ruUnit         : 'га',
    crops          : 'sum',
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
    userDB         : true,
    serverDB       : true,
    glossary       : 'bme00073.htm#bookme_anchor11',
    prodform       :'1-years',
    enProdTooltip  :'changes affect all indicators based on crop acreage',
    ruProdTooltip  :'changes affect all indicators based on crop acreage'
  },
  /**
  * @property uir
  * uir indicator
  */
  {
    id             : 'uir',
    field          : 'uir_{crop}',
    enName         : 'Land use area',
    ruName         : 'Доля с/х культур в орошаемом землепользовании',
    enNameShort    : 'Land use area',
    ruNameShort    : 'Использование орошаемых земель',
    enTooltip      : 'Crop area share in total net irrigated area',
    ruTooltip      : 'Долевое соотношение с/х культур в орошаемом земледелии',
    enUnit         : '%',
    ruUnit         : '%',
    crops          : 'sum',
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
    userDB         : true,
    serverDB       : true,
    glossary       : 'bme00073.htm#bookme_anchor12'
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
    ruNameShort    : 'Площадь неисп. земель',
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
    userDB         : true,
    serverDB       : true,
    glossary       : 'bme00073.htm#bookme_anchor15'
  },
  /**
  * @property cd
  * cd indicator
  */
  {
    id             : 'cd',
    field          : 'cd',
    enName         : 'Crop type diversity',
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
    userDB         : true,
    serverDB       : true,
    glossary       : 'bme00073.htm#bookme_anchor7'
  },

  /**  
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
    enGroup        : 'Land use (multi-annual, raster only)',
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
    userDB         : false,
    serverDB       : true,
    glossary       : 'bme00073.htm#bookme_anchor9'
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
    enTooltip      : 'Average number of land use types including double season crop and fallow land',
    ruTooltip      : 'Среднее количество изменения типов культур в течение всего периода исследования',
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    enGroup        : 'Land use (multi-annual, raster only)',
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
    userDB         : false,
    serverDB       : true,
    glossary       : 'bme00073.htm#bookme_anchor8'
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
    enGroup        : 'Land use (multi-annual, raster only)',
    ruGroup        : 'Многолетняя, только Регулярный растр',
    years          : false,
    mapType        : 'colored',
    enLegend       : 'Major land use',
    ruLegend       : 'Основные виды землепользования',
    croplist       : ['cotton', 'wheat', 'rice', 'fallow', 'double', 'alfa', 'orchard', 'garden', 'other'],
    enCropNames    : ['Cotton', 'Wheat', 'Rice', 'Fallow land', 'Wheat/Other crop', 'Alfalfa', 'Orchard/Vineyard',
                    'Urban Garden', 'Other crop'],
    ruCropNames    : ['хлопок', 'пшеница', 'рис', 'Неиспользуемые земли', 'пшеница/другая культура', 'люцерна',
                    'фруктовый сад/Виноградник', 'Городской сад', 'другая культура'],
    chart          : 'Multiannual',
    userDB         : false,
    serverDB       : true,
    glossary       : 'bme00073.htm#bookme_anchor13'
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
    crops          : ['1', '2', '3'],
    crops_userDB   : 'all',
    aggregation    : 'all',
    enGroup        : 'Productivity',
    ruGroup        : 'Продуктивность',
    enGroup_userDB        : '<span style="color:#970016">Productivity (user input)</span>',
    ruGroup_userDB        : '<span style="color:#970016">Продуктивность (ввод пользователя)</span>',    
    years          : 'all',
    mapType        : 'labeled',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    decimals       : 0,
    userDB         : true,
    serverDB       : true,
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
    enTooltip      : 'Actual crop production per ha crop acreage',
    ruTooltip      : 'Урожайность орошаемых земель',
    enUnit         : 't/ha',
    ruUnit         : 'т/га',
    crops          : ['1', '2', '3'],
    crops_userDB   : 'all',
    aggregation    : 'all',
    enGroup        : 'Productivity',
    ruGroup        : 'Продуктивность',
    enGroup_userDB        : '<span style="color:#970016">Productivity (user input)</span>',
    ruGroup_userDB        : '<span style="color:#970016">Продуктивность (ввод пользователя)</span>',    
    years          : 'all',
    mapType        : 'colored',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    decimals       : 2,
    userDB         : true,
    serverDB       : true,
    glossary       : 'bme00073.htm#bookme_anchor16',
    prodform       :'1-years',
    enProdTooltip  :'changes affect gross output',
    ruProdTooltip  :'changes affect gross output'
   },  

{
    id             : 'prod_doll',
    field          : 'prod_doll_{crop}',
    enName         : 'Total productivity',
    ruName         : 'Общий Продуктивность',
    enTooltip      : 'Crop specific total economic revenue<br>Crop_gross_output * Crop_price',
    ruTooltip      : 'G2=G1*price($/tons)',
    enUnit         : '$',
    ruUnit         : '$',
    crops          : 'sum',
    aggregation    : 'all',
    enGroup        : '<span style="color:#970016">Productivity (user input)</span>',
    ruGroup       : '<span style="color:#970016">Продуктивность (ввод пользователя)</span>',
    years          : 'all',
    mapType        : 'labeled',
    median         : 0,
    maximum        : 0,
    chart          : 'crops',
    decimals       : 1,
    userDB         : true,
    serverDB       : false,
    glossary       : 'bme00073.htm#bookme_anchor16'
},
{
    id             : 'prod_dollha',
    field          : 'prod_dollha_{crop}',
    enName         : 'Productivity per hectare',
    ruName         : 'Продуктивность на гектар',
    enTooltip      : 'Crop specific economic revenue per ha<br>Crop_gross_output * Crop_price / Crop_acreage',
    ruTooltip      : 'Pg2=G2/N',
    enUnit         : '$/ha',
    ruUnit         : '$/га',
    crops          : 'avg',
    aggregation    : 'all',
    enGroup        : '<span style="color:#970016">Productivity (user input)</span>',
    ruGroup        : '<span style="color:#970016">Продуктивность (ввод пользователя)</span>',
    years          : 'all',
    mapType        : 'labeled',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    color          : '#006837',
    decimals       : 1,
    userDB         : true,
    serverDB       : false,
    glossary       : 'bme00073.htm#bookme_anchor16'
},
{
    id             : 'prod_kgm3',
    field          : 'prod_kgm3_{crop}',
    enName         : 'Quantity per water consumed',
    ruName         : 'Количество на потребляемую воду',
    enTooltip      : 'Crop specific harvest per m³ water consumed<br>Crop_gross_output / Crop_water_intake',
    ruTooltip      : 'Pw1=G1/Wy(m³)',
    enUnit         : 'kg/m³',
    ruUnit         : 'кг/м³',
    crops          : 'all',
    aggregation    : 'all',
    enGroup        : '<span style="color:#970016">Productivity (user input)</span>',
    ruGroup        : '<span style="color:#970016">Продуктивность (ввод пользователя)</span>',
    years          : 'all',
    mapType        : 'labeled',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : '#006837',
    decimals       : 2,
    userDB         : true,
    serverDB       : false,
    glossary       : 'bme00073.htm#bookme_anchor16'
},

{
    id             : 'prod_dollm3',
    field          : 'prod_dollm3_{crop}',
    enName         : 'Productivity per water consumed',
    ruName         : 'Продуктивность на потребляемую воду',
    enTooltip      : 'Crop specific economic revenue per m³ water consumed<br>Crop_gross_output * Crop_price / Crop_water_intake',
    ruTooltip      : 'Pw2=G2/Wy(m³)',
    enUnit         : '$/m³',
    ruUnit         : '$/м³',
    crops          : 'avg',
    aggregation    : 'all',
    enGroup        : '<span style="color:#970016">Productivity (user input)</span>',
    ruGroup        : '<span style="color:#970016">Продуктивность (ввод пользователя)</span>',
    years          : 'all',
    mapType        : 'labeled',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : '#006837',
    decimals       : 2,
    userDB         : true,
    serverDB       : false,
    glossary       : 'bme00073.htm#bookme_anchor16'
},
{
    id             : 'prod_wf_sum',
    field          : 'prod_wf_sum',
    enName         : 'Specific water supply',
    ruName         : 'Удельная водоподача',
    enTooltip      : 'Water intake + groundwater + rainfall per ha',
    ruTooltip      : 'Водоподача и Подпитка и Осадки на га',
    enUnit         : 'm³/ha',
    ruUnit         : 'м³/га',
    crops          : false,
    aggregation    : 'all',
    enGroup        : '<span style="color:#970016">Productivity (user input)</span>',
    ruGroup        : '<span style="color:#970016">Продуктивность (ввод пользователя)</span>',
    years          : 'all',
    mapType        : 'labeled',
    enLegend       : 'Specific water supply',
    ruLegend       : 'Удельная водоподача',
    median         : 0,
    maximum        : 0,
    chart          : 'Stacked_watersupply',
    enNames        : ['Water intake', 'Groundwater', 'Rainfall'],
    ruNames        : ['Водоподача', 'Подпитка', 'Осадки'],
    color          : '#006837',
    decimals       : 2,
    userDB         : true,
    serverDB       : false,
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
    enNameShort         : 'Irrigation efficiency',
    ruNameShort         : 'Индекс эффективности ирригации',    
    enTooltip      : 'Efficiency in delivering water to the plants and minimizing water losses<br>ET<sub>act</sub> / Water intake',
    ruTooltip      : 'Индекс количества потерь воды',
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    crops          : false,
    aggregation    : ['oblast', 'rayon'],
    enGroup        : 'Water use efficiency (ET)',
    ruGroup        : 'Эффективность использования воды',
    enGroup_userDB        : '<span style="color:#970016">Productivity (user input)</span>',
    ruGroup_userDB        : '<span style="color:#970016">Продуктивность (ввод пользователя)</span>',        
    years          : 'all',
    mapType        : 'colored',
    enLegend       : 'Irrigation efficiency',
    ruLegend       : 'Индекс эффективности ирригации',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : vir_color,
    decimals       : 2,
    userDB         : true,
    serverDB       : true,
    glossary       : 'bme00073.htm#bookme_anchor16'

   },
     /**
  * @property etf
  * etf indicator
  */
  {
    id             : 'etf',
    field          : 'etf_{crop}',
    enName         : 'Actual evapotranspiration',
    ruName         : 'Фактическая эвапотранспирация',
    enNameShort    : 'ET<sub>act</sub>',
    ruNameShort    : 'ET<sub>act</sub>',
    enTooltip      : 'Actual (crop specific) quantity of water lost by evaporation and transpiration',
    ruTooltip      : 'Фактическое количество воды, теряемой при испарении и транспирации',
    enUnit         : 'mm',
    ruUnit         : 'мм',
    crops          : ['non', '1', '2', '3'],
    aggregation    : 'all',
    enGroup        : 'Water use efficiency (ET)',
    ruGroup        : 'Эффективность использования воды',
    years          : 'all',
    mapType        : 'colored',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    decimals       : 0,
    userDB         : true,
    serverDB       : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
   },

     /**
  * @property vc
  * vc indicator
  */
  {
    id             : 'vc',
    field          : 'vc_{crop}',
    enName         : 'Water availability',
    ruName         : 'Индекс водообеспоченности',
    enNameShort    : 'Water availability',
    ruNameShort    : 'водоснабжение',
    enTooltip      : 'Ratio of (crop specific) actual to potential evapotranspiration<br>ET<sub>act</sub>_crop / ET<sub>pot</sub>_crop',
    ruTooltip      : 'Соотношение фактической эвапотранспирации с потребностью в воде',
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    crops          : ['non', '1', '2', '3'],
    aggregation    : 'all',
    enGroup        : 'Water use efficiency (ET)',
    ruGroup        : 'Эффективность использования воды',
    years          : 'all',
    mapType        : 'colored',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    decimals       : 2,
    userDB         : true,
    serverDB       : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
   },
        /**
  * @property eprod
  * eprod indicator
  */
{
    id             : 'eprod',
    field          : 'eprod_{crop}',
    enName         : 'Water productivity (ET)',
    ruName         : 'продуктивность воды',
    enTooltip      : 'Economic revenue per m³ water consumed in terms of ET<sub>act</sub> (considering cotton, rice and wheat harvest)<br>(Crop_gross_output * Crop_price) / ET<sub>act</sub>_crop',
    ruTooltip      : 'Выход (деньги) по отношению к входным (водным)',
    enUnit         : '$/m³',
    ruUnit         : '$/м³',
    crops          : ['avg', '1', '2', '3'],
    aggregation    : 'all',
    enGroup        : 'Water use efficiency (ET)',
    ruGroup        : 'Эффективность использования воды',
    years          : 'all',
    mapType        : 'colored',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : eprod_color,
    decimals       : 2,
    userDB         : true,
    serverDB       : true,  
    glossary       : 'bme00073.htm#bookme_anchor17'
}

];

/**
* @class __Indicator_userPolygon
* list of user polygon indicators and input parameters with id, English and Russian names, decimals, units, tooltips
* used to fill the indicator explanations in the Excel export
*/
var __Indicator_userPolygon = [
 {
    id             : 'vir_m',
    field          : 'vir_mX',
    enName         : 'Irrigation efficiency monthly',
    ruName         : 'Индекс эффективности ирригации',
    decimals       : 2,    
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    connectedTo      : ['vir']
   },
    {
    id             : 'vir_d',
    field          : 'vir_mX_1/2/3',
    enName         : 'Irrigation efficiency decadal',
    ruName         : 'Индекс эффективности ирригации',
    decimals       : 2,    
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    connectedTo      : ['vir']
   },
   {
    id             : 'etf_m',
    field          : 'etf_mX',
    enName         : 'Actual monthly evapotranspiration',
    ruName         : 'Фактическая эвапотранспирация',
    decimals       : 1,    
    enUnit         : 'mm',
    ruUnit         : 'мм',
    connectedTo      : ['vir']
   } ,
      {
    id             : 'etf_d',
    field          : 'etf_mX_1/2/3',
    enName         : 'Actual decadal evapotranspiration',
    ruName         : 'Фактическая эвапотранспирация',
    decimals       : 1,    
    enUnit         : 'mm',
    ruUnit         : 'мм',
    connectedTo      : ['vir']
   } ,
  {
    id             : 'wf',
    field          : 'wf',
    enName         : 'Water intake',
    ruName         : 'Индекс эффективности ирригации',
    decimals       : 2,    
    enUnit         : 'Mio. m³',
    ruUnit         : 'Млн. М³',
    prodform       :'2-years',
    enProdTooltip  :'Used for calculation of all water productivity indicators and irrigation efficiency',
    ruProdTooltip  :'Used for calculation of all water productivity indicators and irrigation efficiency',
    connectedTo      : ['vir', 'prod_kgm3', 'prod_dollm3', 'prod_wf_sum']

   },
 {
    id             : 'wf_m',
    field          : 'wf_mX',
    enName         : 'Water intake monthly',
    ruName         : 'Индекс эффективности ирригации',
    decimals       : 2,    
    enUnit         : 'Mio. m³',
    ruUnit         : 'Млн. М³',
    connectedTo      : ['vir']
   },
    {
    id             : 'wf_d',
    field          : 'wf_mX_1/2/3',
    enName         : 'Water intake decadal',
    ruName         : 'Индекс эффективности ирригации',
    decimals       : 2,    
    enUnit         : 'Mio. m³',
    ruUnit         : 'Млн. М³',
    connectedTo      : ['vir']
   },
   {
    id             : 'wf_rate',
    field          : 'wf_rate_{crop}',
    enName         : 'Crop water intake based on multi-annual rates',
    ruName         : 'Crop water intake based on multi-annual rates',
    decimals       : 2,    
    enUnit         : 'Mio. m³',
    ruUnit         : 'Млн. М³',
    crops          : 'sum',    
    connectedTo      : ['prod_kgm3', 'prod_dollm3', 'prod_wf_sum']
   },
   {
    id             : 'rate',
    field          : 'rate_{crop}',
    enName         : 'Rate of crop water intake',
    ruName         : 'Норма водоподачи',
    decimals       : 2,    
    enUnit         : 'm³/ha',
    ruUnit         : 'м³/га',
    crops          : 'all',
    prodform       :'1-noyears',
    enProdTooltip  :'Used for calculation of crop water intake',
    ruProdTooltip  :'Used for calculation of crop water intake',
    connectedTo      : ['prod_kgm3', 'prod_dollm3', 'prod_wf_sum']
   },  
   {
    id             : 'rain',
    field          : 'rain',
    enName         : 'Effective rainfall',
    ruName         : 'Осадки',
    decimals       : 2,    
    enUnit         : 'mm',
    ruUnit         : 'мм',
    prodform       :'2-years',
    enProdTooltip  :'Used for calculation of specific water supply',
    ruProdTooltip  :'Used for calculation of specific water supply',
    connectedTo      : ['prod_wf_sum']
   },    
   {
    id             : 'gwc',
    field          : 'gwc',
    enName         : 'Groundwater contribution',
    ruName         : 'Подпитка',
    decimals       : 2,    
    enUnit         : 'mm',
    ruUnit         : 'мм',
    prodform       :'2-noyears',
    enProdTooltip  :'Used for calculation of specific water supply',
    ruProdTooltip  :'Used for calculation of specific water supply',
    connectedTo      : ['prod_wf_sum']
   },
   {
    id             : 'c',
    field          : 'c_{crop}',
    enName         : 'Crop price',
    ruName         : 'Цена',
    decimals       : 2,    
    enUnit         : '$/t',
    ruUnit         : '$/t',
    crops          : 'all',
    prodform       :'1-years',
    enProdTooltip  :'Used for calculation of all revenue productivity indicators',
    ruProdTooltip  :'Used for calculation of all revenue productivity indicators',
    connectedTo      : ['prod_doll', 'prod_dollm3', 'prod_dollha', 'eprod']
   },
   {
    id             : 'kpd',
    field          : 'kpd',
    enName         : 'Efficiency',
    ruName         : 'КПД',
    decimals       : 2,    
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    prodform       :'2-noyears',
    enProdTooltip  :'Efficiency coefficient',
    ruProdTooltip  :'Efficiency coefficient',
    connectedTo      : ['prod_kgm3', 'prod_dollm3', 'prod_wf_sum']
   }
];


