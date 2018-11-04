Ext.define('App.service.Loss', {

  singleton: true,

  requires: [
    'App.util.Window'
  ],

  window: Ext.create('App.util.Window', {
    cls: 'polygon-window',
    title: i18n.loss.title,
    items: [{ xtype: 'app-loss-form-tab' }],
    modal: true,
    height: 500,
    width: 1000,
    resizable: true,
    maximizable: true
  }),

  loadData: function () {
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    var store = Ext.getStore('loss');
    store.removeAll();

    store.loadData(App.service.Loss.initData(polygon.loss, 'input'));
  },

  saveInputData: function () {
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    polygon.loss = [];
    var store = Ext.getStore('loss');
    store.getData().each(function (rec) {
      var data = App.service.Loss.isValid(rec.getData());
      if (data) polygon.loss.push(data);
    });
    polygon.loss = App.service.Loss.groupData(polygon.loss);
    App.service.Polygon.saveAll();
  },

  isValid: function (data) {
    var isValid = false;

    main_loop:
    for (var month = 4; month <= 9; month++) {
      for (var decade = 1; decade <= 3; decade++) {
        if (data[App.service.Loss.getKey(month, decade)]) {
          isValid = true;
          break main_loop;
        }
      }
    }

    return isValid ? data : false;
  },

  initData: function (results, type) {
    var data = [];

    var indicators = (type == 'calc') ? __LossCalcIndicators : __LossInputIndicators;

    var maxYear = App.service.Loss.getMaxYear();
    for (var year = __Global.year.Min; year <= maxYear; year++) {
      indicators.map(function (indicator) {
        var rec = {
          alias: indicator.id,
          name: indicator[__Global.lang + 'Name'],
          unit: indicator[__Global.lang + 'Unit'],
          year: year,
          formula: indicator.formula,
          fromServer: indicator.fromServer
        };

        for (var month = 4; month <= 9; month++) {
          for (var decade = 1; decade <= 3; decade++) {
            var val = '';
            if (results && results[year] && results[year][indicator.id]) {
              val = App.service.Loss.roundResult(results[year][indicator.id][App.service.Loss.getKey(month, decade)]);
            }
            rec[App.service.Loss.getKey(month, decade)] = val;
          }
        }

        data.push(rec);

      });
    }
    return data;
  },

  roundResult: function (result) {
    if (typeof result == 'string') {
      result = parseFloat(result);
    }
    if (isNaN(result)) return '';
    if (typeof result == 'number') {
      result = result.toFixed(2);
    }
    return result;
  },

  calcData: function () {
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    var result = {};
    data = polygon.loss;
    try {
      __LossCalcIndicators.map(function (indicator) {
        for (var year in data) {
          for (var month = 4; month <= 9; month++) {
            for (var decade = 1; decade <= 3; decade++) {
              var formula = indicator.formula;
              var dataFound = false;
              var singleMatch = formula.match(/{(.*?)}/g);
              var sumarizeMatch = formula.match(/\[(.*?)\]/g);

              singleMatch && singleMatch.map(function(el) {
                if (data[year][el.slice(1, -1)][App.service.Loss.getKey(month, decade)]) {
                  dataFound = true;
                  formula = formula.replace(el, data[year][el.slice(1, -1)][App.service.Loss.getKey(month, decade)]);
                }
              });

              sumarizeMatch && sumarizeMatch.map(function(el) {
                if (data[year][el.slice(1, -1)][App.service.Loss.getKey(month, decade)]) {
                  dataFound = true;
                  var values = [];
                  for (var key in data[year][el.slice(1, -1)]) {
                    if (data[year][el.slice(1, -1)].hasOwnProperty(key)) {
                      if (data[year][el.slice(1, -1)][key]) values.push(data[year][el.slice(1, -1)][key]);
                    }
                  }
                  formula = formula.replace(el, '(' + values.join(' + ') + ')');
                }
              });

              if (!data[year][indicator.id]) data[year][indicator.id] = {};
              if (dataFound) {
                try { data[year][indicator.id][App.service.Loss.getKey(month, decade)] = eval(formula); } catch (err) { console.log(err.message) }
              } else {
                data[year][indicator.id][App.service.Loss.getKey(month, decade)] = '';
              }
            }
          }
        }
      });
    } catch (err) {
      console.log(err.message);
    }
    return data;
  },

  groupData: function (data) {
    var result = {};
    data.map(function (rec) {
      if (!result[rec.year]) result[rec.year] = {};
      if (!result[rec.year][rec.alias]) result[rec.year][rec.alias] = {};

      for (var month = 4; month <= 9; month++) {
        for (var decade = 1; decade <= 3; decade++) {
          result[rec.year][rec.alias][App.service.Loss.getKey(month, decade)] = rec[App.service.Loss.getKey(month, decade)];
        }
      }

    });

    return result;
  },

  getMaxYear: function () {
    var maxYear = __Global.year.Max;
    var decadeMaxYear = parseInt(__Global.decade.Max.split('_')[0]);
    if (decadeMaxYear > maxYear){
      maxYear = decadeMaxYear;
    }
    return maxYear;
  },

  getKey: function (month, decade) {
    return 'm_0' + month + '_' + decade;
  },

  submitData: function () {
    App.service.Loss.setStatus(true);
    App.service.Loss.saveInputData();
    App.service.Loss.fetchET(function (response) {
      var results = App.service.Loss.calcData();
      App.service.Loss.setStatus(false);
      App.service.Loss.showResults(results);
      App.service.Loss.loadData();
    });
  },

  setStatus: function (loading) {
    var status = App.service.Helper.getComponentExt('loss-status');
    var btn = App.service.Helper.getComponentExt('loss-btn-submit');
    if (loading) {
      btn.setDisabled(true);
      status.showBusy();
      status.setStatus(i18n.loss.status);
    } else {
      status.clearStatus();
      btn.setDisabled(false);
    }
  },

  showResults: function (results) {
    var data = App.service.Loss.initData(results, 'calc');
    var store = Ext.getStore('lossresult');
    store.removeAll();
    store.loadData(data);
    App.service.Helper.getComponentExt('loss-form-tab').setActiveTab(1)
  },

  showWindow: function () {
    var store = Ext.getStore('lossresult');
    store.removeAll();
    App.service.Loss.loadData();
    App.service.Loss.window.show();
    App.service.Helper.getComponentExt('loss-form-tab').setActiveTab(0);
  },

  getParams: function () {
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    var params = {};
    params.wkt_geometry = polygon.wkt_geometry;

    var years = [];
    for (var year in polygon.loss) {
      years.push(year);
    }
    if (years.length == 0) return false;

    params.max_year = App.service.Helper.arrayMax(years);
    params.min_year = App.service.Helper.arrayMin(years);

    return params;
  },

  fetchET: function (callback) {
    var params = App.service.Loss.getParams();
    if (!params) return false;

    Ext.Ajax.request({
      url: __Global.api.ET,
      timeout: 1000000,
      method: 'POST',
      params: params,
      success: function(response) {
        var results = Ext.decode(response.responseText);
        if (results.length > 0) {
          var polygon = App.service.Polygon.getSelectedPolygons()[0];
          polygon.loss = Ext.merge({}, polygon.loss, App.service.Loss.groupData(results));
          App.service.Polygon.saveAll();
        }
        callback(response);
      },
      failure: function(response){
        console.log('failure ' + response.responseText);
      }
    });
  },

  getMinMaxYearByInput: function () {
    var maxYear = __Global.year.Max;
    var decadeMaxYear = parseInt(__Global.decade.Max.split('_')[0]);
    if (decadeMaxYear > maxYear){
      maxYear = decadeMaxYear;
    }
    return maxYear;
  }
});
