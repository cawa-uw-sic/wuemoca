var __Selection = {

  Country          : __LocalDB.get('Selections.Country'),
  Oblast           : __LocalDB.get('Selections.Oblast'),
  Rayon            : __LocalDB.get('Selections.Rayon'),
  Buis             : __LocalDB.get('Selections.Buis'),
  Uis              : __LocalDB.get('Selections.Uis'),

  Indicator        : __LocalDB.get('Selections.Indicator', 'firf_state'),
  Crop             : __LocalDB.get('Selections.Crop', ''),
  Unit             : __LocalDB.get('Selections.Unit', 'grid'),
  Aggregation      : __LocalDB.get('Selections.Aggregation', 'grid'),

  Year             : __LocalDB.get('Selections.Year', __Global.year.Min),

  IrrigationExtent : false

};