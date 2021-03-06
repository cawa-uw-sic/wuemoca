/**
* Irrigation efficiency calculation tool methods
*/
Ext.define('App.service.Wue', {

  singleton: true,

  isBusy: false,

  polygon: false,

  progressBar: false,

  requires: [
    'App.util.Window'
  ],

  window    : Ext.create('App.util.Window', {
    cls: 'polygon-window',
    title: i18n.wue.windowTitle,
    tools: [{
      tooltip: i18n.wue.resetForm,
      callback: function () {
        var polygon = App.service.Polygon.getSelectedPolygons()[0];
        for (d = 0; d < polygon.data.length; ++d) {
          polygon.data[d]['wf'] = 0;
          for (var month = 4; month <= 9; month++) {
            polygon.data[d]['wf_m' + month] = 0;;                  
            for (var decade = 1; decade <= 3; decade++) {
              polygon.data[d]['wf_m' + month + '_' + decade] = 0;
            }
          }
        }

        App.service.Polygon.saveAll();
        var period = App.service.Helper.getComponentExt('wue-radio').getValue().period;
        App.service.Wue.renderForm(period);
        // switch(period) {
        //   case 'year':
        //     App.service.Wue.renderFormByYear(App.service.Helper.getComponentExt('wue-form-by-' + period));
        //     break;
        //   case 'month':
        //     App.service.Wue.renderFormByMonth(App.service.Helper.getComponentExt('wue-form-by-' + period));
        //     break;
        //   case 'decade':
        //     App.service.Wue.renderFormByDecade(App.service.Helper.getComponentExt('wue-form-by-' + period));
        //     break;
        //   default:
        //     break;
        // }
      }
    },{
      type: 'refresh',
      tooltip: i18n.wue.calculateSums,
      callback: function () {
        App.service.Wue.saveWfValues(App.service.Helper.getComponentExt('wue-radio').getValue().period);
        var polygon = App.service.Polygon.getSelectedPolygons()[0];

        for (d = 0; d < polygon.data.length; ++d) {
          //calculate yearly sum of months
          var yearsum = 0;          
          for (var month = 4; month <= 9; month++) {
            //calculate monthly sum of decades
            var monthsum = 0;
            for (var decade = 1; decade <= 3; decade++) {
              if (!!polygon.data[d]['wf_m' + month + '_' + decade]){
                monthsum += polygon.data[d]['wf_m' + month + '_' + decade];
              }
            }
            if (monthsum > 0){
              polygon.data[d]['wf_m' + month] = monthsum.toFixed(2);
              yearsum += monthsum;
            }
          }
          if (yearsum > 0){
            polygon.data[d]['wf'] = yearsum.toFixed(2);
          }
        }
        App.service.Polygon.saveAll();
        var period = App.service.Helper.getComponentExt('wue-radio').getValue().period;
        App.service.Wue.renderForm(period);
        // switch(period) {
        //   case 'year':
        //     App.service.Wue.renderFormByYear(App.service.Helper.getComponentExt('wue-form-by-' + period));
        //     break;
        //   case 'month':
        //     App.service.Wue.renderFormByMonth(App.service.Helper.getComponentExt('wue-form-by-' + period));
        //     break;
        //   case 'decade':
        //     App.service.Wue.renderFormByDecade(App.service.Helper.getComponentExt('wue-form-by-' + period));
        //     break;
        //   default:
        //     break;
        // }
      }
    }],
    items: [{ xtype: 'app-wue-form' }],
    modal: true,
    height: 500,
    width: 750,
    resizable: false,
    listeners:{
      close: function () {
        var container = App.service.Helper.getComponentExt('app-wue-container');
        container.removeAll();
        if (!!Ext.getStore('wue-month')){
          Ext.getStore('wue-month').removeAll();
        }
        if (!!Ext.getStore('wue-decade')){
          Ext.getStore('wue-decade').removeAll();
        }
      }
    }
  }),

  saveWfValues: function(period){
    var items;
    if (period == 'year'){
      var form = App.service.Helper.getComponentExt('wue-form-by-year');
      items = form.up().up().getValues();
      if (Object.keys(items).length > 1){
        this.setPolygonWfYear([items]);
      }
    }
    else if (!!Ext.getStore('wue-' + period)) {
      items = Ext.getStore('wue-' + period).getData().items;
      if (period == 'month'){
        this.setPolygonWfMonth(items);
      }
      else if (period == 'decade'){
        this.setPolygonWfDecade(items);
      }
    }
  },

  calculateMonthlyDecadal: function(){
    //check for which years water intake is inserted
    var years = [];
    for (var d = 0; d < this.polygon.data.length; ++d){
      // search years with input data and not yet calculated etf
      var year = this.polygon.data[d].year;
      //check if etf is aggregated for this year (check of first decade is sufficient)
      if (this.polygon.data[d]['etf_m4_1'] == null || this.polygon.data[d]['etf_m4'] == null || this.polygon.data[d]['etf_non'] == null){ 
        if (!!this.polygon.data[d]['wf'] && this.polygon.data[d]['wf'] > 0){
          if (years.indexOf(year) == -1){
            years.push(year);
          }
        }        
        for (var month = 4; month <= 9; month++) {
          //water intake > 0
          if (!!this.polygon.data[d]['wf_m' + month] && this.polygon.data[d]['wf_m' + month] > 0){
            if (years.indexOf(year) == -1){
              years.push(year);
            }
          }
          for (var decade = 1; decade <= 3; decade++) {
            //water intake > 0
            if (!!this.polygon.data[d]['wf_m' + month + '_' + decade] && this.polygon.data[d]['wf_m' + month + '_' + decade] > 0){
              if (years.indexOf(year) == -1){
                years.push(year);
              }
            }
          }
        }
      }
    }

    if (years.length > 0){
      var index = 0;
      var msg = i18n.wue.aggregateETact + years[0];
      this.progressBar = Ext.Msg.show({
        cls: 'polygon-window',
        title: i18n.wue.calculateVir,
        msg: msg,
        progressText: '',
        width: 300,
        progress: true,
        closable: false,
        modal: false,
        buttons: Ext.Msg.OK
      });
      this.progressBar.msgButtons.ok.disable();
      this.progressBar.updateProgress(0, '0 %');
      var wkt_geometry = this.polygon.wkt_geometry;
      this.calculateEtf(wkt_geometry, years, 0);
    }
    else{
      this.calculateVir();
    }
  },

  calculateVir: function(){
    var self = this;
    for (d = 0; d < this.polygon.data.length; ++d) {
      //calculate yearly vir (all years)
      var firn = this.polygon.data[d]['firn'];
      var year = this.polygon.data[d]['year'];
      var vir = null;
      var etf = this.polygon.data[d]['etf_non'];
      //water intake input
      var wf = this.polygon.data[d]['wf'];
      if (!wf || wf == null || isNaN(wf)) {
        wf = null;
      }
      else{
        //update water productivity indicators based on wf
        //this.polygon.data[d] = App.service.Prod.calcWf(this.polygon.data[d]);
        //this.polygon.data[d] = App.service.Prod.calcProd(this.polygon.data[d]);
      }
      if (!etf || etf == null || isNaN(etf)) {
        etf = null;
      }
      if (etf != null && wf != null){
        vir = parseFloat(((etf * firn) / (wf * 100000)).toFixed(2));
      }
      //Infinity = divided by zero
      if (vir == Infinity){
        vir = null;
      }
      //save yearly vir
      this.polygon.data[d]['vir'] = vir;

      //calculate monthly vir (for years with user input only)
      for (var month = 4; month <= 9; month++) {
        vir = null;
        etf = this.polygon.data[d]['etf_m' + month];
        if (etf == undefined){
          etf = null;
          //save monthly etf
          this.polygon.data[d]['etf_m' + month] = etf;
        }
        //water intake input
        wf = this.polygon.data[d]['wf_m' + month];
        if (!isNaN(etf) && !isNaN(wf)){
          vir = parseFloat(((etf * firn) / (wf * 100000)).toFixed(2));
        }
        //Infinity = divided by zero
        if (vir == Infinity){
          vir = null;
        }
        //save monthly vir
        this.polygon.data[d]['vir_m' + month] = vir;

        //calculate decadal vir
        for (var decade = 1; decade <= 3; decade++) {
          vir = null;
          etf = this.polygon.data[d]['etf_m' + month + '_' + decade];
          if (etf == undefined){
            etf = null;
            //save decadal etf
            this.polygon.data[d]['etf_m' + month + '_' + decade] = etf;
          }
          wf = this.polygon.data[d]['wf_m' + month + '_' + decade];
          if (!isNaN(etf) && !isNaN(wf)){
            vir = parseFloat(((etf * firn) / (wf * 100000)).toFixed(2));
          }
          //Infinity = divided by zero
          if (vir == Infinity){
            vir = null;
          }
          //save decadal vir
          this.polygon.data[d]['vir_m' + month + '_' + decade] = vir;
        }
      }
    }
    App.service.Polygon.saveAll();
    App.service.Polygon.rerenderFeatures();
    this.window.close();
    //switch to vir indicator so the user sees the results immediatly
    if (App.service.Watcher.get('Indicator') != 'vir'){
      App.service.Watcher.set('Indicator', 'vir');
      App.service.Helper.setComponentsValue([{id: 'switcher-cb-indicator', selection: 'Indicator'}]);
    }
    Ext.Msg.show({
      cls: 'polygon-window',
      title: i18n.wue.calculateVir,
      message: i18n.wue.calculateVirSuccess,
      buttons: Ext.Msg.OK,
      fn: function(btn) {
        if (btn === 'ok') {
          App.service.Polygon.showChartWindow();
        }
      }
    });
  },

  calculateEtf: function (geometry, years, index) {
    var self = this;
    if (self.isBusy) return false;

    self.isBusy = true;
    Ext.getBody().setStyle('cursor','progress');
    var parameters = {};
    parameters['wkt_geometry'] = geometry;
    parameters['year'] = years[index];
    var decadeMaxYear = parseInt(__Global.decade.Max.split('_')[0]);
    var decadeMaxMonth = parseInt(__Global.decade.Max.split('_')[1]);
    if (years[index] == decadeMaxYear){
      parameters['max_month'] = decadeMaxMonth;
    }
    else{
      parameters['max_month'] = 9;
    }
    //aggregate decadal etf of given year and sum up to monthly etf
    Ext.Ajax.request({
      url: __Global.api.WUE,
      //default timeout is 30000, increased to calculate large polygons
      timeout: 1000000,
      method: 'POST',
      params: parameters,
      success: function(response) {
        self.isBusy = false;
        //append data to existing polygon data
        var result_data = Ext.decode(response.responseText);
        for (d = 0; d < self.polygon.data.length; ++d) {
          if (self.polygon.data[d]['year'] ==  years[index]){
            for(var key in result_data[0]) {
              self.polygon.data[d][key] = result_data[0][key];
            }
          }
        }
        App.service.Polygon.saveAll();
        if (index < years.length-1){
          index++;
          if (self.progressBar){
            var msg = i18n.wue.aggregateETact + years[index];
            self.progressBar.updateProgress(
              index/years.length,
              Math.round((index/years.length) * 100) + ' %',
              msg
            );
          }
          //recursive function with incremented index
          self.calculateEtf(geometry, years, index);
        }
        else{
          self.calculateVir();
          Ext.getBody().setStyle('cursor','auto');
          if (self.progressBar){
            var msg = i18n.wue.calculateVirSuccess;
            self.progressBar.msgButtons.ok.enable();
            self.progressBar.updateProgress(
              1,
              '100 %',
              msg
            );
          }
        }
      },
      callback: function(){
      },
      failure: function(response){
        Ext.Msg.alert('', 'failure ' + response.responseText);
      }
    });
  },

  parseExcel: function(file) {
    var self = this;
    var reader = new FileReader();

    reader.onload = (function(e) {
      return function (e) {

        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: 'binary'
        });

        workbook.SheetNames.forEach(function(sheetName) {
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          var period = App.service.Helper.getComponentExt('wue-radio').getValue().period;
          switch(period) {

            case 'year':
              self.setPolygonWfYear(XL_row_object);
              //self.renderFormByYear(App.service.Helper.getComponentExt('wue-form-by-year'));
              self.renderForm('year');
              break;
            case 'month':
              self.setPolygonWfMonth(XL_row_object);
              //self.renderFormByMonth(App.service.Helper.getComponentExt('wue-form-by-month'));
              self.renderForm('month');
              break;
            case 'decade':
              self.setPolygonWfDecade(XL_row_object);
              //self.renderFormByDecade(App.service.Helper.getComponentExt('wue-form-by-decade'));
              self.renderForm('decade');
              break;

            default:
              break;
          }
        });
      }

    })(file);

    reader.onerror = function(ex) {
      Ext.Msg.alert('', 'failure ' + ex);
    };

    reader.readAsBinaryString(file);
  },
  /**
  * @method setPolygonWfYear
  * store yearly wf values in user DB
  * @param data
  * data array from Year Excel or from yearly form
  */
  setPolygonWfYear: function (data) {
    if (data.length > 0){
      var polygon = this.polygon;
      //var polygon = App.service.Polygon.getSelectedPolygons()[0];
      if (polygon.data.length > 0) {
        polygon = polygon.data.map(function (d) {
          //values from Year excel have priority
          if (!!data[0].year){
            var index = data.map(function (i) {
              return parseInt(i.year)
            }).indexOf(d.year);
            if (!!data[index] && !!data[index].val){
              d.wf = parseFloat(data[index].val);
            }
          }
          //values from yearly form
          else if (!!data[0].period){
            d.wf = parseFloat(data[0][d.year]);
          }
          return d;
        });
        App.service.Polygon.saveAll();
      }
    }
  },
  /**
  * @method setPolygonWfMonth
  * sum up monthly wf values and store monthly and yearly wf values in user DB
  * @param data
  * data array from Month Excel or from monthly form
  */
  setPolygonWfMonth: function (data) {
    if (data.length > 0){
      var polygon = this.polygon;
      if (polygon.data.length > 0) {
        //add current year entry with multi-annual firn and area_ha to polygon.data if present in data array
        var firn = polygon.data[0].firn;
        var area_ha = polygon.data[0].area_ha;
        //max year is in the last entry of polygon.data
        var last_polygon_year = polygon.data[polygon.data.length-1].year;
        var last_data_year = 0;
        if (!!data[0].year){
          //max year is in the first entry of data (if taken from excel)
          last_data_year = data[0].year;
        }
        else if (!!data[0].data.year){
          //max year is in the first entry of data.data (if taken from form)
          last_data_year = data[0].data.year;
        }
        //if data year is greater than polygon.data year, add new entry to polygon.data
        if (last_data_year > last_polygon_year){
          polygon.data.push({year: last_data_year, firn: firn, area_ha: area_ha});
        }
        polygon = polygon.data.map(function (d) {
          var index;
          //values from Month excel have priority
          if (!data[0].data){
            index = data.map(function (i) {
              //read rows with year only
              if (!!i.year){
                return parseInt(i.year)
              }
            }).indexOf(d.year);
          }
          //values from monthly form
          else{
            index = data.map(function (i) { return parseInt(i.data.year) }).indexOf(d.year);
          }
          for (var month = 4; month <= 9; month++) {
            //values from Month excel have priority
            if (index != -1){
              if (!data[0].data && parseFloat(data[index]['m' + month]) > 0){
                d['wf_m' + month] = parseFloat(data[index]['m' + month]);
              }
              //values from monthly form
              else if (!!data[0].data) {
                d['wf_m' + month] = parseFloat(data[index].data['m' + month]);
              }
            }
          }
          return d;
        });
        App.service.Polygon.saveAll();
      }
    }
  },
  /**
  * @method setPolygonWfDecade
  * sum up decadal wf values and store decadal, monthly and yearly wf values in user DB
  * @param data
  * data array from Decade Excel or from decadal form
  */
  setPolygonWfDecade: function (data) {
    if (data.length > 0){
      var polygon = this.polygon;
      if (polygon.data.length > 0) {
        //add current year entry with multi-annual firn and area_ha to polygon.data if present in data array
        var firn = polygon.data[0].firn;
        var area_ha = polygon.data[0].area_ha;
        //max year is in the last entry of polygon.data
        var last_polygon_year = polygon.data[polygon.data.length-1].year;
        var last_data_year = 0;
        if (!!data[0].year){
          //max year is in the first entry of data (if taken from excel)
          last_data_year = data[0].year;
        }
        else if (!!data[0].data.year){
          //max year is in the first entry of data.data (if taken from form)
          last_data_year = data[0].data.year;
        }
        //if data year is greater than polygon.data year, add new entry to polygon.data
        if (last_data_year > last_polygon_year){
          polygon.data.push({year: last_data_year, firn: firn, area_ha: area_ha});
        }
        polygon = polygon.data.map(function (d) {
          var index;
          var indices = [];
          //values from Decade excel
          if (!data[0].data){
            index = data.map(function (i) {
              //read rows with year only
              if (!!i.year){
                return parseInt(i.year)
              }
            }).indexOf(d.year);
          }
          //values from decadal form (three decadal datasets per year: indices array with three entries)
          else{
            for (var i = 0; i < data.length; i++){
              if (data[i].data.year == d.year){
                indices[data[i].data.decade - 1] = i;
              }
            }
          }
   
          for (var month = 4; month <= 9; month++) {
            for (var decade = 1; decade <= 3; decade++) {
              //values from Decade excel
              if (index != -1){
                if (!data[0].data && parseFloat(data[index]['m' + month + '_' + decade]) > 0){
                  d['wf_m' + month + '_' + decade] = parseFloat(data[index]['m' + month + '_' + decade]);
                }
                //values from decadal form
                else if (!!data[0].data) {
                  d['wf_m' + month + '_' + decade] = parseFloat(data[indices[decade-1]].data['m' + month]);
                }
              }
            }
          }

          return d;
        });
        App.service.Polygon.saveAll();
      }
    }
  },

  renderForm: function (period) {
    var el = App.service.Helper.getComponentExt('wue-form-by-' + period);
    var items = [];
    var polygon = this.polygon;
    var maxYear = __Global.year.Max;

    switch (period){
      case 'year':
        el.removeAll();
        for (var year = maxYear; year >= __Global.year.Min; year--) {
          var datayear = {};
          datayear['fieldLabel'] = year.toString();
          datayear['name'] = year.toString();
          //load water intake if stored from previous input
          for (d = 0; d < polygon.data.length; ++d) {
            if (polygon.data[d]['year'] == year){
              var wf = polygon.data[d]['wf'];
              if (!!wf){
                datayear['value'] = wf;
              }
              break;
            }
          }
          items.push(datayear);
        }
        el.add(items);      
      break;

      case 'month':
      case 'decade':
        el.getStore('wue-' + period).removeAll();

        var decadeMaxYear = parseInt(__Global.decade.Max.split('_')[0]);
        if (decadeMaxYear > maxYear){
          maxYear = decadeMaxYear;
        }
        for (var year = maxYear; year >= __Global.year.Min; year--) {
          var decade = 1;
          if (period == 'month') decade = 3;
          for (decade; decade <= 3; decade++) {
            var datayear = {};
            datayear['year'] = year;
            if (period == 'decade'){
              datayear['decade'] = decade;
            }
            //load water intake if stored from previous input
            for (d = 0; d < polygon.data.length; ++d) {
              if (polygon.data[d]['year'] == year){
                for (var month = 4; month <= 9; month++) {
                  var param = 'wf_m' + month;
                  if (period == 'decade'){
                    param += '_' + decade;
                  }
                  var wf = polygon.data[d][param];
                  if (!!wf){
                    datayear['m' + month] = wf;
                  }
                }
                break;
              }
            }
            items.push(datayear);
          }
        }
        el.getStore('wue-' + period).loadData(items);
      break;

      // case 'decade':

      //   for (var year = maxYear; year >= __Global.year.Min; year--) {
      //     var decade = 1;
      //     if (period == 'month') decade = 3;
      //     for (decade; decade <= 3; decade++) {
      //       var datayear = {};
      //       datayear['year'] = year;
      //       if (period == 'decade'){
      //         datayear['decade'] = decade;
      //       }
      //       //load water intake if stored from previous input
      //       for (d = 0; d < polygon.data.length; ++d) {
      //         if (polygon.data[d]['year'] == year){
      //           for (var month = 4; month <= 9; month++) {
      //             var param = 'wf_m' + month;
      //             if (period == 'decade'){
      //               param += '_' + decade;
      //             }
      //             var wf = polygon.data[d][param];
      //             if (!!wf){
      //               datayear['m' + month] = wf;
      //             }
      //           }
      //           break;
      //         }
      //       }
      //       data.push(datayear);
      //     }
      //   }
      //   el.getStore('wue-decade').loadData(data);      
      // break;
    }

  }

  // renderFormByMonth: function (el) {
  //   el.getStore('wue-month').removeAll();
  //   var data = [];
  //   var polygon = this.polygon;
  //   var maxYear = __Global.year.Max;
  //   var decadeMaxYear = parseInt(__Global.decade.Max.split('_')[0]);
  //   if (decadeMaxYear > maxYear){
  //     maxYear = decadeMaxYear;
  //   }
  //   for (var year = maxYear; year >= __Global.year.Min; year--) {
  //     var datayear = {};
  //     datayear['year'] = year;
  //     //load water intake if stored from previous input
  //     for (d = 0; d < polygon.data.length; ++d) {
  //       if (polygon.data[d]['year'] == year){
  //         var maxMonth = 9;
  //         for (var month = 4; month <= maxMonth; month++) {
  //           var wf = polygon.data[d]['wf_m' + month];
  //           if (!!wf){
  //             datayear['m' + month] = wf;
  //           }
  //         }
  //         break;
  //       }
  //     }
  //     data.push(datayear);
  //   }
  //   el.getStore('wue-month').loadData(data);
  // },

  // renderFormByDecade: function (el) {
  //   el.getStore('wue-decade').removeAll();
  //   var data = [];
  //   var polygon = this.polygon;
  //   var maxYear = __Global.year.Max;
  //   var decadeMaxYear = parseInt(__Global.decade.Max.split('_')[0]);
  //   if (decadeMaxYear > maxYear){
  //     maxYear = decadeMaxYear;
  //   }
  //   for (var year = maxYear; year >= __Global.year.Min; year--) {
  //     for (var decade = 1; decade <= 3; decade++) {
  //       var datayear = {};
  //       datayear['year'] = year;
  //       datayear['decade'] = decade;
  //       //load water intake if stored from previous input
  //       for (d = 0; d < polygon.data.length; ++d) {
  //         if (polygon.data[d]['year'] == year){
  //           for (var month = 4; month <= 9; month++) {
  //             var wf = polygon.data[d]['wf_m' + month + '_' + decade];
  //             if (!!wf){
  //               datayear['m' + month] = wf;
  //             }
  //           }
  //           break;
  //         }
  //       }
  //       data.push(datayear);
  //     }
  //   }
  //   el.getStore('wue-decade').loadData(data);
  // }
});
