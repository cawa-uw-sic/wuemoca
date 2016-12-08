Ext.define('App.service.Watcher', {

  singleton: true,

  isBusy: false,

  set: function (attr, val) {
    __Selection[attr] = val;
    this.onChange({attr: attr, val: val});
    __LocalDB.set('Selections.' + attr, val);
  },

  get: function (attr) {
    return __Selection[attr];
  },

  onChange: function (obj) {
    if (obj.attr == 'Year') return App.service.Map.changeYear();
    if (obj.attr != 'Unit') {
      App.service.Map.loadLayer();
    }
  },

  getIndicator: function () {
    return App.service.Helper.getById(__Indicator, this.get('Indicator'));
  },

  getAggregation: function () {
    var items = [];
    __Aggregation.map(function (aggregation) {
      if (!aggregation.items) return items.push(aggregation);
      aggregation.items.map(function (item) {
        items.push(item);
      });
    });
    return App.service.Helper.getById(items, this.get('Aggregation'));
  },

  getFilterAggregation: function(aggregation){
    var filter = '';
    __Aggregation.map(function (unit) {
      if (unit.items) {
        unit.items.map(function (item) {
          if (item.id == aggregation){
            filter = item.filter;
          }
        });          
      }
      else{
        if (unit.id == aggregation){
          filter = unit.filter;
        }
      }
    });  
    return filter; 
  },

  activateFilters: function () {
    var indicators = __Indicator;
    for (var filter in __FilterSelection) {
      if ( __FilterSelection.hasOwnProperty(filter) && !!__FilterSelection[filter] && __FilterSelection[filter] !== 'empty') {
        if (['category', 'type', 'mapType'].indexOf(filter) >= 0) {
          indicators = indicators.filter(function (indicator) {
            return indicator[filter] == __FilterSelection[filter];
          });
        }
        if (['years', 'crops'].indexOf(filter) >= 0) {
          indicators = indicators.filter(function (indicator) {
            return ((!indicator[filter] && __FilterSelection[filter] == 'no') || (!!indicator[filter] && __FilterSelection[filter] == 'yes'));
          });
        }
      }
    }
    Ext.getStore('indicator').removeAll();
    Ext.getStore('indicator').loadData(indicators);

    //keep selected indicator only if it is still in filtered list after activation; don't show indicators which are filtered out
    var selected_indicator = App.service.Helper.getComponentValue('switcher-cb-indicator');
    if (!App.service.Helper.inArrayId(indicators, selected_indicator)){
      App.service.Helper.resetComboboxes(['switcher-cb-indicator']); 
    }
  },

  syncDB: function () {
    var self = this;
    if (self.isBusy) return false;

    Ext.data.JsonP.request({
      url :  __Global.api.Indicator,
      callbackName: 'SyncDBResponse',
      params: {format_options: 'callback:Ext.data.JsonP.SyncDBResponse'},
      success: function (results) {
        self.isBusy = false;
        self.mergeIndicators(results);
        App.service.Map.loadLayer();
      }
    });
  },

  mergeIndicators: function (nIndicators) {
    var convertionExceptions = ['id'];
    __Indicator = __Indicator.map(function (indicator) {
      nIndicator = App.service.Helper.getById(nIndicators, indicator.id);
      for (var key in nIndicator) {
        if (nIndicator.hasOwnProperty(key)) {
          
          nIndicator[key] = App.service.Helper.splitCommaToArray(nIndicator[key]);
          nIndicator[key] = App.service.Helper.splitCommaToFloat(nIndicator[key]);

          if (nIndicator[key] && typeof nIndicator[key] != 'object' && convertionExceptions.indexOf(key) < 0) {
            nIndicator[key] = parseFloat(nIndicator[key]);
          }
          indicator[key] = nIndicator[key];
        }
      }
      return indicator;
    });
  }

});