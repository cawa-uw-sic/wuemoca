var __Selection = {

  Country          : __LocalDB.get('Selections.Country'),
  Oblast           : __LocalDB.get('Selections.Oblast'),
  Rayon            : __LocalDB.get('Selections.Rayon'),
  Buis             : __LocalDB.get('Selections.Buis'),
  Uis              : __LocalDB.get('Selections.Uis'),
  Wua              : __LocalDB.get('Selections.Wua'),

  Indicator        : __LocalDB.get('Selections.Indicator', 'uiri'),
  Crop             : __LocalDB.get('Selections.Crop', 'cotton'),
  Unit             : __LocalDB.get('Selections.Unit', 'admin'),
  Aggregation      : __LocalDB.get('Selections.Aggregation', 'rayon'),

  Year             : __LocalDB.get('Selections.Year', __Global.year.Min),

  IrrigationExtent : false

};
