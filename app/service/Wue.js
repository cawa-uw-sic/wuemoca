Ext.define('App.service.Wue', {

  singleton: true,

  isBusy: false,

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

  calculateVir: function(vals){
    if (vals.period == 'year'){
      var selectedPolygons = App.service.Polygon.getSelectedPolygons();
      if (selectedPolygons.length > 0){
        var polygon = selectedPolygons[0];
        for (d = 0; d < polygon.data.length; ++d) {
          var fir_n = polygon.data[d]['fir_n'];
          var etf = polygon.data[d]['etf'];
          var year = polygon.data[d]['year'];
          var vir = Infinity;
          if (!isNaN(parseFloat(vals[year])) && parseFloat(vals[year]) > 0){
            vir = ((etf * fir_n) / (parseFloat(vals[year]) * 100000));
          }
          polygon.data[d]['vir'] = vir;
        }
        App.service.Polygon.saveAll();
        App.service.Polygon.rerenderFeatures();  
        if (!App.service.Polygon.windowChart.isHidden()){
          App.service.Polygon.showChartWindow();
        }
      }
    }
    else{
    }
  },

  doRequest: function () {
    var self = this;
    self.isBusy = true;
    Ext.getBody().setStyle('cursor','progress');
    parameters['geometry'] = '68.25890739453126 40.484059161735956,68.42370231640626 40.475702587386166,68.42370231640626 40.38161946159184,68.27538688671876 40.387895764347576,68.25890739453126 40.484059161735956';
    Ext.Ajax.request({
      url: __Global.api.WUE,
      //default is 30000, increased to calculate large polygons
      timeout: 1000000,
      method: 'POST',
      params: parameters,
      success: function(response) {
        console.log(Ext.decode(response.responseText));
      },
      callback: function(){
        self.isBusy = false;
        Ext.getBody().setStyle('cursor','auto');
      },
      failure: function(response){
        console.log('failure ' + Ext.decode(response.responseText));
      }
    });
  }

});
