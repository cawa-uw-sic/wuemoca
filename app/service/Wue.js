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
    width: 750
  }),

  calculateVir_annual: function(vals){
    if (vals.period == 'year'){
      for (d = 0; d < this.polygon.data.length; ++d) {
        var firn = this.polygon.data[d]['firn'];
        var etf = this.polygon.data[d]['etf'];
        var year = this.polygon.data[d]['year'];
        //Infinity = no values are displayed in the chart
        var vir = Infinity;
        //water intake
        var wf = 0;
        if (!isNaN(parseFloat(vals[year]))){
          wf = parseFloat(vals[year]).toFixed(2);
          vir = ((etf * firn) / (wf * 100000)).toFixed(2);
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
    //items["0"].data.m4
    //items["0"].data.year
    //items["0"].data.decade
    //check if etf monthly and decadal is already calculated for this polygon
    if (this.polygon.data[0]['etf_m3_1'] == undefined){
      var index = 0;
      var msg = '';
      if (!!items[0].data.decade){
        msg = 'Calculate decadal values';
      }
      else{
        msg = 'Calculate monthly values';
      }
      this.progressBar = Ext.Msg.show({
        title: 'Calculate Irrigation Effectiveness',
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
      //var geometry = App.service.Polygon.prepareRequestGeometry(this.polygon.geometry, false);
      this.calculateEtf(wkt_geometry, items, __Global.year.Min);
    }
    else{
      this.calculateVir(items);
      var msg = '';
      if (!!items[0].data.decade){
        msg = 'Download selected polygon to see decadal results.';
      }
      else{
        msg = 'Download selected polygon to see monthly results.';
      }       
      Ext.Msg.alert('Irrigation Effectiveness calculation successful', msg);      
    }
    /*for (d = 0; d < polygon.data.length; ++d) {
      var firn = polygon.data[d]['firn'];
      var etf = polygon.data[d]['etf'];
      var year = polygon.data[d]['year'];
      
      
    }

    //decade mode
    if (!!items["0"].data.decade){

    }
    //month mode
    else{

    } 
    App.service.Polygon.saveAll();
    App.service.Polygon.rerenderFeatures();  
    if (!App.service.Polygon.windowChart.isHidden()){
      App.service.Polygon.showChartWindow();
    }*/
  },

  calculateVir: function(items){

    for (d = 0; d < this.polygon.data.length; ++d) {
      var etf = 0;
      var vir = Infinity;
      var wf = 0;
      var firn = this.polygon.data[d]['firn'];
      var year = this.polygon.data[d]['year'];
      for (i = 0; i < items.length; ++i) {
        if (items[i].data['year'] == year){
          for (var month = 3; month <= 10; month++) { 
            if (!!items[0].data.decade){
              for (var decade = 1; decade <= 3; decade++) {
                etf = this.polygon.data[d]['etf_m' + month + '_' + decade];
                if (items[i].data['decade'] == decade){
                  if (!isNaN(parseFloat(items[i].data['m' + month]))){
                    wf = parseFloat(items[i].data['m' + month]).toFixed(2);
                    vir = ((etf * firn) / (wf * 100000)).toFixed(2); 
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
              this.polygon.data[d]['vir_m' + month] = vir;
              this.polygon.data[d]['wf_m' + month] = wf;
            }    
          }   
        } 
      }
    }

    //App.service.Polygon.rerenderFeatures(); 
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
        //console.log(year + ': ' + Ext.decode(response.responseText));
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
            var msg = '';
            //if (!!items[0].data.decade){
              msg = 'Calculate decadal and monthly values';
            /*}
            else{
              msg = 'Calculate monthly values';
            }*/
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
          App.service.Polygon.saveAll();
          Ext.getBody().setStyle('cursor','auto');
          if (self.progressBar){
            var msg = '';
            //if (!!items[0].data.decade){
              msg = 'Irrigation Effectiveness calculation successful! Download selected polygon to get calculated results.';
            /*}
            else{
              msg = 'Irrigation Effectiveness calculation successful! Download selected polygon to see monthly results.';
            }*/        
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
  }

});
