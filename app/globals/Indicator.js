var __Indicator = [

  {
    id             : 'firn',
    field          : 'area_irr',
    enName         : 'Irrigated land area (net)',
    ruName         : 'Поливная площадь (нетто)',
    enUnit         : 'ha',
    ruUnit         : 'га',
    crops          : false,
    aggregation    : 'all',
    years          : false,
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'labeled',
    median         : 1575,
    maximum        : 2500,
    chart          : 'KirFir',
    color          : '#e6550d'
  }, {
    id             : 'firb',
    field          : 'area_ha',
    enName         : 'Irrigated land area(gross)',
    ruName         : 'Площадь орошаемых земель (брутто)',
    enUnit         : 'ha',
    ruUnit         : 'га',
    crops          : false,
    aggregation    : 'all',
    years          : false,
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'labeled',
    chart          : 'KirFir',
    color          : '#de2d26'
  }, {
    id             : 'kir',
    field          : 'idx_kir',
    enName         : 'Land use coefficient',
    ruName         : 'Коэффициент землепользования',
    enUnit         : '',
    ruUnit         : '',
    crops          : false,
    aggregation    : 'all',
    years          : false,
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'coloured',
    median         : 0.63,
    maximum        : 1,
    chart          : 'KirFir',
    color          : ['#000', '#82b525']
  }, {
    id             : 'firf',
    field          : '{crop}_ha',
    enName         : 'Irrigated crop acreage',
    ruName         : 'Орошаемые посевные площади с/х культур',
    enUnit         : 'ha',
    ruUnit         : 'га',
    crops          : 'all',
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'labeled',
    median         : [1050, 300, 325, 125, 262.5, 125, 50],
    maximum        : [5500, 2850, 2925, 2410, 2275, 2800, 300],
    chart          : 'Defaults'
  }, {
    id             : 'firf_state',
    field          : 'idx_sta',
    enName         : 'State order acreage',
    ruName         : 'Гоc.заказ посевных площадей',
    enUnit         : 'ha',
    ruUnit         : 'га',
    crops          : false,
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'labeled',
    median         : 650,
    maximum        : 2950,
    chart          : 'Defaults',
    color          : '#6a3d9a'
  }, {
    id             : 'uirn',
    field          : 'idx_uir_net',
    enName         : 'Irrigated land use (net)',
    ruName         : 'Орошаемое землепользование (нетто)',
    enUnit         : '',
    ruUnit         : '',
    crops          : false,
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'coloured',
    median         : 81.2,
    maximum        : 220,
    chart          : 'Defaults',
    color          : '#de2d26'
  }, {
    id             : 'uirb',
    field          : 'idx_uir_brt',
    enName         : 'Irrigated land use (gross)',
    ruName         : 'Орошаемое землепользование (брутто)',
    enUnit         : '',
    ruUnit         : '',
    crops          : false,
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'coloured',
    median         : 42.0,
    maximum        : 220,
    chart          : 'Defaults',
    color          : '#e6550d'
  }, {
    id             : 'uiri',
    field          : '{crop}_percent',
    enName         : 'Irrigated land use per crop',
    ruName         : 'Орошаемое использование земель по с/х культуре',
    enUnit         : '',
    ruUnit         : '',
    crops          : 'all',
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'coloured',
    median         : [18.4, 27.3, 4.6, 18.0, 7.9, 2.0],
    maximum        : [100, 100, 100, 100, 100, 100],
    chart          : 'Defaults'
  }, {
    id             : 'uir_state',
    field          : 'idx_sta_irr',
    enName         : 'State order land use',
    ruName         : 'Гос.заказ использование земли',
    enUnit         : '',
    ruUnit         : '',
    crops          : false,
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'coloured',
    median         : 49.3,
    maximum        : 118,
    chart          : 'Defaults',
    color          : '#6a3d9a'
  }, {
    id             : 'pirf',
    field          : 'idx_pir_{crop}',
    enName         : 'Farm gross output actual',
    ruName         : 'Ферма валовой продукции фактическая',
    enUnit         : 'tons',
    ruUnit         : 'тонны',
    crops          : ['cotton', 'wheat'],
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'labeled',
    median        : [[129, 306, 560, 923, 1475, 2577, 11907], [173, 408, 783, 1373, 2271, 3758, 15555]],
    chart          : 'Defaults'
  }, {
    id             : 'yield',
    field          : '{crop}_tons',
    enName         : 'Yield',
    ruName         : 'Урожайность',
    enUnit         : 'tons/ha',
    ruUnit         : 'т/га',
    crops          : ['cotton', 'wheat'],
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'coloured',
    median         : [[1.46, 1.73, 2, 2.39, 2.94, 3.6, 25.5], [1.84, 2.27, 2.66, 3.09, 3.53, 4.06, 8.74]],
    chart          : 'Defaults'
  }, {
    id             : 'intensity',
    field          : 'double_percent',
    enName         : 'Land use intensity',
    ruName         : 'Интенсивность землепользования',
    enUnit         : '',
    ruUnit         : '',
    crops          : false,
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'coloured',
    median         : 11.11,
    maximum        : 100,
    chart          : 'Defaults',
    color          : '#ccaa00'
  }, {
    id             : 'fallow',
    field          : 'fallow_percent',
    enName         : 'Unused irrigated land',
    ruName         : 'Неиспользованный орошаемые земли',
    enUnit         : '',
    ruUnit         : '',
    crops          : false,
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'coloured',
    median         : 37.50,
    maximum        : 100,
    chart          : 'Defaults',
    color          : '#b29972'
  }, {
    id             : 'majority',
    field          : 'majority',
    enName         : 'Major land use',
    ruName         : 'Основное землепользование',
    enUnit         : '',
    ruUnit         : '',
    crops          : false,
    aggregation    : ['grid'],
    years          : false,
    yearsPrefix    : true,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'coloured',
    chart          : 'Majority'
  }, {
    id             : 'diversity',
    field          : 'diversity',
    enName         : 'Crop diversity',
    ruName         : 'Разнообразие с/х культур',
    enUnit         : '',
    ruUnit         : '',
    crops          : false,
    aggregation    : ['grid'],
    years          : false,
    yearsPrefix    : true,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'coloured',
    median         : 3.4,
    maximum        : 6,
    chart          : 'Majority',
    color          : ['#000', '#f49d10']
  }, {
    id             : 'frequency',
    field          : 'frequency',
    enName         : 'Fallow land frequency',
    ruName         : 'Частота неисп.земель',
    enUnit         : '',
    ruUnit         : '',
    crops          : false,
    aggregation    : ['grid'],
    years          : false,
    yearsPrefix    : true,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'coloured',
    median         : 6.7,
    maximum        : 16,
    chart          : 'Majority',
    color          : ['#000', '#82b525']
  }

];