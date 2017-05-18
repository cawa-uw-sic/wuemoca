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
    idx   : 0,
    id    : 'sum',
    enName: 'All crops',
    ruName: 'Все зерновые культуры',
    chart : 'Stacked',
    color : sum_color
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
    color : cotton_color
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
    color : wheat_color
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
    color : rice_color
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
    color : alfa_color
  },
  /**
    * @property orchard
  * orchard/vineyard crop
  */  
  {
    idx   : 5,
    id    : 'orchard',
    enName: 'Orchard/Vineyard',
    ruName: 'фруктовый сад/Виноградник',
    chart : 'Defaults',
    color : orchard_color
  },
  /**
    * @property garden
  * urban garden crop
  */  
  {
    idx   : 6,
    id    : 'garden',
    enName: 'Urban Garden',
    ruName: 'Городской сад',
    chart : 'Defaults',
    color : garden_color
  },
  /**
    * @property other
  * other crop
  */  
  {
    idx   : 7,
    id    : 'other',
    enName: 'Other Crop',
    ruName: 'другая культура',
    chart : 'Defaults',
    color : other_color
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
    color : maize_color
  },
  /**
    * @property sun
  * sunflower crop
  */  
  {
    idx   : 9,
    id    : 'sun',
    enName: 'Sunflower',
    ruName: 'подсолнух',
    chart : 'Defaults',
    color : sun_color
  },
  /**
    * @property veg
  * vegetable crop
  */  
  {
    idx   : 10,
    id    : 'veg',
    enName: 'Vegetable',
    ruName: 'овощной',
    chart : 'Defaults',
    color : veg_color
  }
];

