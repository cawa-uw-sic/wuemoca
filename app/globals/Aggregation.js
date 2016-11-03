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
        enNameShort    : 'Province',
        ruNameShort    : 'Область',       
        isDefault      : true
      }, {
        id             : 'rayon',
        enName         : 'District (Rayon)',
        ruName         : 'Район (District)',
        enNameShort    : 'District',
        ruNameShort    : 'Район'  
      }, {
        id             : 'wua',
        enName         : 'WUA (Water User Association)',
        ruName         : 'АВП (Water User Association)',
        enNameShort    : 'WUA',
        ruNameShort    : 'АВП'   
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
        enNameShort    : 'BISA',
        ruNameShort    : 'БУИС',        
        isDefault      : true
      }, {
        id             : 'uis',
        enName         : 'ISA (Irrigation System Admin.)',
        ruName         : 'УИС (Irrigation System Admin.)',
        enNameShort    : 'ISA',
        ruNameShort    : 'УИС' 
      }, {
        id             : 'command',
        enName         : 'Channel Command Area',
        ruName         : 'Командная площадь',
        enNameShort    : 'Comm. Area',
        ruNameShort    : 'Comm. Area' 
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
    enNameShort    : 'reg. Raster',
    ruNameShort    : 'reg. Raster',    
    tiled: true,
    items: false
  }

];