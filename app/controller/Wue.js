/**
* wue controller
*/
Ext.define('App.controller.Wue', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.wue',

  onFormSubmit: function (el, form, val) {
    App.service.Wue.polygon = App.service.Polygon.getSelectedPolygons()[0];
    var vals = el.up().up().getValues();
    if (vals.period == 'year'){
      //Ext.getStore('wue-month').getData().items
      console.log(vals);
      App.service.Wue.calculateVir_annual(vals);
    }
    else{
      //items["0"].data.m4
      //items["0"].data.year
      //items["0"].data.decade
      App.service.Polygon.windowChart.close();
      console.log(Ext.getStore('wue-' + vals.period).getData().items["0"].data);
      App.service.Wue.calculateMonthlyDecadal(Ext.getStore('wue-' + vals.period).getData().items);
    }
    App.service.Wue.window.close();
  },

  onPeriodChange: function (el, val) {
    var container = App.service.Helper.getComponentExt('app-wue-container');
    container.removeAll();
    container.add({ xtype: 'app-wue-form-by-' + val.period });
  },

  onRenderFormByYear: function (el) {
    var items = [];
    var polygon = App.service.Polygon.getSelectedPolygons()[0];

      for (var year = __Global.year.Min; year <= __Global.year.Max; year++) {
        var itemyear = {};
        itemyear['fieldLabel'] = year.toString();
        itemyear['name'] = year.toString();
        //load water intake if stored from previous input
        for (d = 0; d < polygon.data.length; ++d) {
          if (polygon.data[d]['year'] == year){
            var wf = polygon.data[d]['wf'];
            if (!!wf){
              itemyear['value'] = wf;
            }
            break;
          }
        }
        items.push(itemyear);
      }
    el.add(items);
  },

  onRenderFormByMonth: function (el) {
    var data = [];
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    console.log(polygon);
    for (var year = __Global.year.Min; year <= __Global.year.Max; year++) {
      var datayear = {};
      datayear['year'] = year;
      //load water intake if stored from previous input
      for (d = 0; d < polygon.data.length; ++d) {
        if (polygon.data[d]['year'] == year){
          for (var month = 3; month <= 10; month++) {
            var wf = polygon.data[d]['wf_m' + month];
            if (!!wf){
              datayear['m' + month] = wf;
            }
          }
          break;
        }
      }
      data.push(datayear);
    }
    el.getStore('wue-month').loadData(data);
  },

  onRenderFormByDecade: function (el) {
    //var decades = ["I", "II", "III"];
    var data = [];
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    for (var year = __Global.year.Min; year <= __Global.year.Max; year++) {
      for (var decade = 1; decade <= 3; decade++) {
        var datayear = {};
        datayear['year'] = year;
        datayear['decade'] = decade;
        //load water intake if stored from previous input
        for (d = 0; d < polygon.data.length; ++d) {
          if (polygon.data[d]['year'] == year){
            for (var month = 3; month <= 10; month++) {
              var wf = polygon.data[d]['wf_m' + month + '_' + decade];
              if (!!wf){
                datayear['m' + month] = wf;
              }
            }
            break;
          }
        }
        data.push(datayear);
      }
    }

    el.getStore('wue-decade').loadData(data);
  }

});
