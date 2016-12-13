var __Selection = {

  Country          : __LocalDB.get('Selections.Country'),
  Oblast           : __LocalDB.get('Selections.Oblast'),
  Rayon            : __LocalDB.get('Selections.Rayon'),
  Buis             : __LocalDB.get('Selections.Buis'),
  Uis              : __LocalDB.get('Selections.Uis'),
  Wua              : __LocalDB.get('Selections.Wua'),

  Indicator        : __LocalDB.get('Selections.Indicator', 'uiri'),
  Crop             : __LocalDB.get('Selections.Crop', 'sum'),
  Unit             : __LocalDB.get('Selections.Unit', 'admin'),
  Aggregation      : __LocalDB.get('Selections.Aggregation', 'rayon'),

  Year             : __LocalDB.get('Selections.Year', __Global.year.Max),

  IrrigationExtent : __LocalDB.get('Selections.IrrigationExtent', false),
  Current          : __LocalDB.get('Selections.Current', true),

  Accordion        : __LocalDB.get('Accordion', 'app-zoom'),
  UserPolygon      : __LocalDB.get('Selections.UserPolygon', false)


};
