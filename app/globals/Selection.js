/**
* @class __Selection
* user selections that are stored in local DB and read while (re)loading application
*/
var __Selection = {
  //don't use true/false, because false will be interpreted as missing value
  /**
  * @property Country
  * country user selection, no default
  */
  Country          : __LocalDB.get('Selections.Country'),
  /**
  * @property Oblast
  * Oblast user selection, no default
  */  
  Oblast           : __LocalDB.get('Selections.Oblast'),
  /**
  * @property Rayon
  * Rayon user selection, no default
  */  
  Rayon            : __LocalDB.get('Selections.Rayon'),
  /**
  * @property Buis
  * Buis user selection, no default
  */  
  Buis             : __LocalDB.get('Selections.Buis'),
  /**
  * @property Uis
  * Uis user selection, no default
  */  
  Uis              : __LocalDB.get('Selections.Uis'),
  /**
  * @property Wua
  * Wua user selection, no default
  */  
  Wua              : __LocalDB.get('Selections.Wua'),
  /**
  * @property Indicator
  * Indicator user selection, no default
  */
  Indicator        : __LocalDB.get('Selections.Indicator', 'uir'),  
  /**
  * @property Crop
  * Crop user selection, default: sum
  */  
  Crop             : __LocalDB.get('Selections.Crop', 'sum'),
  /**
  * @property Aggregation
  * Aggregation user selection, default: oblast
  */  
  Aggregation      : __LocalDB.get('Selections.Aggregation', 'oblast'),
  /**
  * @property Year
  * Year user selection, default: max year
  */
  //Year             : __LocalDB.get('Selections.Year', __Global.year.Max),
  /**
  * @property IrrigationExtent
  * user selection: set visible maximum irrigation extent map layer, default: show
  */
  IrrigationExtent : __LocalDB.get('Selections.IrrigationExtent', 'show'),
  /**
  * @property Current
  * user selection: set visible current map layer, default: show
  */  
  Current          : __LocalDB.get('Selections.Current', 'show'),
  /**
  * @property UserPolygon
  * user selection: expand User Polygon panel, default: no show
  */  
  UserPolygon      : __LocalDB.get('Selections.UserPolygon', 'noshow'),
  /**
  * @property Legend
  * user selection: open Legend window, default: show
  */  
  Legend           : __LocalDB.get('Selections.Legend', 'show'),
  /**
  * @property AreaFilter
  * user selection: expand Area Filter panel, default: no show
  */  
  AreaFilter       : __LocalDB.get('AreaFilter', 'noshow')
};
