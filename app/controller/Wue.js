/**
* wue controller
*/
Ext.define('App.controller.Wue', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.wue',

  onFormSubmit: function (el, form, val) {
    App.service.Wue.polygon = App.service.Polygon.getSelectedPolygons()[0];
    var vals = el.up().up().getValues();

    /*
      items[48].data:{  //wf values of all first decades of month in 2016
        decade: 1,
        m4: "33.22",  //first decade of April
        m5: "33.08",  //first decade of May
        m6: "17.50",  //first decade of June
        m7: "49.29",  //etc.
        m8: "40.60",
        m9: "10.60",
        year: 2016
      },
      items[49].data:{  //wf values of all second decades of month in 2016
        decade: 2,
        m4: "34.06",  //second decade of April
        m5: "26.61",  //second decade of May
        m6: "33.11",  //second decade of June
        m7: "51.91",  //etc.
        m8: "36.20",
        year: 2016
      },
      items[50].data:{  //wf values of all third decades of month in 2016
        decade: 3,
        m4: "35.31",  //third decade of April
        m6: "46.48",  //third decade of June
        m7: "51.26",  //third decade of July
        m8: "28.64",  //etc.
        m9: "3.75",
        year: 2016
      }
    */
    App.service.Polygon.windowChart.close();
    App.service.Wue.saveWfValues(vals.period);
    App.service.Wue.calculateMonthlyDecadal();
  },

  onFormImport: function (el, val) {
    App.service.Wue.polygon = App.service.Polygon.getSelectedPolygons()[0];
    App.service.Wue.parseExcel(el.getEl().down('input[type=file]').dom.files[0]);
  },

  onFileSelection: function (field) {
    var fileInputEl = field.getTrigger('filebutton').component.fileInputEl.dom;
    fileInputEl.setAttribute('accept', '.xls');
  },

  onPeriodChange: function (el, newval, oldvalue) {
    App.service.Wue.polygon = App.service.Polygon.getSelectedPolygons()[0];
    var container = App.service.Helper.getComponentExt('app-wue-container');
    App.service.Wue.saveWfValues(oldvalue.period);
    container.removeAll();
    container.add({ xtype: 'app-wue-form-by-' + newval.period });
    App.service.Helper.getComponentExt('wue-btn-import').button.setText(
      i18n.wue.btnImport1 + " '" + i18n.wue[newval.period] + "' " + i18n.wue.btnImport2
    );
  },

  onRenderFormByYear: function (el) {
    App.service.Wue.polygon = App.service.Polygon.getSelectedPolygons()[0];
    //App.service.Wue.renderFormByYear(el);
    App.service.Wue.renderForm('year');
  },

  onRenderFormByMonth: function (el) {
    App.service.Wue.polygon = App.service.Polygon.getSelectedPolygons()[0];
    //App.service.Wue.renderFormByMonth(el);
        App.service.Wue.renderForm('month');
  },

  onRenderFormByDecade: function (el) {
    App.service.Wue.polygon = App.service.Polygon.getSelectedPolygons()[0];
    //App.service.Wue.renderFormByDecade(el);
        App.service.Wue.renderForm('decade');
  },

  onBtnTemplate: function (el) {
    var period = el.itemId.replace('wue-import-', '');
    App.service.Helper.openDocument(
      Ext.getResourcePath('templates/' + period + '.xls', null, ''), 
      'import',
      null
    );
  }

});
