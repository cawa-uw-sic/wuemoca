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

  onFormImport: function (el, val) {
    App.service.Wue.parseExcel(el.getEl().down('input[type=file]').dom.files[0]);
  },

  onPeriodChange: function (el, val) {
    var container = App.service.Helper.getComponentExt('app-wue-container');
    container.removeAll();
    container.add({ xtype: 'app-wue-form-by-' + val.period });
  },

  onRenderFormByYear: function (el) {
    App.service.Wue.renderFormByYear(el);
  },

  onRenderFormByMonth: function (el) {
    App.service.Wue.renderFormByMonth(el);
  },

  onRenderFormByDecade: function (el) {
    App.service.Wue.renderFormByDecade(el);
  },

  onBtnTemplate: function (el) {
    var period = el.itemId.replace('wue-import-', '');
    window.open("/resources/templates/" + period + '.xls');
  }

});
