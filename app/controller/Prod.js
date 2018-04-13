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
      d = App.service.Prod.updateVir(d);
      return d;
    });
     /* var prod_dollha_sum = 0;
      var prod_dollm3_sum = 0;
      var prod_doll_sum = 0;
      var firf_sum = 0;
      //loop through all crops
      __Crop.map(function (crop) {
        var crop_id = crop.id;
        var yf = false;
        var price = false;
        var wf_rate = false;

        if (crop.idx == 0) return false;
 
        //check if yf exists
        if (!d['yf_' + crop_id] || d['yf_' + crop_id] == null || isNaN(d['yf_' + crop_id])) {
          d['yf_' + crop_id] = null;
          d['pirf_' + crop_id] = null;
          d['prod_doll_' + crop_id] = null;
          d['prod_dollha_' + crop_id] = null;
          d['prod_dollm3_' + crop_id] = null;
          d['prod_kgm3_' + crop_id] = null;
        }
        else{
          // Gross output
          d['pirf_' + crop_id] = parseFloat((d['yf_' + crop_id] * d['firf_' + crop_id]).toFixed(1));
          yf = true;
        }
        //check if price exists
        if (!d['c_' + crop_id] || d['c_' + crop_id] == null || isNaN(d['c_' + crop_id])) {
          d['c_' + crop_id] = null;
          d['prod_doll_' + crop_id] = null;
          d['prod_dollha_' + crop_id] = null;
          d['prod_dollm3_' + crop_id] = null;
        }
        else {
          price = true;
        }
        //check if wf_rate exists (yearly crop specific water intake)
        if (!d['wf_rate_' + crop_id] || d['wf_rate_' + crop_id] == null || isNaN(d['wf_rate_' + crop_id])) {
          d['wf_rate_' + crop_id] = null;
          d['prod_kgm3_' + crop_id] = null;
          d['prod_dollm3_' + crop_id] = null;
        }
        else{
          wf_rate = true;
        }
        //calculations based on price
        if (price && yf) {
          // Productivity in $
          d['prod_doll_' + crop_id] = parseFloat((d['pirf_' + crop_id] * d['c_' + crop_id]).toFixed(2));
          // Land Productivity in $/ha
          d['prod_dollha_' + crop_id] = parseFloat((d['prod_doll_' + crop_id] / d['firf_' + crop_id]).toFixed(2));
          prod_dollha_sum += d['firf_' + crop_id] * d['prod_dollha_' + crop_id];      
          prod_doll_sum += d['prod_doll_' + crop_id];   
        }
        //calculations based on water intake
        if (wf_rate && yf){
          // Water productivity in kg/m³
          d['prod_kgm3_' + crop_id] = parseFloat(((d['pirf_' + crop_id] / d['wf_rate_' + crop_id]) / 1000).toFixed(3));
          //calculations based on water intake and price
          if (price){
            // Water productivity in $/m³  
            d['prod_dollm3_' + crop_id] = parseFloat(((d['prod_doll_' + crop_id] / d['wf_rate_' + crop_id]) / 1000000).toFixed(3));
            prod_dollm3_sum += d['wf_rate_' + crop_id] * d['prod_dollm3_' + crop_id];
          }
        }

        //update crop indicators based on firf and firn
        d['uir_' + crop_id] = parseFloat((d['firf_' + crop_id] * 100 / d['firn']).toFixed(2));
        firf_sum += d['firf_' + crop_id];
      });

      // weighted average of land productivity
      d['prod_dollha_avg'] = parseFloat((prod_dollha_sum / d['firn']).toFixed(2));
      
      // weighted average of water productivity
      //check if wf exists
      if (!d['wf'] || d['wf'] == null || isNaN(d['wf'])) {
        d['wf'] = null;
        d['prod_dollm3_avg'] = null;
      }
      else{      
        d['prod_dollm3_avg'] = parseFloat((prod_dollm3_sum / d['wf']).toFixed(2));
      }

      // Sum of productivity in $
      d['prod_doll_sum'] = parseFloat((prod_doll_sum).toFixed(2));

      // Specific water supply
      if (!d['rain'] || d['rain'] == null || isNaN(d['rain'])) {
        d['rain'] = null;
      }
      if (!d['gwc'] || d['gwc'] == null || isNaN(d['gwc'])) {
        d['gwc'] = null;
      }
      var rain = (d['rain'] * d['firn'] * 0.00001) || 0 ;
      var gwc = (d['gwc']  * d['firn'] * 0.00001) || 0;
      d['prod_wf_sum'] = parseFloat(((d['wf_rate_sum'] + gwc + rain) / d['firn'] * 1000000).toFixed(2));
      d['prod_wf'] = parseFloat((d['wf_rate_sum'] / d['firn'] * 1000000).toFixed(2));
      d['prod_gwc'] = parseFloat((gwc / d['firn'] * 1000000).toFixed(2));
      d['prod_rain'] = parseFloat((rain / d['firn'] * 1000000).toFixed(2));

      //update indicators depending on firf and firn
      d['firf_sum'] = firf_sum;
      d['uir_sum'] = parseFloat((firf_sum * 100 / d['firn']).toFixed(2));
      d['fp'] = parseFloat((d['fallow_ha'] * 100 / d['firn']).toFixed(2));

      var cd = 0;
      if (firf_sum > 0){
        cd = 1 - (
          Math.pow((d['firf_cotton']/firf_sum), 2) + 
          Math.pow((d['firf_wheat']/firf_sum), 2) +  
          Math.pow((d['firf_rice']/firf_sum), 2) +  
          Math.pow((d['firf_alfa']/firf_sum), 2) +  
          Math.pow((d['firf_orchard']/firf_sum), 2) +  
          Math.pow((d['firf_garden']/firf_sum), 2) +  
          Math.pow((d['firf_other']/firf_sum), 2) +  
          Math.pow((d['firf_maize']/firf_sum), 2) +
          Math.pow((d['firf_sun']/firf_sum), 2) +  
          Math.pow((d['firf_veg']/firf_sum), 2)
        );
        d['cd'] = parseFloat(cd.toFixed(3));
      }

      // eprod_crop and eprod_avg depending on pirf, firf and c  
      var crops = ['cotton', 'wheat', 'rice'];
      eprod_avg_numerator = 0;
      eprod_avg_denominator = 0;      
      for (var i = 0; i < crops.length; i++) {
        var c = d['c_' + crops[i]];
        if (c != null) { 
          var pirf = d['pirf_' + crops[i]];
          var etf = d['etf_' + crops[i]];
          var firf = d['firf_' + crops[i]];
          if (pirf > 0 && etf > 0 && firf > 0){   
            var eprod = (pirf * c) / (etf * firf * 10);
            d['eprod_' + crops[i]] = parseFloat((eprod).toFixed(3));
            eprod_avg_numerator += (eprod * etf * firf);
            eprod_avg_denominator += (etf * firf);
          }
        }
      }

      // eprod_avg (weighted average)
      var eprod_avg = 0;
      if (eprod_avg_numerator > 0 && eprod_avg_denominator > 0){    
        eprod_avg = eprod_avg_numerator / eprod_avg_denominator;
        d['eprod_avg'] = parseFloat((eprod_avg).toFixed(3));
      }

      //vir depending on firn and wf
      if (!d['etf_non'] || d['etf_non'] == null || isNaN(d['etf_non'])) {
        d['etf_non'] == null;
      }
      if (d['etf_non'] != null && d['wf'] != null){
        d['vir'] = parseFloat(((d['etf_non'] * d['firn']) / (d['wf'] * 100000)).toFixed(2));
      }

      return d;
    });*/

    App.service.Polygon.windowChart.close();
    App.service.Polygon.saveAll();
    App.service.Polygon.rerenderFeatures();
    App.service.Prod.window.close();
    App.service.Polygon.showChartWindow();
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
