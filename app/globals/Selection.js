var __Selection = {
  //don't use true/false, because false will be interpreted as missing value

  Country          : __LocalDB.get('Selections.Country'),
  Oblast           : __LocalDB.get('Selections.Oblast'),
  Rayon            : __LocalDB.get('Selections.Rayon'),
  Buis             : __LocalDB.get('Selections.Buis'),
  Uis              : __LocalDB.get('Selections.Uis'),
  Wua              : __LocalDB.get('Selections.Wua'),

  //Indicator        : __LocalDB.get('Selections.Indicator', 'uir'),
  Indicator        : __LocalDB.get('Selections.Indicator'),  
  Crop             : __LocalDB.get('Selections.Crop', 'sum'),
  //Unit             : __LocalDB.get('Selections.Unit', 'admin'),
  Aggregation      : __LocalDB.get('Selections.Aggregation', 'rayon'),

  Year             : __LocalDB.get('Selections.Year', __Global.year.Max),

  IrrigationExtent : __LocalDB.get('Selections.IrrigationExtent', 'show'),
  Current          : __LocalDB.get('Selections.Current', 'show'),
  UserPolygon      : __LocalDB.get('Selections.UserPolygon', 'noshow'),

  AreaFilter        : __LocalDB.get('AreaFilter', 'noshow')
};
