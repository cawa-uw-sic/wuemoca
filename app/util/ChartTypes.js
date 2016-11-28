Ext.define('App.util.ChartTypes', {

  singleton: true,

  requires: [
    'App.view.chart.VPanel',
    'App.view.chart.FPanel'
  ],

  Defaults: function (data) {
    self = this;
    App.service.Chart.loadData();
    var indicator = App.service.Watcher.getIndicator();
    var yField = indicator.field;
    var color = indicator.color;
    if (!!indicator.crops) {
      yField = yField.replace('{crop}', App.service.Watcher.get('Crop'));
      color = __CropColors[App.service.Watcher.get('Crop')];
    }
    var maximum = NaN;
    var threshold = 10;
    var decimals = 0;
    if (indicator.id == 'yield'){
      threshold = 6;
    }
    if (indicator.id == 'diversity'){
      maximum = 1;
      decimals = 1;
    }
    else if (App.service.Chart.maxData < threshold){
      maximum = threshold;
    }

    return Ext.create('App.view.chart.FPanel', {
      items: [
        {
           xtype  : 'app-chart-vbar',
           //width: 446,
           store  : App.service.Chart.stores.defaults,
           axes   : __Chart.VBar.getAxes   ('year', yField, indicator[ __Global.Lang + 'Unit' ], maximum, decimals),
           series : __Chart.VBar.getSeries ('year', yField, indicator[ __Global.Lang + 'Unit' ], color, indicator.decimals)
        }
      ]
    });
  },

  Stacked: function (data) {
    self = this;
    App.service.Chart.loadData();
    var indicator = App.service.Watcher.getIndicator();
    var ind_id = indicator.id;
    var yFields = [];
    var cropNames = indicator[ __Global.Lang + 'Legend'].slice(1);
    indicator.crops.map(function(crop) {
      if (crop != 'sum'){
        return yFields.push(ind_id + '_' + crop);
      }
    });
    return Ext.create('App.view.chart.FPanel', {
      items: [
        {
           xtype  : 'app-chart-stackedvbar',
           store  : App.service.Chart.stores.defaults, 
           axes   : __Chart.StackedVBar.getAxes   ('year', yFields, indicator[ __Global.Lang + 'Unit' ]),
           series : __Chart.StackedVBar.getSeries (cropNames, 'year', yFields, indicator[ __Global.Lang + 'Unit' ], indicator.decimals)
        }
      ]
    });
  },
 /* KirFir: function (data) {
    var self = this;
    var firn = App.service.Helper.getById(__Indicator, 'firn');
    var firb = App.service.Helper.getById(__Indicator, 'firb');
    var kir  = App.service.Helper.getById(__Indicator, 'kir' );

    App.service.Chart.stores.fir.setData([
       { name: firb[ __Global.Lang + 'Name' ], data: data[0].area_ha  }
      ,{ name: firn[ __Global.Lang + 'Name' ], data: data[0].area_irr }
    ]);

    App.service.Chart.stores.kir.setData([ { data: data[0].idx_kir * 100 } ]);

    return Ext.create('App.view.chart.VPanel', {
      items: [
        {
          html: i18n.chart.kirFirHeader,
          cls: 't-center t-bold t-bigger'
        },
        {
           xtype  : 'app-chart-hbar',
           store  : App.service.Chart.stores.fir,
           axes   : __Chart.HBar.getAxes   ('name', 'data'),
           series : __Chart.HBar.getSeries ('name', 'data', firn[ __Global.Lang + 'Unit' ], [ firb.color, firn.color ] )
        },
        {
          layout: {
            type: 'hbox',
            pack: 'center'
          },
          items: [{
            html: i18n.chart.kirFirCoef + ': <br/><b>' + data[0].idx_kir.toFixed(2) + '</b>',
            cls: 't-center kir-fir-coef t-bigger',
            width: 200
          },
          {
            xtype: 'app-chart-gauge',
            store: App.service.Chart.stores.kir,
            axes: __Chart.Gauge.getAxes(100, 10),
            series: __Chart.Gauge.getSeries('data', kir.color),
            height: 120
          }]
        }
      ]
    });
  },*/

  Multiannual: function (data) { 
    var self = this;

    var rotation = App.service.Helper.getById( __Indicator, 'rotation' );
    var frequency = App.service.Helper.getById( __Indicator, 'frequency' );
    var majority = App.service.Helper.getById( __Indicator, 'majority' );
    var cropNameList = majority[__Global.Lang + 'CropNames'];
    var cropList = majority['croplist'];
    //workaround for numeric axis label bug (multiply by 10)
    App.service.Chart.stores.rotation.setData([ { data: data[0].rotation * 10 } ]);
    App.service.Chart.stores.frequency.setData([ { data: data[0].frequency * 10} ]);

    var deltaYears = __Global.year.Max - __Global.year.Min;
    deltaYears++;
    if (deltaYears % 2 == 1){
      deltaYears++;
    }


    return Ext.create('App.view.chart.VPanel', {
      items: [
        {
          html: i18n.chart.multiannualHeader1 + ' ' + __Global.year.Min + ' - ' + __Global.year.Max + '<br>' + i18n.chart.multiannualHeader2,
          cls: 't-center t-bold t-bigger majority-header'
        },{
          html: majority[__Global.Lang + 'Name'] + ': ' + cropNameList[data[0].majority - 1],
          cls: 't-center t-bigger majority-landuse'
        },{
          html: '<img src="' + Ext.getResourcePath('images/' + cropList[data[0].majority - 1] + '_icon.png', null, '') + '" style="height:50px;width:50px;">',         
          cls: 't-center majority-landuse-img'
        },{
          layout: {
            type: 'hbox',
            pack: 'center'
          },
          items: [{
            xtype: 'app-chart-gauge',
            width: '50%',
            height: 120,
            store: App.service.Chart.stores.rotation,
            gradients:__Chart.Gauge.getGradient(rotation.legendcolors[0],rotation.legendcolors[1],rotation.legendcolors[2], 'rotation'), 
            colors: ['url(#gradient-rotation)'],           
            axes: __Chart.Gauge.getAxes(rotation.maximum, rotation.maximum),
            series: __Chart.Gauge.getSeries('data'),
            margin: '0 10 0 0'
          },{
            xtype: 'app-chart-gauge',
            width: '50%',
            height: 120,
            store: App.service.Chart.stores.frequency,
            gradients: __Chart.Gauge.getGradient(frequency.legendcolors[0],frequency.legendcolors[1],frequency.legendcolors[2], 'frequency'),
            colors: ['url(#gradient-frequency)'],             
            axes: __Chart.Gauge.getAxes(deltaYears, deltaYears/2),
            series: __Chart.Gauge.getSeries('data')
          }]
        },{
          layout: {
            type: 'hbox',
            pack: 'center'
          },
          items: [{
            html: rotation[__Global.Lang + 'Name'] + '<br/>' + rotation[__Global.Lang + 'Legend']  + ': <b>' + data[0].rotation.toFixed(1) + '</b>',
            cls: 't-center t-xs-bigger',
            width: '50%'
          },{
            html: frequency[__Global.Lang + 'Name'] + '<br/>' + frequency[__Global.Lang + 'Legend'] + ': <b>' + data[0].frequency.toFixed(1) + '</b>',
            cls: 't-center t-xs-bigger',
            width: '50%'
          }]
        }
      ]
    });
  }
});
