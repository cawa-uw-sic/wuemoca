var __FilterSelection = {
  category : __LocalDB.get('FilterSelections.category'),
  type     : __LocalDB.get('FilterSelections.type'),
  mapType  : __LocalDB.get('FilterSelections.mapType'),
  years    : __LocalDB.get('FilterSelections.years'),
  crops    : __LocalDB.get('FilterSelections.crops')
};

var __EmptyFilter = {
  id     : 'empty',
  enName : 'no filter',
  ruName : 'пусто'
};

var __Filter = [

  {
    id   : 'category',
    items: [{
      id    : 'landuse',
      enName: 'Land use Indicators',
      ruName: 'Индикаторы земли'
    }, {
      id    : 'wateruse',
      enName: 'Water use Indicators',
      ruName: 'Индикаторы воды'
    }]
  }, {
    id   : 'type',
    items: [{
      id    : 'descriptive',
      enName: 'Descriptive Indicators',
      ruName: 'Наглядные индикаторы'
    }, {
      id    : 'analytical',
      enName: 'Analytical Indicators',
      ruName: 'Аналитические индикаторы'
    }]
  }, {
    id   : 'mapType',
    items: [{
      id    : 'labeled',
      enName: 'Labeled maps',
      ruName: 'Карты с надписью'
    }, {
      id    : 'colored',
      enName: 'Colored maps',
      ruName: 'Карты в цветах'
    }]
  }, {
    id   : 'years',
    items: [{
      id    : 'yes',
      enName: 'Annual Indicators',
      ruName: 'Ежегодные индикаторы'
    }, {
      id    : 'no',
      enName: 'Multiannual Indicators',
      ruName: 'Суммарные индикаторы'
    }]
  }, {
    id   : 'crops',
    items: [{
      id    : 'yes',
      enName: 'Crop type selection',
      ruName: 'Выбор культур'
    }, {
      id    : 'no',
      enName: 'No crop type selection',
      ruName: 'Без выбора культур'
    }]
  }

];