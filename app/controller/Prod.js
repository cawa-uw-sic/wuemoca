/**
* prod controller
*/
Ext.define('App.controller.Prod', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.prod',

  onFormSubmit: function (el, form, val) {
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    polygon.data = App.service.Prod.calcWf();
    polygon.data = polygon.data.map(function(d) {
      var prod_ha_sum = 0;
      var prod_m3_sum = 0;
      __Crop.map(function (crop) {
        crop = crop.id;

        if (crop == 'sum') return false;
        if (!d['yf_' + crop] || !d['firf_' + crop] || !d['price_' + crop] || !d['wf_' + crop]) return false;

        // Валовая продукция
        d['pirf_' + crop] = d['yf_' + crop] * d['firf_' + crop];
        // Продуктивность
        d['prod_$_' + crop] = d['pirf_' + crop] * d['price_' + crop];
        // Продуктивность воды
        d['prod_tm3_' + crop] = (d['pirf_' + crop] / d['wf_' + crop]) / 1000;
        d['prod_$m3_' + crop] = (d['prod_$_' + crop] / d['wf_' + crop]) / 1000000;
        // Продуктивность земли
        d['prod_tha_' + crop] = d['pirf_' + crop] / d['firf_' + crop];
        d['prod_$ha_' + crop] = d['prod_$_' + crop] / d['firf_' + crop];

        prod_ha_sum += d['firf_' + crop] * d['prod_$ha_' + crop];
        prod_m3_sum += d['wf_' + crop] * d['prod_$m3_' + crop];
      });
      // Средне взвешенная продуктивность земли
      d['prod_$ha_avg'] = prod_ha_sum / d['firn'];
      // Средне взвешенная продуктивность воды
      d['prod_$m3_avg'] = prod_m3_sum / d['wf'];
      // Удельная водоподача
      var rains = (d['rains'] * d['firn'] * 0.00001) || 0 ;
      var groundwater = (d['groundwater']  * d['firn'] * 0.00001) || 0;
      d['prod_wf'] = (d['wf_sum'] + groundwater + rains) / d['firn'] * 1000000;
      return d;
    });
    App.service.Polygon.saveAll();
    console.log(polygon);
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
