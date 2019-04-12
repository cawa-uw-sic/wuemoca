/**
* @class __Crop
* list of crop types with idx, id, English and Russian names, chart type and crop color
*/
var __Crop = [
  /**
  * @property sum
  * all crops
  */
  {
    idx          : 0,
    id           : 'sum',
    enName       : 'all crops',
    ruName       : 'Все зерновые культуры',
    chart        : 'Stacked',
    color_chart  : '#fd8d3c',
    color_dark   : '#800026',
    color_medium : '#fd8d3c',
    color_bright : '#ffffcc'
  },
  /**
  * @property avg
  * all crops
  */
  {
    idx   : 0,
    id    : 'avg',
    enName: 'weighted average',
    ruName: 'Средне взвешенная',
    chart : 'Defaults',
    color_chart  : '#989800',
    color_dark   : '#2c7bb6',
    color_medium : '#ffffbf',
    color_bright : '#d7191c'    
  },
  /**
  * @property avg
  * all crops
  */
  {
    idx   : 0,
    id    : 'non',
    enName: 'irrigated cropland',
    ruName: 'орошаемая земля',
    chart : 'Defaults',
    color_chart  : '#989800'
  },  
  /**
    * @property cotton
  * cotton crop
  */  
  {
    idx   : 1,
    id    : 'cotton',
    enName: 'Cotton',
    ruName: 'хлопок',
    chart : 'Defaults',
    yield : 1,
    color_chart  : '#76A882',
    color_dark   : '#3B5441',
    color_medium : '#76A882',
    color_bright : '#F1F6F2'     
  },
  /**
    * @property wheat
  * wheat crop
  */  
  {
    idx   : 2,
    id    : 'wheat',
    enName: 'Wheat',
    ruName: 'пшеница',
    chart : 'Defaults',
    yield : 1,    
    color_chart  : '#FF7F00',
    color_dark   : '#7F3F00',
    color_medium : '#FF7F00',
    color_bright : '#FFF2E5'  
  },
  /**
    * @property rice
  * rice crop
  */  
  {
    idx   : 3,
    id    : 'rice',
    enName: 'Rice',
    ruName: 'рис',
    chart : 'Defaults',
    yield : 1,    
    color_chart  : '#1F78B4',
    color_dark   : '#0F3C5A',
    color_medium : '#1F78B4',
    color_bright : '#E8F1F7'  
  },
  /**
    * @property alfa
  * alfalfa crop
  */  
  {
    idx   : 4,
    id    : 'alfa',
    enName: 'Alfalfa',
    ruName: 'люцерна',
    chart : 'Defaults',
    color_chart  : '#33a02c',
    color_dark   : '#195016',
    color_medium : '#33a02c',
    color_bright : '#EAF5E9'  
  },
  /**
    * @property orchard
  * orchard/vineyard crop
  */  
  {
    idx   : 5,
    id    : 'orchard',
    enName: 'Orchards/Vineyards',
    ruName: 'фруктовый сад/Виноградник',
    chart : 'Defaults',
    color_chart  : '#00858E',
    color_dark   : '#004247',
    color_medium : '#00858E',
    color_bright : '#E5F2F3'  
  },
  /**
    * @property garden
  * urban garden crop
  */  
  {
    idx   : 6,
    id    : 'garden',
    enName: 'Urban Gardens',
    ruName: 'Городской сад',
    chart : 'Defaults',
    color_chart  : '#E31A1C',
    color_dark   : '#710D0E',
    color_medium : '#E31A1C',
    color_bright : '#FCE8E8'  
  },
  /**
    * @property other
  * other crop
  */  
  {
    idx   : 7,
    id    : 'other',
    enName: 'Other Crops',
    ruName: 'другая культура',
    chart : 'Defaults',
    color_chart  : '#DD3497',
    color_dark   : '#6E1A4B',
    color_medium : '#DD3497',
    color_bright : '#FBEAF4'  
  },
  /**
    * @property maize
  * maize crop
  */  
  {
    idx   : 8,
    id    : 'maize',
    enName: 'Maize',
    ruName: 'кукуруза',
    chart : 'Defaults',
    color_chart  : '#e6550d',
    color_dark   : '#732A06',
    color_medium : '#e6550d',
    color_bright : '#FCEEE6'  
  },
  /**
    * @property sun
  * sunflower crop
  */  
  {
    idx   : 9,
    id    : 'sun',
    enName: 'Sunflowers',
    ruName: 'подсолнух',
    chart : 'Defaults',
    color_chart  : '#CCAA00',
    color_dark   : '#7F6A00',
    color_medium : '#FFD500',
    color_bright : '#FFFAE5'  
  },
  /**
    * @property veg
  * vegetable crop
  */  
  {
    idx   : 10,
    id    : 'veg',
    enName: 'Vegetables',
    ruName: 'овощной',
    chart : 'Defaults',
    color_chart  : '#6a3d9a',
    color_dark   : '#351E4D',
    color_medium : '#6a3d9a',
    color_bright : '#F0EBF4'  
  }
];

