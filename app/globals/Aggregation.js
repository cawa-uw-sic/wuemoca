var __Aggregation = [

  {
    id: 'admin',
    enName: 'Administration',
    ruName: 'Админиcтративные объекты',
    isDefault: true,
    items: [
      {
        id             : 'oblast',
        enName         : 'Province (Oblast)',
        ruName         : 'Область (Province)',
        isDefault      : true
      }, {
        id             : 'rayon',
        enName         : 'District (Rayon)',
        ruName         : 'Район (District)'
      }, {
        id             : 'wua',
        enName         : 'WUA (Water User Association)',
        ruName         : 'АВП (Water User Association)'
      }
    ]
  },

  {
    id: 'water',
    enName: 'Water User Units',
    ruName: 'Объекты водопользователей',
    items: [
      {
        id             : 'buis',
        enName         : 'BISA (Basin Irrig. System Admin.)',
        ruName         : 'БУИС (Basin Irrig. System Admin.)',
        isDefault      : true
      }, {
        id             : 'uis',
        enName         : 'ISA (Irrigation System Admin.)',
        ruName         : 'УИС (Irrigation System Admin.)'
      }, {
        id             : 'command',
        enName         : 'Channel Command Area',
        ruName         : 'Командная площадь'
      }
    ]
  },

  /*{
    id: 'natural',
    enName: 'Natural units',
    ruName: 'Еcтеcтвенные объекты',
    items: [
      {
        id             : 'segment',
        enName         : 'Elevation Zone',
        ruName         : 'Высота зоны',
        tiled          : true,
        isDefault      : true
      }, {
        id             : 'subbasin',
        enName         : 'River Subbasin',
        ruName         : 'Река подбассейна'
      }
    ]
  },*/

  {
    id: 'grid',
    enName: 'regular Raster',
    ruName: 'Регулярный растр',
    tiled: true,
    items: false
  }

];