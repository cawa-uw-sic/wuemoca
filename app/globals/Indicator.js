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
    ruName         : 'Орошаемая площадь нетто ',
    enTooltip      : 'Area equipped with irrigation infrastructure (used and not used irrigable cropland)',
    ruTooltip      : 'Площади, оснащенные ирригационной инфраструктурой (включая временно неиспользуемые земли)',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : 'ha',
    ruUnit         : 'га',
    crops          : false,
    aggregation    : 'all',
    enGroup        : 'Land use',
    ruGroup        : 'Землепользование',
    groupsort: '1',
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
    enProdTooltip  :'changes affect all indicators based on Net irrigated area',
    ruProdTooltip  :'changes affect all indicators based on Net irrigated area'
  },   
  /**
  * @property firf
  * firf indicator
  */
  {
    id             : 'firf',
    field          : 'firf_{crop}',
    enName         : 'Crop acreage',
    ruName         : 'Посевная площадь',
    enTooltip      : 'Crop-specific area under irrigation (for the sum double usage is counted twice)',
    ruTooltip      : 'Площадь орошаемых земель, занятая под посевами сельскохозяйственных культур (повторное использование считается дважды)',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : 'ha',
    ruUnit         : 'га',
    crops          : 'sum',
    aggregation    : 'all',
    enGroup        : 'Land use',
    ruGroup        : 'Землепользование',
        groupsort: '1',
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
    ruName         : 'Коэффициент использования орошаемых земель',
    enTooltip      : 'Area share of crop acreage in Net irrigated area',
    ruTooltip      : 'Доля посевной площади от орошаемой площади нетто',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : '%',
    ruUnit         : '%',
    crops          : 'sum',
    aggregation    : 'all',
    enGroup        : 'Land use',
    ruGroup        : 'Землепользование',
        groupsort: '1',
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
    enTooltip      : 'Area share of fallow land in Net irrigated area',
    ruTooltip      : 'Доля земель под паром от орошаемой площади нетто',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : '%',
    ruUnit         : '%',
    crops          : false,
    aggregation    : 'all',
    enGroup        : 'Land use',
    ruGroup        : 'Землепользование',
        groupsort: '1',
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
    ruName         : 'Разнообразие культур',
    enTooltip      : 'Variety of different crop types (spatially)',
    ruTooltip      : 'Набор разных видов культур (территориально)',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    crops          : false,
    aggregation    : 'all',
    enGroup        : 'Land use',
    ruGroup        : 'Землепользование',
        groupsort: '1',
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
    ruName         : 'Частота неиспользования земель',
    enTooltip      : 'Average number of years in which land was not cultivated',
    ruTooltip      : 'Среднее количество лет, в течение которых земля не культивировалась',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    enGroup        : 'Land use (multi-annual, raster only)',
    ruGroup        : 'Многолетняя, только Регулярный растр',
        groupsort: '2',
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
    ruName         : 'Оборот землепользования',
    enTooltip      : 'Average number of annual land use alternations',
    ruTooltip      : 'Среднее число чередования землепользования, включая временное неиспользование земель',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    enGroup        : 'Land use (multi-annual, raster only)',
    ruGroup        : 'Многолетняя, только Регулярный растр',
    groupsort: '2',
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
    ruTooltip      : 'Преобладающие виды землепользования, исходя из средней частоты',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    enGroup        : 'Land use (multi-annual, raster only)',
    ruGroup        : 'Многолетняя, только Регулярный растр',
    groupsort: '2',
    years          : false,
    mapType        : 'colored',
    enLegend       : 'Major land use',
    ruLegend       : 'Основные виды землепользования',
    croplist       : ['cotton', 'wheat', 'rice', 'fallow', 'double', 'alfa', 'orchard', 'garden', 'other'],
    enCropNames    : ['Cotton', 'Wheat', 'Rice', 'Fallow land', 'Wheat-Other crop', 'Alfalfa', 'Orchards/Vineyards',
                    'Urban Gardens', 'Other crops'],
    ruCropNames    : ['хлопок', 'пшеница', 'рис', 'Неиспользуемые земли', 'пшеница-другая культура', 'люцерна',
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
    enName         : 'Farm crop output',
    ruName         : 'Фактическая валовая продукция',
    enTooltip      : 'RS-based estimated crop harvest',
    ruTooltip      : 'Оценка, на основе ДЗ, урожая культуры',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : 'tons',
    ruUnit         : 'тонны',
    crops          : ['1', '2', '3'],
    aggregation    : 'all',
    enGroup        : 'Productivity (RS)',
    ruGroup        : 'Продуктивность (дз)',
    groupsort: '3',
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
    ruName         : 'Урожайность культур',
    enTooltip      : 'RS-based estimated crop harvest per ha crop acreage',
    ruTooltip      : 'Оценка, на основе ДЗ, продукции растениеводства, собранной с гектара посевной площади',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : 't/ha',
    ruUnit         : 'т/га',
    crops          : ['1', '2', '3'],
    aggregation    : 'all',
    enGroup        : 'Productivity (RS)',
    ruGroup        : 'Продуктивность (дз)',
    groupsort: '3',
    years          : 'all',
    mapType        : 'colored',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    decimals       : 2,
    userDB         : true,
    serverDB       : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
   }, 


{
    id             : 'gp',
    field          : 'gp_{crop}',
    enName         : 'Total productivity',
    ruName         : 'Общий Продуктивность',
    enTooltip      : 'RS-based crop-specific economic revenue<br>Crop_output_RS * Crop_price',
    ruTooltip      : 'Общий экономический доход по культурам - на основе ДЗ<br>Crop_output_RS * Crop_price',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : '$',
    ruUnit         : '$',
    crops          : ['sum', '1', '2', '3'],
    aggregation    : 'all',
    enGroup        : 'Productivity (RS)',
    ruGroup        : 'Продуктивность (дз)',
    groupsort: '3',
    years          : 'all',
    mapType        : 'labeled',
    median         : 0,
    maximum        : 0,
    chart          : 'crops',
    decimals       : 1,
    userDB         : true,
    serverDB       : true,
    userInput      : 'c',
    glossary       : 'bme00073.htm#bookme_anchor16'
}, 

{
    id             : 'pf',
    field          : 'pf_{crop}',
    enName         : 'Productivity per hectare',
    ruName         : 'Продуктивность на гектар',
    enTooltip      : 'RS-based crop-specific economic revenue per ha crop acreage<br>(Crop_output_RS * Crop_price) / Crop_acreage',
    ruTooltip      : 'Экономический доход по культурам с 1 га посевной площади - на основе ДЗ<br>(Crop_output_RS * Crop_price) / Crop_acreage',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : '$/ha',
    ruUnit         : '$/га',
    crops          : ['avg', '1', '2', '3'],
    aggregation    : 'all',
    enGroup        : 'Productivity (RS)',
    ruGroup        : 'Продуктивность (дз)',
    groupsort: '3',
    years          : 'all',
    mapType        : 'colored',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    color          : '#006837',
    decimals       : 1,
    userDB         : true,
    serverDB       : true,
    userInput      : 'c',    
    glossary       : 'bme00073.htm#bookme_anchor16'
},
{
    id             : 'yw',
    field          : 'yw_{crop}',
    enName         : 'Quantity per water consumed',
    ruName         : 'Количество на потребляемую воду',
    enNameShort    : 'Quantity per water',
    ruNameShort    : 'Количество на воду',    
    enTooltip      : 'RS-based crop harvest per m³ surface water consumed<br>Crop_output_RS / Crop_water_intake',
    ruTooltip      : 'Урожай культуры на 1 м3 потребленной поверхностной воды - на основе ДЗ<br>Crop_output_RS / Crop_water_intake',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : 'kg/m³',
    ruUnit         : 'кг/м³',
    crops          : ['1', '2', '3'],
    aggregation    : 'all',
    enGroup        : 'Productivity (RS)',
    ruGroup        : 'Продуктивность (дз)',
    groupsort: '3',
    years          : 'all',
    mapType        : 'labeled',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : '#006837',
    decimals       : 2,
    userDB         : true,
    serverDB       : false,
    userInput      : 'wf',
    glossary       : 'bme00073.htm#bookme_anchor16'
},
{
    id             : 'pw',
    field          : 'pw_{crop}',
    enName         : 'Productivity per water consumed',
    ruName         : 'Продуктивность на потребляемую воду',
    enNameShort    : 'Productivity per water',
    ruNameShort    : 'Продуктивность на воду',    
    enTooltip      : 'RS-based crop-specific economic revenue per m³ surface water consumed<br>(Crop_output_RS * Crop_price) / Crop_water_intake',
    ruTooltip      : 'Экономический доход по культурам на 1 м³ потребленной поверхностной воды - на основе ДЗ<br>(Crop_output_RS * Crop_price) / Crop_water_intake',
    enAffix        : '(RS)',
    ruAffix        : '(дз)',    
    enUnit         : '$/m³',
    ruUnit         : '$/м³',
    crops          : ['avg', '1', '2', '3'],
    aggregation    : 'all',
    enGroup        : 'Productivity (RS)',
    ruGroup        : 'Продуктивность (дз)',
    groupsort: '3',
    years          : 'all',
    mapType        : 'labeled',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : '#006837',
    decimals       : 2,
    userDB         : true,
    serverDB       : false,
    userInput      : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
},
   /**
  * @property pirf
  * pirf indicator
  */
  {
    id             : 'prod_pirf',
    field          : 'prod_pirf_{crop}',
    enName         : 'Farm crop output',
    ruName         : 'Фактическая валовая продукция',
    enTooltip      : 'Statistical actual crop harvest',
    ruTooltip      : 'Фактически собранный урожай по статистике',
    enAffix        : '(stats.)',
    ruAffix        : '(статс.)',
    enUnit         : 'tons',
    ruUnit         : 'тонны',
    crops          : 'all',
    aggregation    : 'all',
    enGroup        : '<span style="color:#970016">Productivity (stats.)</span>',
    ruGroup        : '<span style="color:#970016">Продуктивность (статс.)</span>',   
    groupsort: '4',
    years          : 'all',
    mapType        : 'labeled',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    decimals       : 0,
    userDB         : true,
    serverDB       : false,
    userInput      : true,
    glossary       : 'bme00073.htm#bookme_anchor10'
  },     
  /**
  * @property yf
  * yf indicator
  */
  {
    id             : 'prod_yf',
    field          : 'prod_yf_{crop}',
    enName         : 'Crop yield',
    ruName         : 'Урожайность культур',
    enTooltip      : 'Statistical actual crop harvest per ha crop acreage',
    ruTooltip      : 'Фактически собранный урожай с 1 га посевной площади по статистике',
    enAffix        : '(stats.)',
    ruAffix        : '(статс.)',    
    enUnit         : 't/ha',
    ruUnit         : 'т/га',
    crops          : 'all',
    aggregation    : 'all',
    enGroup        : '<span style="color:#970016">Productivity (stats.)</span>',
    ruGroup        : '<span style="color:#970016">Продуктивность (статс.)</span>',
    groupsort: '4',
    years          : 'all',
    mapType        : 'colored',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    decimals       : 2,
    userDB         : true,
    serverDB       : false,
    userInput      : true,
    glossary       : 'bme00073.htm#bookme_anchor16',
    prodform       :'1-years',
    enProdTooltip  :'changes affect crop output',
    ruProdTooltip  :'changes affect crop output'
   },    
{
    id             : 'prod_gp',
    field          : 'prod_gp_{crop}',
    enName         : 'Total productivity',
    ruName         : 'Общий Продуктивность',
    enTooltip      : 'Statistical crop-specific economic revenue<br>Crop_output_stats * Crop_price',
    ruTooltip      : 'Экономический доход по культурам по статистике<br>Crop_output_stats * Crop_price',
    enAffix        : '(stats.)',
    ruAffix        : '(статс.)',    
    enUnit         : '$',
    ruUnit         : '$',
    crops          : 'sum',
    aggregation    : 'all',
    enGroup        : '<span style="color:#970016">Productivity (stats.)</span>',
    ruGroup        : '<span style="color:#970016">Продуктивность (статс.)</span>',
    groupsort: '4',
    years          : 'all',
    mapType        : 'labeled',
    median         : 0,
    maximum        : 0,
    chart          : 'crops',
    decimals       : 1,
    userDB         : true,
    serverDB       : false,
    userInput      : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
},
{
    id             : 'prod_pf',
    field          : 'prod_pf_{crop}',
    enName         : 'Productivity per hectare',
    ruName         : 'Продуктивность на гектар',
    enTooltip      : 'Statistical crop-specific economic revenue per ha crop acreage<br>(Crop_output_stats * Crop_price) / Crop_acreage',
    ruTooltip      : 'Экономический доход по культуре на 1 га посевной площади по статистике<br>(Crop_output_stats * Crop_price) / Crop_acreage',
    enUnit         : '$/ha',
    enAffix        : '(stats.)',
    ruAffix        : '(статс.)',    
    ruUnit         : '$/га',
    crops          : 'avg',
    aggregation    : 'all',
    enGroup        : '<span style="color:#970016">Productivity (stats.)</span>',
    ruGroup        : '<span style="color:#970016">Продуктивность (статс.)</span>',
    groupsort: '4',
    years          : 'all',
    mapType        : 'labeled',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    color          : '#006837',
    decimals       : 1,
    userDB         : true,
    serverDB       : false,
    userInput      : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
},

{
    id             : 'prod_yw',
    field          : 'prod_yw_{crop}',
    enName         : 'Quantity per water consumed',
    ruName         : 'Количество на потребляемую воду',
    enNameShort    : 'Quantity per water',
    ruNameShort    : 'Количество на воду',    
    enTooltip      : 'Statistical crop harvest per m³ surface water consumed<br>Crop_output_stats / Crop_water_intake',
    ruTooltip      : 'Урожай культуры по статистике на 1 м³ потребленной поверхностной воды<br>Crop_output_stats / Crop_water_intake',
    enAffix        : '(stats.)',
    ruAffix        : '(статс.)',    
    enUnit         : 'kg/m³',
    ruUnit         : 'кг/м³',
    crops          : 'all',
    aggregation    : 'all',
    enGroup        : '<span style="color:#970016">Productivity (stats.)</span>',
    ruGroup        : '<span style="color:#970016">Продуктивность (статс.)</span>', 
    groupsort: '4',
    years          : 'all',
    mapType        : 'labeled',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : '#006837',
    decimals       : 2,
    userDB         : true,
    serverDB       : false,
    userInput      : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
},

{
    id             : 'prod_pw',
    field          : 'prod_pw_{crop}',
    enName         : 'Productivity per water consumed',
    ruName         : 'Продуктивность на потребляемую воду',
    enNameShort    : 'Productivity per water',
    ruNameShort    : 'Продуктивность на воду',    
    enTooltip      : 'Statistical crop-specific economic revenue per m³ surface water consumed<br>(Crop_output_stats * Crop_price) / Crop_water_intake',
    ruTooltip      : 'Экономический доход по культурам по статистике на 1 м³ потребленной поверхностной воды<br>(Crop_output_stats * Crop_price) / Crop_water_intake',
    enAffix        : '(stats.)',
    ruAffix        : '(статс.)',    
    enUnit         : '$/m³',
    ruUnit         : '$/м³',
    crops          : 'avg',
    aggregation    : 'all',
    enGroup        : '<span style="color:#970016">Productivity (stats.)</span>',
    ruGroup        : '<span style="color:#970016">Продуктивность (статс.)</span>', 
    groupsort: '4',
    years          : 'all',
    mapType        : 'labeled',
    median         : 0,
    maximum        : 0,
    chart          : 'Line',
    color          : '#006837',
    decimals       : 2,
    userDB         : true,
    serverDB       : false,
    userInput      : true,
    glossary       : 'bme00073.htm#bookme_anchor16'
},
{
    id             : 'prod_wf',
    field          : 'prod_wf',
    enName         : 'Specific water supply',
    ruName         : 'Удельная водоподача',
    enTooltip      : 'Water intake (+ groundwater, rainfall) per ha Net irrigated area',
    ruTooltip      : 'Водозабор (+ подземные воды, осадки) на гектар орошаемой площади нетто',
    enUnit         : 'm³/ha',
    ruUnit         : 'м³/га',
    crops          : false,
    aggregation    : 'all',
    enGroup        : '<span style="color:#970016">Productivity (stats.)</span>',
    ruGroup        : '<span style="color:#970016">Продуктивность (статс.)</span>', 
    groupsort: '4',
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
    userInput      : 'wf',
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
    ruNameShort    : 'ЭТ<sub>факт</sub>',
    enTooltip      : 'Actual (crop-specific) quantity of water released to atmosphere by evaporation and transpiration',
    ruTooltip      : 'Объем воды, высвобождаемый в атмосферу за счет испарения и транспирации',
    enUnit         : 'mm',
    ruUnit         : 'мм',
    crops          : ['non', '1', '2', '3'],
    aggregation    : 'all',
    enGroup        : 'Water use efficiency (RS)',
    ruGroup        : 'Эффективность использования воды (дз)',
    groupsort: '5',
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
    enName         : 'Water availability (ET)',
    ruName         : 'Водообеспеченность (ЭТ)',
    enTooltip      : 'Index of appropriate water supply for crop cultivation<br>ET<sub>act</sub>_crop / ET<sub>pot</sub>_crop',
    ruTooltip      : 'Показатель надлежащего обеспечения водой<br>ET<sub>act</sub>_crop / ET<sub>pot</sub>_crop',
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    crops          : ['avg', '1', '2', '3'],
    aggregation    : 'all',
    enGroup        : 'Water use efficiency (RS)',
    ruGroup        : 'Эффективность использования воды (дз)',
     groupsort: '5',
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
    ruName         : 'продуктивность воды (ЭТ)',
    enTooltip      : 'RS-based crop-specific economic revenue per m³ water consumed, measured in ET<sub>act</sub><br>(Crop_output_RS * Crop_price) / ET<sub>act</sub>_crop',
    ruTooltip      : 'Экономический доход по культурам на основе ДЗ на 1 м³ потребленной воды, измеряется в ET<sub>act</sub><br>(Crop_output_RS * Crop_price) / ET<sub>act</sub>_crop',
    enUnit         : '$/m³',
    ruUnit         : '$/м³',
    crops          : ['avg', '1', '2', '3'],
    aggregation    : 'all',
    enGroup        : 'Water use efficiency (RS)',
    ruGroup        : 'Эффективность использования воды (дз)',
     groupsort: '5',
    years          : 'all',
    mapType        : 'colored',
    median         : 0,
    maximum        : 0,
    chart          : 'Defaults',
    decimals       : 2,
    userDB         : true,
    serverDB       : true,
    userInput      : 'c', 
    glossary       : 'bme00073.htm#bookme_anchor17'
},
        /**
  * @property vir
  * vir indicator
  */
 {
    id             : 'vir',
    field          : 'vir',
    enName         : 'Irrigation efficiency',
    ruName         : 'Эффективность орошения',
    enTooltip      : 'Index of efficiency in delivering water to the plants and minimizing water losses<br>ET<sub>act</sub> / Water_intake',
    ruTooltip      : 'Коэффициент эффективности при подаче воды растениям и минимизации потерь воды<br>ET<sub>act</sub> / Water_intake',
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    crops          : false,
    aggregation    : ['oblast', 'rayon'],
    enGroup        : 'Water use efficiency (RS)',
    ruGroup        : 'Эффективность использования воды (дз)',
     groupsort: '5',
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
    userInput      : 'wf', 
    glossary       : 'bme00073.htm#bookme_anchor16'

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
    enName         : 'Monthly irrigation efficiency (mX = month 4-9)',
    ruName         : 'Индекс эффективности ирригации в месяц',
    decimals       : 2,    
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    enProdTooltip      : 'Monthly index of efficiency in delivering water to the plants and minimizing water losses<br>ET<sub>act</sub>_month / Water_intake_month',
    ruProdTooltip      : 'Эффективность подачи воды растениям и сведения потерь воды к минимуму, отношение фактической эвапотранспирации к водозабору',    
    connectedTo      : ['vir']
   },
    {
    id             : 'vir_d',
    field          : 'vir_mX_1/2/3',
    enName         : 'Decadal irrigation efficiency (mX = month 4-9)',
    ruName         : 'Индекс эффективности ирригации декадальное',
    decimals       : 2,    
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    enProdTooltip      : 'Decadal index of efficiency in delivering water to the plants and minimizing water losses<br>ET<sub>act</sub>_decade / Water_intake_decade',
    ruProdTooltip      : 'Эффективность подачи воды растениям и сведения потерь воды к минимуму, отношение фактической эвапотранспирации к водозабору',       
    connectedTo      : ['vir']
   },
   {
    id             : 'etf_m',
    field          : 'etf_mX',
    enName         : 'Actual monthly evapotranspiration (mX = month 4-9)',
    ruName         : 'Фактическая эвапотранспирация в месяц',
    decimals       : 1,    
    enUnit         : 'mm',
    ruUnit         : 'мм',
    enProdTooltip  : 'Used for calculation of monthly irrigation efficiency',
    ruProdTooltip  : 'Used for calculation of monthly irrigation efficiency',
    connectedTo      : ['vir']
   } ,
      {
    id             : 'etf_d',
    field          : 'etf_mX_1/2/3',
    enName         : 'Actual decadal evapotranspiration (mX = month 4-9)',
    ruName         : 'Фактическая эвапотранспирация декадальное',
    decimals       : 1,    
    enUnit         : 'mm',
    ruUnit         : 'мм',
    enProdTooltip  : 'Used for calculation of decadal irrigation efficiency',
    ruProdTooltip  : 'Used for calculation of decadal irrigation efficiency',
    connectedTo      : ['vir']
   } ,
  {
    id             : 'wf',
    field          : 'wf',
    enName         : 'Water intake',
    ruName         : 'Фактическое потребление воды',
    decimals       : 2,    
    enUnit         : 'Mio. m³',
    ruUnit         : 'Млн. М³',
    prodform       :'2-years',
    enProdTooltip  :'Used for calculation of all water productivity indicators and irrigation efficiency',
    ruProdTooltip  :'Used for calculation of all water productivity indicators and irrigation efficiency',
    connectedTo      : ['vir', 'yw', 'pw', 'prod_yw', 'prod_pw', 'prod_wf']

   },
 {
    id             : 'wf_m',
    field          : 'wf_mX',
    enName         : 'Water intake monthly (mX = month 4-9)',
    ruName         : 'Фактическое потребление воды в месяц',
    decimals       : 2,    
    enUnit         : 'Mio. m³',
    ruUnit         : 'Млн. М³',
    enProdTooltip  : 'Used for calculation of monthly irrigation efficiency',
    ruProdTooltip  : 'Used for calculation of monthly irrigation efficiency',     
    connectedTo      : ['vir']
   },
    {
    id             : 'wf_d',
    field          : 'wf_mX_1/2/3',
    enName         : 'Water intake decadal (mX = month 4-9)',
    ruName         : 'Фактическое потребление воды декадальное',
    decimals       : 2,    
    enUnit         : 'Mio. m³',
    ruUnit         : 'Млн. М³',
    enProdTooltip  : 'Used for calculation of decadal irrigation efficiency',
    ruProdTooltip  : 'Used for calculation of decadal irrigation efficiency',    
    connectedTo      : ['vir']
   },
   {
    id             : 'wf_calc',
    field          : 'wf_calc_{crop}',
    enName         : 'Crop water intake based on multi-annual rates',
    ruName         : 'Crop water intake based on multi-annual rates',
    decimals       : 2,    
    enUnit         : 'Mio. m³',
    ruUnit         : 'Млн. М³',
    enProdTooltip  :'Used for calculation of all water productivity indicators',
    ruProdTooltip  :'Used for calculation of all water productivity indicators',    
    crops          : 'sum',    
    connectedTo      : ['yw', 'pw', 'prod_yw', 'prod_pw', 'prod_wf']
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
    enProdTooltip  :'Used for calculation of crop water intake for all water productivity indicators',
    ruProdTooltip  :'Used for calculation of crop water intake for all water productivity indicators',
    connectedTo      : ['yw', 'pw', 'prod_yw', 'prod_pw', 'prod_wf']
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
    connectedTo      : ['prod_wf']
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
    connectedTo      : ['prod_wf']
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
    enProdTooltip  :'Used for calculation of all monetary productivity indicators',
    ruProdTooltip  :'Used for calculation of all monetary productivity indicators',
    connectedTo      : ['gp', 'pw', 'pf', 'prod_gp', 'prod_pw', 'prod_pf', 'eprod']
   },
   {
    id             : 'kpd',
    field          : 'kpd',
    enName         : 'Efficiency coefficient',
    ruName         : 'КПД',
    decimals       : 2,    
    enUnit         : 'Index',
    ruUnit         : 'Индекс',
    prodform       :'2-noyears',
    enProdTooltip  :'Irrigation efficiency coefficient of the system',
    ruProdTooltip  :'Irrigation efficiency coefficient of the system',
    connectedTo      : ['yw', 'pw', 'prod_yw', 'prod_pw', 'prod_wf']
   }
];


