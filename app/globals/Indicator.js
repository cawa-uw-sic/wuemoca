var __Indicator = [

  {
    id             : 'firn',
    field          : 'firn',
    enName         : 'Net irrigated area',
    ruName         : 'Нетто Поливная площадь',
    enUnit         : 'ha',
    ruUnit         : 'га',
    crops          : false,
    aggregation    : 'all',
    years          : false,
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'labeled',
    enLegend       : ['Irrigated area'],
    ruLegend       : ['Поливная площадь'],    
   // median         : 1464,
   // maximum        : 4710,
    median         : 0,
    maximum        : 0,   
    chart          : false,
    decimals       : 0,
    glossary       : 'bme00057.htm'
    //color          : '#e6550d'
  }, {
    id             : 'firf',
    field          : 'firf_{crop}',
    enName         : 'Irrigated acreage per crop',
    ruName         : 'Орошаемые посевные площади с/х культур',
    enNameShort    : 'Irrigated acreage',
    ruNameShort    : 'Орошаемые посевные площади',
    enUnit         : 'ha',
    ruUnit         : 'га',
    crops          : ['sum', 'cotton', 'wheat', 'rice', 'other', 'orchard', 'garden', 'maize', 'veg', 'sun'],
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'labeled',
    enLegend       : ['All crops', 'Cotton', 'Wheat', 'Rice', 'Other Crop', 'Orchard/Vineyard', 'Urban Garden', 'Maize', 'Vegetable', 'Sunflower'],
    ruLegend       : ['All crops', 'хлопок', 'пшеница', 'рис', 'Other Crop', 'фруктовый сад/Виноградник', 'Urban Garden', 'Maize', 'Vegetable', 'Sunflower'],    
    //median         : [1140, 306, 276, 54, 228, 60, 60, 59, 66, 11],
    //maximum        : [8286, 4230, 4152, 2650, 3756, 3288, 996, 1560, 1548, 469],
    median         : 0,
    maximum        : 0,     
    chart          : ['Stacked', 'Defaults', 'Defaults', 'Defaults', 'Defaults', 'Defaults', 'Defaults', 'Defaults', 'Defaults', 'Defaults'],
    decimals       : 0,
    glossary       : 'bme00057.htm'
  }, {
    id             : 'uiri',
    field          : 'uiri_{crop}',
    enName         : 'Irrigated land use per crop',
    ruName         : 'Орошаемое использование земель по с/х культуре',
    enNameShort    : 'Irrigated land use',
    ruNameShort    : 'Орошаемое использование земель',    
    enTooltip      : 'Use intensity in relation to net irrigated area',
    ruTooltip      : 'Используйте интенсивность по отношению к чистой орошаемой площади',       
    enUnit         : '%',
    ruUnit         : '%',
    crops          : ['sum', 'cotton', 'wheat', 'rice', 'other', 'orchard', 'garden', 'maize', 'veg', 'sun'],
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'colored',
    enLegend       : ['All crops', 'Cotton', 'Wheat', 'Rice', 'Other Crop', 'Orchard/Vineyard', 'Urban Garden', 'Maize', 'Vegetable', 'Sunflower'],
    ruLegend       : ['All crops', 'хлопок', 'пшеница', 'рис', 'Other Crop', 'фруктовый сад/Виноградник', 'Urban Garden', 'Maize', 'Vegetable', 'Sunflower'],    
   // median         : [90, 17, 26, 4, 16, 3, 3, 4, 5, 1],
   // maximum        : [200, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    median         : 0,
    maximum        : 0,    
    chart          : ['Stacked', 'Defaults', 'Defaults', 'Defaults', 'Defaults', 'Defaults', 'Defaults', 'Defaults', 'Defaults', 'Defaults'],
    legendcolors   : [['#fee0d2','#fc9272','#de2d26'],['#F1F6F2','#76A882','#3B5441'],['#F1F6F2','#FF7F00','#3B5441'],['#F1F6F2','#1F78B4','#3B5441'],['#F1F6F2','#DD3497','#3B5441'],['#F1F6F2','#00858E','#3B5441'],['#F1F6F2','#E31A1C','#3B5441'],['#F1F6F2','#33a02c','#3B5441'],['#F1F6F2','#6a3d9a','#3B5441'],['#F1F6F2','#FFD500','#3B5441']] , 
    decimals       : 1,
    glossary       : 'bme00057.htm'
  }, {
    id             : 'pirf',
    field          : 'pirf_{crop}',
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
    enLegend       : ['Cotton', 'Wheat'],
    ruLegend       : ['Хлопок', 'Пшеница'],    
    // median         : [[87,270,591,1135,2044,3624,13182], [106,353,761,1421,2511,4371,16691]],
    median         : 0,
    maximum        : 0,     
    chart          : 'Defaults',
    decimals       : 0,
    glossary       : 'bme00057.htm'
  }, {
    id             : 'yield',
    field          : 'yield_{crop}',
    enName         : 'Yield',
    ruName         : 'Урожайность',
    enUnit         : 't/ha',
    ruUnit         : 'т/га',
    crops          : ['cotton', 'wheat'],
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'descriptive',
    mapType        : 'colored',
    enLegend       : ['Cotton', 'Wheat'],
    ruLegend       : ['Хлопок', 'Пшеница'],
    // median         : [[1.6, 1.9, 2.2, 2.54, 3.1, 3.7, 25.3], [1.9,2.3,2.7,3.1,3.6,4.1,8.2]],
    median         : 0,
    maximum        : 0,     
    chart          : 'Defaults',
    legendcolors   : ['#ffff80','#f8db5a','#f0b92f','#e69900','#a38f21','#56823b','#00734c'],
    decimals       : 1,
    glossary       : 'bme00057.htm'
  }, {
    id             : 'fallow',
    field          : 'fallow_percent',
    enName         : 'Temporary unused irrigable land',
    ruName         : 'Неиспользованный орошаемые земли',
    enUnit         : '%',
    ruUnit         : '%',
    crops          : false,
    aggregation    : 'all',
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'colored',
    enLegend       : ['Fallow land'],
    ruLegend       : ['Площадь неисп. земель'],    
    // median         : 28,
    // maximum        : 100,
    median         : 0,
    maximum        : 0,     
    chart          : 'Defaults',
    color          : '#b29972',
    legendcolors   : ['#F1F6F2','#B29972','#3B5441'],
    decimals       : 1,
    glossary       : 'bme00057.htm'
}, {
    id             : 'diversity',
    field          : 'diversity',
    enName         : 'Crop diversity',
    ruName         : 'Crop diversity',
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    years          : 'all',
    yearsPrefix    : false,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'colored',
    enLegend       : ['Crop diversity index'],
    ruLegend       : ['Crop diversity index'],    
    // median         : 0.7,
    // maximum        : 1,
    median         : 0,
    maximum        : 0, 
    chart          : 'Defaults',
    legendcolors   : ['#d7191c','#ffffbf', '#2c7bb6'],
    color          :'#989800',
    decimals       : 2,
    glossary       : 'bme00057.htm'   
  }, {
    id             : 'majority',
    field          : 'majority',
    enName         : 'Major land use',
    ruName         : 'Основное землепользование',
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    years          : false,
    yearsPrefix    : true,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'colored',
    enLegend       : ['Predominant crop type'],
    ruLegend       : ['Преобладающий тип урожая'],
    croplist       : ['cotton', 'wheat', 'rice', 'fallow', 'double', 'other', 'orchard', 'garden'],
    enCropNames    : ['Cotton', 'Wheat', 'Rice', 'Fallow land', 'Wheat/Other crops', 'Other crops', 'Orchard/Vineyard', 'Urban Garden'],
    ruCropNames    : ['хлопок', 'пшеница', 'рис', 'Неиспользуемые земли', 'Wheat/Other crops', 'Другие культуры', 'фруктовый сад/Виноградник', 'Urban Garden'],
    chart          : 'Multiannual',
    glossary       : 'bme00057.htm'
  }, {
    id             : 'rotation',
    field          : 'rotation',
    enName         : 'Crop rotation',
    ruName         : 'Разнообразие с/х культур',
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    years          : false,
    yearsPrefix    : true,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'colored',
    enLegend       : ['Number of crop types'],
    ruLegend       : ['Количество типов культур'],   
    // median         : 3.4,
    // maximum        : 6,
    median         : 0,
    maximum        : 0,     
    chart          : 'Multiannual',
    legendcolors   : ['#732A06','#e6550d', '#FCEEE6'],
    glossary       : 'bme00057.htm'
  }, {
    id             : 'frequency',
    field          : 'frequency',
    enName         : 'Fallow land frequency',
    ruName         : 'Частота неисп.земель',
    enUnit         : '-',
    ruUnit         : '-',
    crops          : false,
    aggregation    : ['grid'],
    years          : false,
    yearsPrefix    : true,
    category       : 'landuse',
    type           : 'analytical',
    mapType        : 'colored',
    enLegend       : ['Years of fallow'],
    ruLegend       : ['Years of fallow'],    
    // median         : 6,
    // maximum        : 17,
    median         : 0,
    maximum        : 0,     
    chart          : 'Multiannual',
    legendcolors   : ['#EAF5E9','#33a02c', '#195016'],
    glossary       : 'bme00057.htm'
  }

];
