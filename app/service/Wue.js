Ext.define('App.service.Wue', {

  singleton: true,

  isBusy: false,

  polygon: false,

  progressBar: false,

  requires: [
    'App.util.Window'
  ],

  window    : Ext.create('App.util.Window', {
    title: i18n.wue.windowTitle,
    items: [{ xtype: 'app-wue-form' }],
    modal: true,
    height: 500,
    width: 750,
    resizable: false
  }),

  calculateVir_annual: function(vals){
    if (vals.period == 'year'){
      for (d = 0; d < this.polygon.data.length; ++d) {
        var firn = this.polygon.data[d]['firn'];
        var etf = this.polygon.data[d]['etf'];
        var year = this.polygon.data[d]['year'];
        var vir = null;
        //water intake input
        var wf = null;
        if (!isNaN(parseFloat(vals[year]))){
          wf = parseFloat(vals[year]).toFixed(2);
          vir = ((etf * firn) / (wf * 100000)).toFixed(2);
        }
        //Infinity = divided by zero
        if (vir == Infinity){
          vir = null;
        }        
        this.polygon.data[d]['vir'] = vir;
        this.polygon.data[d]['wf'] = wf;
      }
      App.service.Polygon.saveAll();
      App.service.Polygon.rerenderFeatures();
      //switch to vir indicator so the user sees the results immediatly
      if (App.service.Watcher.get('Indicator') != 'vir'){
        App.service.Watcher.set('Indicator', 'vir');
        App.service.Helper.setComponentsValue([{id: 'switcher-cb-indicator', selection: 'Indicator'}]);
      }
      if (!App.service.Polygon.windowChart.isHidden()){
        App.service.Polygon.showChartWindow();
      }
    }
  },

  calculateMonthlyDecadal: function(items){
    //check if etf monthly and decadal is already calculated for this polygon
    if (this.polygon.data[0]['etf_m3_1'] == undefined){
      var index = 0;
      var msg = i18n.wue.aggregateETact + __Global.year.Min;
      this.progressBar = Ext.Msg.show({
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
      this.calculateEtf(wkt_geometry, items, __Global.year.Min);
    }
    else{
      this.calculateVir(items);
      var msg = i18n.wue.calculateVirSuccess;
      Ext.Msg.alert(i18n.wue.calculateVir, msg);
    }
  },

  calculateVir: function(items){

    for (d = 0; d < this.polygon.data.length; ++d) {

      var firn = this.polygon.data[d]['firn'];
      var year = this.polygon.data[d]['year'];
      for (i = 0; i < items.length; ++i) {
        if (items[i].data['year'] == year){
          for (var month = 3; month <= 10; month++) {
            var etf = 0;
            var vir = null;
            //water intake input            
            var wf = null;
            if (!!items[0].data.decade){
              for (var decade = 1; decade <= 3; decade++) {
                etf = this.polygon.data[d]['etf_m' + month + '_' + decade];
                if (items[i].data['decade'] == decade){
                  if (!isNaN(parseFloat(items[i].data['m' + month]))){
                    wf = parseFloat(items[i].data['m' + month]).toFixed(2);
                    vir = ((etf * firn) / (wf * 100000)).toFixed(2);
                  }
                  //Infinity = divided by zero
                  if (vir == Infinity){
                    vir = null;
                  }                                      
                  this.polygon.data[d]['vir_m' + month + '_' + decade] = vir;
                  this.polygon.data[d]['wf_m' + month + '_' + decade] = wf;
                }
              }
            }
            else{
              etf = this.polygon.data[d]['etf_m' + month];
              if (!isNaN(parseFloat(items[i].data['m' + month]))){
                wf = parseFloat(items[i].data['m' + month]).toFixed(2);
                vir = ((etf * firn) / (wf * 100000)).toFixed(2);
              }
              //Infinity = divided by zero
              if (vir == Infinity){
                vir = null;
              }              
              this.polygon.data[d]['vir_m' + month] = vir;
              this.polygon.data[d]['wf_m' + month] = wf;
            }
          }
        }
      }
    }
    App.service.Polygon.saveAll();
  },

  calculateEtf: function (geometry, items, year) {
    var self = this;
    if (self.isBusy) return false;

    self.isBusy = true;
    Ext.getBody().setStyle('cursor','progress');
    var parameters = {};
    parameters['wkt_geometry'] = geometry;
    parameters['year'] = year;

    Ext.Ajax.request({
      url: __Global.api.WUE,
      //default is 30000, increased to calculate large polygons
      timeout: 1000000,
      method: 'POST',
      params: parameters,
      success: function(response) {
        self.isBusy = false;
        //append data to existing polygon data
        var result_data = Ext.decode(response.responseText);
        for (d = 0; d < self.polygon.data.length; ++d) {
          if (self.polygon.data[d]['year'] == year){
            for(var key in result_data[0]) {
              self.polygon.data[d][key] = parseFloat(result_data[0][key]).toFixed(2);
            }
          }
        }
        App.service.Polygon.saveAll();
        App.service.Polygon.rerenderFeatures();
        if (year < __Global.year.Max){
          year++;
          if (self.progressBar){
            var msg = i18n.wue.aggregateETact + year;
            self.progressBar.updateProgress(
              (year - __Global.year.Min)/((__Global.year.Max - __Global.year.Min) + 1),
              Math.round(((year - __Global.year.Min)/((__Global.year.Max - __Global.year.Min) + 1)) * 100) + ' %',
              msg
            );
          }
          self.calculateEtf(geometry, items, year);
        }
        else{
          self.calculateVir(items);
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
        console.log('failure ' + response.responseText);
      }
    });
  },

  parseExcel: function(file) {
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
          console.log(App.service.Helper.getComponentExt('wue-radio').getValue())
          var period = App.service.Helper.getComponentExt('wue-radio').getValue().period;
          switch(period) {

            case 'year':
              App.service.Wue.setPolygonWfYear(XL_row_object);
              App.service.Wue.renderFormByYear(App.service.Helper.getComponentExt('wue-form-by-year'));
              break;
            case 'month':
              App.service.Wue.setPolygonWfMonth(XL_row_object);
              App.service.Wue.renderFormByMonth(App.service.Helper.getComponentExt('wue-form-by-month'));
              break;
            case 'decade':
              App.service.Wue.setPolygonWfDecade(XL_row_object);
              App.service.Wue.renderFormByDecade(App.service.Helper.getComponentExt('wue-form-by-decade'));
              break;

            default:
              break;
          }
        });

      }

    })(file);

    reader.onerror = function(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  },

  setPolygonWfYear: function (data) {
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    if (polygon.data.length > 0) {
      polygon = polygon.data.map(function (d) {
        var index = data.map(function (i) { return parseInt(i.year) }).indexOf(d.year);
        d.wf = parseFloat(data[index].val);
        return d;
      });
      App.service.Polygon.saveAll();
    }
  },

  setPolygonWfMonth: function (data) {
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    if (polygon.data.length > 0) {
      polygon = polygon.data.map(function (d) {
        var index = data.map(function (i) { return parseInt(i.year) }).indexOf(d.year);
        for (var month = 3; month <= 10; month++) {
          d['wf_m'+month] = parseFloat(data[index]['m'+month]);
        }
        return d;
      });
      App.service.Polygon.saveAll();
    }
  },

  setPolygonWfDecade: function (data) {
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    if (polygon.data.length > 0) {
      polygon = polygon.data.map(function (d) {
        var index = data.map(function (i) { return parseInt(i.year) }).indexOf(d.year);
        for (var month = 3; month <= 10; month++) {
          for (var decade = 1; decade <= 3; decade++) {
            d['wf_m'+month+'_'+decade] = parseFloat(data[index]['m'+month+'_'+decade]);
          }
        }
        return d;
      });
      App.service.Polygon.saveAll();
    }
  },

  renderFormByYear: function (el) {
    el.removeAll();
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

  renderFormByMonth: function (el) {
    el.getStore('wue-month').removeAll();
    var data = [];
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
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

  renderFormByDecade: function (el) {
    el.getStore('wue-decade').removeAll();
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
