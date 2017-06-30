/**
* wue controller
*/
Ext.define('App.controller.Wue', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.wue',

  onFormSubmit: function (el, form, val) {
    var vals = el.up().up().getValues();
    console.log(vals);
  },

  onPeriodChange: function (el, val) {
    var container = App.service.Helper.getComponentExt('app-wue-container');
    container.removeAll();
    container.add({ xtype: 'app-wue-form-by-' + val.period });
  },

  onRenderFormByYear: function (el) {
    var items = [];
    for (var i = __Global.year.Min; i <= __Global.year.Max; i++) {
      items.push({ fieldLabel: i + ':', name: i.toString() });
    }

    el.add(items);
  },

  onRenderFormByMonth: function (el) {
    var data = [];
    for (var i = __Global.year.Min; i <= __Global.year.Max; i++) {
      data.push({ year: i });
    }

    el.getStore('wue-month').loadData(data);
  },

  onRenderFormByDecade: function (el) {
    var decades = ["I", "II", "III"];
    var data = [];
    for (var year = __Global.year.Min; year <= __Global.year.Max; year++) {
      for (var decade = 0; decade <= 2; decade++) {
        data.push({ year: year, decade: decades[decade] });
      }
    }

    el.getStore('wue-decade').loadData(data);
  }

});
