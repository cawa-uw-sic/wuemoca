Ext.define('App.service.Watcher', {

  singleton: true,

  isBusy: false,

  set: function (attr, val) {
    __Selection[attr] = val;
    this.onChange({attr: attr, val: val});
    __LocalDB.set('Selections.' + attr, val);
  },

  get: function (attr) {
    var result = __Selection[attr];
    return result;
  },

  onChange: function (obj) {
    if (obj.attr == 'Year') return App.service.Map.changeYear();
    if (!this.isBusy){
      App.service.Map.loadLayer();
    }
  },

  getIndicator: function () {
    return App.service.Helper.getById(__Indicator, this.get('Indicator'));
  },

  getAggregation: function () {
    //var items = [];
    //__Aggregation.map(function (aggregation) {
      //if (!aggregation.items) 
      //return items.push(aggregation);
      /*aggregation.items.map(function (item) {
        items.push(item);
      });*/
   // });
    return App.service.Helper.getById(__Aggregation, this.get('Aggregation'));
  },

  getCrop: function () {
    return App.service.Helper.getById(__Crop, this.get('Crop'));
  },

  getSuperFilterAggregation: function(aggregation){
    var super_filter = '';
    __Aggregation.map(function (unit) {
      /*if (unit.items) {
        unit.items.map(function (item) {
          if (item.id == aggregation){
            super_filter = item.super_filter;
          }
        });          
      }
      else{*/
        if (unit.id == aggregation){
          super_filter = unit.super_filter;
        }
      //}
    });  
    return super_filter; 
  },

  /*activateFilters: function () {
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
  },*/

  syncDB: function () {
    var self = this;
    if (self.isBusy) return false;
    self.isBusy = true;

    Ext.data.JsonP.request({
      url :  __Global.api.Indicator,
      callbackName: 'SyncDBResponse',
      params: {format_options: 'callback:Ext.data.JsonP.SyncDBResponse'},
      success: function (results) {
        self.mergeIndicators(results);
      },
      callback: function (results) {
        self.isBusy = false;
        App.service.Map.loadLayer();
      }
    });
  },

  mergeIndicators: function (nIndicators) {
    // set median and maximum of indicators
    var convertionExceptions = ['id'];
    __Indicator = __Indicator.map(function (indicator) {
      nIndicator = App.service.Helper.getById(nIndicators, indicator.id);
      if (!!nIndicator){
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
      }
    });

    // set max year
    for (var i = 0; i < nIndicators.length;i++){
      if (nIndicators[i].hasOwnProperty('maxyear')){
        __Global.year.Max = parseInt(nIndicators[i].maxyear);
      }
      else if (nIndicators[i].hasOwnProperty('last_etact')){
        //"etact_2017_10_3_8bit_wgs84"
        var tablename_elements = nIndicators[i].last_etact.split('_');
        var last_decade = tablename_elements[1] + '_' + tablename_elements[2] + '_' + tablename_elements[3];
        __Global.decade.Max = last_decade;
      }      
    }
    var maxlabel = App.service.Helper.getComponentExt('yearslider-lbl-max');
    //maxlabel.update('<i class="fa  fa-caret-right"></i> ' + __Global.year.Max);    
    maxlabel.update(__Global.year.Max);
    __Selection['Year'] = __LocalDB.get('Selections.Year', __Global.year.Max);
  }

});