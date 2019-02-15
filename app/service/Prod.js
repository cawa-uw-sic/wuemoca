Ext.define('App.service.Prod', {

  singleton: true,

  isBusy: false,

  polygon: false,

  progressBar: false,

  requires: [
    'App.util.Window'
  ],

  window    : Ext.create('App.util.Window', {
    cls: 'polygon-window',
    title: i18n.prod.windowTitle,
    items: [{ xtype: 'app-prod-form' }],
    modal: true,
    height: 500,
    width: 800,
    resizable: false,
    listeners:{
      close: function () {
      }
    }
  }),


  renderFormByYear: function (crop) {
    var cropname = '';
    __Crop.map(function (crop_object) {
      if (crop_object.id == crop){
        cropname = crop_object[__Global.lang + 'Name'];
      }
    });
    //var indicators = ['firf', 'prod_yf', 'c'];
    var el = App.service.Helper.getComponentExt('prod-form-by-year');
    el.removeAll();
    var polygon = App.service.Polygon.getSelectedPolygons()[0]; 

    //copy pirf and yf (RS-based) to prod_pirf and prod_yf (statistics) if not yet existent
    polygon.data = polygon.data.map(function(d) {
      var prod_pirf = true;
      var pirf = false;
      if (!d['prod_pirf_' + crop] || d['prod_pirf_' + crop] == null || isNaN(d['prod_pirf_' + crop])) { 
        prod_pirf = false;
      }
      if (d['pirf_' + crop] && d['pirf_' + crop] != null && !isNaN(d['pirf_' + crop])) { 
        pirf = true;
      }
      if (pirf && !prod_pirf){
        d['prod_pirf_' + crop] = d['pirf_' + crop];
      }
      var prod_yf = true;
      var yf = false;
      if (!d['prod_yf_' + crop] || d['prod_yf_' + crop] == null || isNaN(d['prod_yf_' + crop])) { 
        prod_yf = false;
      }
      if (d['yf_' + crop] && d['yf_' + crop] != null && !isNaN(d['yf_' + crop])) { 
        yf = true;
      }
      if (yf && !prod_yf){
        d['prod_yf_' + crop] = d['yf_' + crop];
      }      
      return d;
    });


    var indicators = [];    
    __Indicator.map(function (indicator) {
      if (!!indicator.prodform && indicator.prodform == '1-noyears'){
        indicators.push(indicator);
      }
    });  
    __Indicator_userPolygon.map(function (indicator) {
      if (!!indicator.prodform && indicator.prodform == '1-noyears'){
        indicators.push(indicator);
      }
    });     

    var formitems = [];

    /*formitems.push({
      xtype: 'label', 
      html: i18n.prod.fulldata
    }); */
    var firstrow = {
      items: []
    };
    indicators.map(function (indicator) {
      var newindicatorname = '';
      if (__Global.lang == 'en'){
        newindicatorname = indicator[__Global.lang + 'Name'].replace(/crop/gi, cropname);
      }
      else{
        var indicatorname = indicator[__Global.lang + 'Name'];
        if (indicatorname.indexOf('культур') != -1){
          newindicatorname = indicatorname.replace(/культур/gi, cropname);
        }
        else{
          newindicatorname = indicatorname + ' ' + cropname;
        }
      }
      var label = '<a data-qtip="' + indicator[__Global.lang + 'ProdTooltip'] + 
          '" target="glossary"><i class="fa fa-info" style="padding:0 10px 0 5px;"></i></a>' + 
          newindicatorname + ' [' + indicator[__Global.lang + 'Unit'] + ']';
      var numberfield = {
        xtype: 'numberfield',
        fieldLabel: label,
        value: polygon.data[0][indicator.id + '_' + crop] || '',
        name: indicator.id + '_' + crop + '_all_years',
        listeners: { change: 'onInputChange' },
        // Remove spinner buttons, and arrow key and mouse wheel listeners
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false        
      }
      firstrow.items.push(numberfield);    
    });
    firstrow.items.push({
      xtype: 'label', 
      html: i18n.prod.userinput + '<br>' + i18n.prod.fulldata,
      padding: '8px 0 0 20px'

    });    
    formitems.push(firstrow); 
    indicators = [];    
    __Indicator.map(function (indicator) {
      if (!!indicator.prodform && indicator.prodform == '1-years'){
        indicators.push(indicator);
      }
    });  
    __Indicator_userPolygon.map(function (indicator) {
      if (!!indicator.prodform && indicator.prodform == '1-years'){
        indicators.push(indicator);
      }
    });     
    var width = (85 / indicators.length) * 0.01;

    var labels = [];
    labels.push(i18n.wue.year);
    indicators.map(function (indicator) {  
      var newindicatorname = '';
      if (__Global.lang == 'en'){
        newindicatorname = indicator[__Global.lang + 'Name'].replace(/crop/gi, cropname);
      }
      else{
        var indicatorname = indicator[__Global.lang + 'Name'];
        if (indicatorname.indexOf('культур') != -1){
          newindicatorname = indicatorname.replace(/культур/gi, cropname);
        }
        else{
          newindicatorname = indicatorname + ' ' + cropname;
        }
      }
      var label = '<a data-qtip="' + indicator[__Global.lang + 'ProdTooltip'] + 
        '"><i class="fa fa-info" style="padding:0 10px 0 5px;"></i></a>' + 
        newindicatorname + ' [' + indicator[__Global.lang + 'Unit'] + ']'  +
        '<a id="' + indicator.id + '_' + crop + '" href="#" onclick="App.service.Prod.deleteValues(this.id);" data-qtip="delete all ' + newindicatorname + ' values' +
        '"><i class="fa fa-times-circle" style="padding:0 5px 0 10px;"></i></a>';
      labels.push(label);
    });

    var labelitems = {
      defaults: {
        xtype: 'label',
        columnWidth: width,
        margin: '10 10 10 0'
      },

      items: []
    };

    labels.map(function (label) {
      var obj = { html: label }
      if (label == i18n.wue.year) {
        obj.columnWidth = 0.10;
      }
      labelitems.items.push(obj);
    });
    formitems.push(labelitems);   

    for (var year = __Global.year.Max; year >= __Global.year.Min; year--) {
      var numberfields = {
        defaults: {
          xtype: 'numberfield',
          columnWidth: width,
          margin: '2 10 0 0',
          listeners: { change: 'onInputChange' },
          // Remove spinner buttons, and arrow key and mouse wheel listeners
          hideTrigger: true,
          keyNavEnabled: false,
          mouseWheelEnabled: false          
        },

        items: []
      };

      var label = { xtype: 'label', html: year.toString(), margin: '10 20 0 0', columnWidth: 0.10 };
      numberfields.items.push(label);

      indicators.map(function (indicator) {
        var index = polygon.data.map(function (d) { return d.year }).indexOf(year);
        var val = (index >= 0) ? polygon.data[index][indicator.id + '_' + crop] : 0;
        numberfields.items.push({ name: indicator.id + '_' + crop + '_' + year, value: val });
      });
      formitems.push(numberfields);
    }
    el.add(formitems);
  },

  deleteValues: function(ind){
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    for (d = 0; d < polygon.data.length; ++d) {
      polygon.data[d][ind] = 0;
    }
    App.service.Polygon.saveAll();
    if (!!ind.split('_')[2]){
      App.service.Prod.renderFormByYear(ind.split('_')[2]);
    }    
    else if (!!ind.split('_')[1]){
      App.service.Prod.renderFormByYear(ind.split('_')[1]);
    }
    else{
      App.service.Prod.renderFormSecondary();
    }
  },

  renderFormSecondary: function () {
    var self = this;
    var el = App.service.Helper.getComponentExt('prod-form-secondary');
    el.removeAll(); 
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    var indicators = [];    
    __Indicator.map(function (indicator) {
      if (!!indicator.prodform && indicator.prodform == '2-noyears'){
        indicators.push(indicator);
      }
    });  
    __Indicator_userPolygon.map(function (indicator) {
      if (!!indicator.prodform && indicator.prodform == '2-noyears'){
        indicators.push(indicator);
      }
    });        
    //var indicators = ['firn', 'gwc', 'kpd'];
    var width = (90 / indicators.length) * 0.01;

    var formitems = [];

    var numberfields = {
      defaults: {
        xtype: 'numberfield',
        columnWidth: width,
        margin: '2 10 0 0',
        listeners: { change: 'onInputChange' },
        // Remove spinner buttons, and arrow key and mouse wheel listeners
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false        
      },

      items: []
    };

    indicators.map(function (indicator) {
      var val = polygon.data[0][indicator.id];
      numberfields.items.push({ 
        name: indicator.id, 
        value: val, 
        fieldLabel: '<a data-qtip="' + indicator[__Global.lang + 'ProdTooltip'] + 
        '""><i class="fa fa-info" style="padding:0 10px 0 5px;"></i></a>' + 
        indicator[__Global.lang + 'Name'] + ' [' + indicator[__Global.lang + 'Unit'] + ']' 
      });
    });

    formitems.push(numberfields);

    indicators = [];    
    __Indicator.map(function (indicator) {
      if (!!indicator.prodform && indicator.prodform == '2-years'){
        indicators.push(indicator);
      }
    });  
    __Indicator_userPolygon.map(function (indicator) {
      if (!!indicator.prodform && indicator.prodform == '2-years'){
        indicators.push(indicator);
      }
    });
    indicators.map(function (indicator) { 
      var fieldset = {
        xtype: 'fieldset',
        title: '<a data-qtip="' + indicator[__Global.lang + 'ProdTooltip'] + 
          '"><i class="fa fa-info" style="padding:0 10px 0 5px;"></i></a>' + indicator[__Global.lang + 'Name'] + ' [' + indicator[__Global.lang + 'Unit'] + ']'  +
          '<a id="' + indicator.id + '" href="#" onclick="App.service.Prod.deleteValues(this.id);" data-qtip="delete all ' + indicator[__Global.lang + 'Name'] + ' values' +
         '"><i class="fa fa-times-circle" style="padding:0 5px 0 10px;"></i></a>',
        width: 735,
        defaults: {
          xtype: 'numberfield',
          columnWidth: 0.20,
          margin: '2 10 0 0',
          listeners: { change: 'onInputChange' },
          // Remove spinner buttons, and arrow key and mouse wheel listeners
          hideTrigger: true,
          keyNavEnabled: false,
          mouseWheelEnabled: false        
        },

        items: []
      };
      for (var year = __Global.year.Max; year >= __Global.year.Min; year--) {

        var index = polygon.data.map(function (d) { return d.year }).indexOf(year);
        var val = (index >= 0) ? polygon.data[index][indicator.id] : 0;
        fieldset.items.push({ name: indicator.id + '_' + year, value: val, fieldLabel: year.toString() });

      }      
      formitems.push(fieldset);
    });

    el.add(formitems);
  },

  // Calculation of corrected water intake based on norms (water rates per crop)
  calcWf: function(d) {
    d['wf_calc_sum'] = 0;
    __Crop.map(function (crop) {
      var crop_id = crop.id;

      if (crop.idx == 0) return false;
      //check if rate exists (crop specific, for all years equal)
      if (!d['rate_' + crop_id] || d['rate_' + crop_id] == null || isNaN(d['rate_' + crop_id])) {
        d['rate_' + crop_id] = null;
      }
      else{
        //calculate crop specific yearly water intake only if yearly overall water intake is present
        if (!d['wf'] || d['wf'] == null || isNaN(d['wf'])) {   
          d['wf_calc_' + crop_id] = null;
        }
        else{
          d['wf_calc_' + crop_id] = parseFloat((d['rate_' + crop_id] * d['firf_' + crop_id] * 0.000001).toFixed(2));
          d['wf_calc_sum'] += d['wf_calc_' + crop_id];
        }
      }

    });
    if (!d['wf'] || d['wf'] == null || isNaN(d['wf'])) {   
      d['wf'] = null;
      d['wf_ratio'] = null;
    }
    else{
      d['wf_ratio'] = d['wf_calc_sum'] / d['wf'];
    }

    d['wf_calc_sum'] = 0;

    __Crop.map(function (crop) {
      var crop_id = crop.id;

      if (crop.idx == 0) return false;
      if (d['wf_calc_' + crop_id] == null || d['wf_ratio'] == null) return false;
      d['wf_calc_' + crop_id] = parseFloat((d['wf_calc_' + crop_id] / d['wf_ratio']).toFixed(2));
      d['wf_calc_sum'] += d['wf_calc_' + crop_id];
    });
    if (d['wf_calc_sum'] == 0){
      d['wf_calc_sum'] = null;
    }
    return d;
  },

  calcProd: function(d){
    //var prod_pf_sum = 0;
    var prod_pw_sum = 0;
    var prod_gp_sum = 0;
    var firf_sum_prod_yf = 0;
    var wf_sum_prod_yf = 0;      
    //var pf_sum = 0;
    var pw_sum = 0;
    var gp_sum = 0;   
    var firf_sum_yf = 0;  
    var wf_sum_yf = 0;        

    //loop through all crops
    __Crop.map(function (crop) {
      var crop_id = crop.id;
      var yf = false;
      var prod_yf = false;      
      var price = false;
      var wf_calc = false;

      if (crop.idx == 0) return false;

      //check if yf exists
      if (!d['yf_' + crop_id] 
        || d['yf_' + crop_id] == null 
        || isNaN(d['yf_' + crop_id])
        || parseFloat(d['yf_' + crop_id]) == 0) {
        d['yf_' + crop_id] = null;
        d['pirf_' + crop_id] = null;
        d['gp_' + crop_id] = null;
        d['pf_' + crop_id] = null;
        d['pw_' + crop_id] = null;
        d['yw_' + crop_id] = null;
      }
      else{
        // Crop output
        d['pirf_' + crop_id] = parseFloat((d['yf_' + crop_id] * d['firf_' + crop_id]).toFixed(1));
        yf = true;
      }
      // check if prod_yf exists
      if (!d['prod_yf_' + crop_id] 
        || d['prod_yf_' + crop_id] == null 
        || isNaN(d['prod_yf_' + crop_id])
        || parseFloat(d['prod_yf_' + crop_id]) == 0) {
        d['prod_yf_' + crop_id] = null;
        d['prod_pirf_' + crop_id] = null;
        d['prod_gp_' + crop_id] = null;
        d['prod_pf_' + crop_id] = null;
        d['prod_pw_' + crop_id] = null;
        d['prod_yw_' + crop_id] = null;
      }
      else{
        // Crop output
        d['prod_pirf_' + crop_id] = parseFloat((d['prod_yf_' + crop_id] * d['firf_' + crop_id]).toFixed(1));
        prod_yf = true;
      }      
      //check if price exists
      if (!d['c_' + crop_id] 
        || d['c_' + crop_id] == null 
        || isNaN(d['c_' + crop_id])
        || parseFloat(d['c_' + crop_id]) == 0) {
        d['c_' + crop_id] = null;
        d['prod_gp_' + crop_id] = null;
        d['prod_pf_' + crop_id] = null;
        d['prod_pw_' + crop_id] = null;
        d['gp_' + crop_id] = null;
        d['pf_' + crop_id] = null;
        d['pw_' + crop_id] = null;        
      }
      else {
        price = true;
      }
      //check if wf_calc exists (yearly crop specific water intake)
      if (!d['wf_calc_' + crop_id] 
        || d['wf_calc_' + crop_id] == null 
        || isNaN(d['wf_calc_' + crop_id])
        || parseFloat(d['wf_calc_' + crop_id]) == 0) {
        d['wf_calc_' + crop_id] = null;
        d['prod_yw_' + crop_id] = null;
        d['prod_pw_' + crop_id] = null;
        d['yw_' + crop_id] = null;
        d['pw_' + crop_id] = null;        
      }
      else{
        wf_calc = true;
      }

      //calculations based on price
      if (price){
        if (yf) {
          // Productivity in $
          d['gp_' + crop_id] = parseFloat((d['pirf_' + crop_id] * d['c_' + crop_id]).toFixed(2));        
          // Land Productivity in $/ha
          if (parseFloat(d['firf_' + crop_id]) > 0){
            d['pf_' + crop_id] = parseFloat((d['gp_' + crop_id] / d['firf_' + crop_id]).toFixed(2));
            //pf_sum += d['firf_' + crop_id] * d['pf_' + crop_id];  
            firf_sum_yf += d['firf_' + crop_id];         
          }
          else{
            d['pf_' + crop_id] = null;
          }     
          gp_sum += d['gp_' + crop_id]; 
        } 
        if (prod_yf) {
          // Productivity in $
          d['prod_gp_' + crop_id] = parseFloat((d['prod_pirf_' + crop_id] * d['c_' + crop_id]).toFixed(2));
          // Land Productivity in $/ha
          if (parseFloat(d['firf_' + crop_id]) > 0){
            d['prod_pf_' + crop_id] = parseFloat((d['prod_gp_' + crop_id] / d['firf_' + crop_id]).toFixed(2));
            //prod_pf_sum += d['firf_' + crop_id] * d['prod_pf_' + crop_id]; 
            firf_sum_prod_yf += d['firf_' + crop_id];
          }
          else{
            d['prod_pf_' + crop_id] = null;
          }     
          prod_gp_sum += d['prod_gp_' + crop_id]; 
        }         
      }
      //calculations based on water intake
      if (wf_calc){
        if (prod_yf){
         // Water productivity in kg/m³
          d['prod_yw_' + crop_id] = parseFloat(((d['prod_pirf_' + crop_id] / d['wf_calc_' + crop_id]) / 1000).toFixed(3));
          //calculations based on water intake and price
          if (price){
            // Water productivity in $/m³  
            d['prod_pw_' + crop_id] = parseFloat(((d['prod_gp_' + crop_id] / d['wf_calc_' + crop_id]) / 1000000).toFixed(3));
            //prod_pw_sum += d['wf_calc_' + crop_id] * d['prod_pw_' + crop_id];
            wf_sum_prod_yf += d['wf_calc_' + crop_id];              
          } 
        }
        if (yf){
         // Water productivity in kg/m³
          d['yw_' + crop_id] = parseFloat(((d['pirf_' + crop_id] / d['wf_calc_' + crop_id]) / 1000).toFixed(3));
          //calculations based on water intake and price
          if (price){
            // Water productivity in $/m³  
            d['pw_' + crop_id] = parseFloat(((d['gp_' + crop_id] / d['wf_calc_' + crop_id]) / 1000000).toFixed(3));
            //pw_sum += d['wf_calc_' + crop_id] * d['pw_' + crop_id];  
            wf_sum_yf += d['wf_calc_' + crop_id];                    
          }          
        }        
      }
    });
    // weighted average of land productivity
    d['prod_pf_avg'] = parseFloat((prod_gp_sum / firf_sum_prod_yf).toFixed(2));
    d['pf_avg'] = parseFloat((gp_sum / firf_sum_yf).toFixed(2));
    
    //weighted average of water productivity
    d['prod_pw_avg'] = null;
    d['pw_avg'] = null;

    if (wf_sum_prod_yf > 0){
      d['prod_pw_avg'] = parseFloat(((prod_gp_sum / wf_sum_prod_yf) / 1000000).toFixed(2));
    }
    if (wf_sum_yf > 0){
      d['pw_avg'] = parseFloat(((gp_sum / wf_sum_yf) / 1000000).toFixed(2));
    }    

    // Sum of productivity in $
    d['prod_gp_sum'] = parseFloat((prod_gp_sum).toFixed(2));
    d['gp_sum'] = parseFloat((gp_sum).toFixed(2));

    // Specific water supply
    if (!d['rain'] || d['rain'] == null || isNaN(d['rain'])) {
      d['rain'] = null;
    }
    if (!d['gwc'] || d['gwc'] == null || isNaN(d['gwc'])) {
      d['gwc'] = null;
    }
    var rain = (d['rain'] * d['firn'] * 0.00001) || 0 ;
    var gwc = (d['gwc']  * d['firn'] * 0.00001) || 0;

    d['prod_wf'] = null;
    d['wf_rel'] = null;

    //check if wf exists
    var wf = 0;
    if (d['wf'] != null){
      wf = parseFloat(d['wf']);
    }
    //if no sum of crop water intakes is available, the total water intake wf is used as input
    if (wf_sum_prod_yf > 0){
      d['prod_wf'] = parseFloat(((wf_sum_prod_yf + gwc + rain) / d['firn'] * 1000000).toFixed(2));
      d['wf_rel'] = parseFloat((wf_sum_prod_yf / d['firn'] * 1000000).toFixed(2));
    }
    else if (wf > 0){
      d['prod_wf'] = parseFloat(((wf + gwc + rain) / d['firn'] * 1000000).toFixed(2));
      d['wf_rel'] = parseFloat((wf / d['firn'] * 1000000).toFixed(2));
    }
    d['gwc_rel'] = parseFloat((gwc / d['firn'] * 1000000).toFixed(2));
    d['rain_rel'] = parseFloat((rain / d['firn'] * 1000000).toFixed(2));

    return d;    
  },

  updateOtherIndicators: function(d){
    var firf_sum = 0;
    //firf of cotton, wheat and rice
    var firf_sum_cwr = 0;
    //loop through all crops
    __Crop.map(function (crop) {
      var crop_id = crop.id;
      if (crop.idx == 0) return false;
      //update crop indicators based on firf and firn
      d['uir_' + crop_id] = parseFloat((d['firf_' + crop_id] * 100 / d['firn']).toFixed(2));
      firf_sum += d['firf_' + crop_id];
    });
    //update indicators depending on firf and firn
    d['firf_sum'] = parseFloat(firf_sum.toFixed(1));
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

    // eprod_crop, eprod_avg and vc_avg depending on pirf, firf and c  
    var crops = ['cotton', 'wheat', 'rice'];
    var eprod_avg_numerator = 0;
    var eprod_avg_denominator = 0;  
    var vc_avg_numerator = 0;        
    for (var i = 0; i < crops.length; i++) {
      d['eprod_' + crops[i]] = null;
      var c = d['c_' + crops[i]];
      var pirf = d['pirf_' + crops[i]];
      var etf = d['etf_' + crops[i]];
      var firf = d['firf_' + crops[i]];   
      var vc = d['vc_' + crops[i]];  
      if (c != null && c > 0) { 
        var pirf = d['pirf_' + crops[i]];
        var etf = d['etf_' + crops[i]];
        var firf = d['firf_' + crops[i]];
        if (pirf > 0 && etf > 5 && firf > 0){   
          var eprod = (pirf * c) / (etf * firf * 10);
          d['eprod_' + crops[i]] = parseFloat(eprod.toFixed(3));
          eprod_avg_numerator += (eprod * etf * firf);
          eprod_avg_denominator += (etf * firf);
        }
      }
      vc_avg_numerator += vc * firf;
      firf_sum_cwr += firf;
    }

    // eprod_avg (weighted average)
    d['eprod_avg'] = null;
    if (eprod_avg_numerator > 0 && eprod_avg_denominator > 0){    
      var eprod_avg = eprod_avg_numerator / eprod_avg_denominator;
      d['eprod_avg'] = parseFloat(eprod_avg.toFixed(3));
    }
    // vc_avg (weighted average)
    d['vc_avg'] = null;
    if (vc_avg_numerator > 0){    
      var vc_avg = vc_avg_numerator / firf_sum_cwr;
      d['vc_avg'] = parseFloat(vc_avg.toFixed(3));
    }    

    return d;
  },

  updateVir: function(d){
    //vir depending on firn and wf
    d['vir'] = null;
    if (!d['etf_non'] || d['etf_non'] == null || isNaN(d['etf_non'])) {
      d['etf_non'] = null;
    }
    if (d['etf_non'] != null && d['wf'] != null){
      d['vir'] = parseFloat(((d['etf_non'] * d['firn']) / (d['wf'] * 100000)).toFixed(2));
    }
    return d;
  }

});
