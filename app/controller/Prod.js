/**
* prod controller
*/
Ext.define('App.controller.Prod', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.prod',

  onFormSubmit: function (el, form, val) {
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    //polygon.data = 
    polygon.data = polygon.data.map(function(d) {
      d = App.service.Prod.calcWf(d);
      d = App.service.Prod.calcProd(d);
      d = App.service.Prod.updateOtherIndicators(d);
      //d = App.service.Prod.updateVir(d);
      return d;
    });

    App.service.Polygon.windowChart.close();
    App.service.Polygon.saveAll();
    App.service.Polygon.rerenderFeatures();

    App.service.Prod.window.close();

    //switch to vir indicator so the user sees the results immediatly
    var indicator = App.service.Watcher.getIndicator();
    if ((!!indicator.enGroup_userDB && indicator.enGroup_userDB.indexOf('Productivity') != -1)
      || (!!indicator.enGroup && indicator.enGroup.indexOf('Productivity') != -1)){
    }
    else{
      App.service.Watcher.set('Indicator', 'prod_wf');
      App.service.Helper.setComponentsValue([{id: 'switcher-cb-indicator', selection: 'Indicator'}]);
    }
    Ext.Msg.show({
      cls: 'polygon-window',
      title: i18n.prod.calculateProd,
      message: i18n.prod.calculateProdSuccess,
      buttons: Ext.Msg.OK,
      fn: function(btn) {
        if (btn === 'ok') {
          App.service.Polygon.showChartWindow();
        }
      }
    });   
    
  },

  onCropChange: function (el) {
    App.service.Prod.renderFormByYear(el.getItemId());
  },

  onRenderFormByYear: function () {
    App.service.Prod.renderFormByYear('cotton');
  },

  onRenderFormSecondary: function () {
    App.service.Prod.renderFormSecondary();
  },

  onInputChange: function (el, val) {
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    var query = el.getName().split('_');
    val = parseFloat(val);

    function getIndex(year) {
      var index = polygon.data.map(function(d) { return d.year }).indexOf(parseInt(year));
      if (index < 0) {
        polygon.data.push({ year: parseInt(year)});
        index = polygon.data.length - 1;
      }
      return index;
    };

    switch(query.length) {
      case 4:
        polygon.data = polygon.data.map(function(d) {
          d[query[0] + '_' + query[1]] = val;
          return d;
        });
        break;
      case 3:
        polygon.data[getIndex(query[2])][query[0] + '_' + query[1]] = val;
        break;
      case 2:
        polygon.data[getIndex(query[1])][query[0]] = val;
        break;
      case 1:
        polygon.data = polygon.data.map(function(d) {
          d[query[0]] = val;
          return d;
        });
        break;
    }
    App.service.Polygon.saveAll();
  }

});
