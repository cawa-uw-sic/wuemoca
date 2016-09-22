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

    return Ext.create('App.view.chart.FPanel', {
      items: [
        {
           xtype  : 'app-chart-vbar',
           store  : App.service.Chart.stores.defaults,
           axes   : __Chart.VBar.getAxes   ('year', yField, indicator[ __Global.Lang + 'Unit' ]),
           series : __Chart.VBar.getSeries ('year', yField, indicator[ __Global.Lang + 'Unit' ], color)
        }
      ]
    });
  },

  KirFir: function (data) {
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
  },

  Majority: function (data) {
    var self = this;

    var diversity = App.service.Helper.getById( __Indicator, 'diversity' );
    var frequency = App.service.Helper.getById( __Indicator, 'frequency' );

    App.service.Chart.stores.diversity.setData([ { data: data[0].diversity } ]);
    App.service.Chart.stores.frequency.setData([ { data: data[0].frequency } ]);

    return Ext.create('App.view.chart.VPanel', {
      items: [
        {
          html: i18n.chart.majorityHeader,
          cls: 't-center t-bold t-bigger majority-header'
        },{
          html: i18n.chart.majorLandUse + ': ' + i18n.crop[ __Crop[data[0].majority] ],
          cls: 't-center t-bigger majority-landuse'
        },{
          html: '<img src="/resources/images/' + __Crop[data[0].majority] + '_icon.png">',
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
            store: App.service.Chart.stores.diversity,
            axes: __Chart.Gauge.getAxes(6, 6),
            series: __Chart.Gauge.getSeries('data', diversity.color),
            maximum: 6,
            margin: '0 10 0 0'
          },{
            xtype: 'app-chart-gauge',
            width: '50%',
            height: 120,
            store: App.service.Chart.stores.frequency,
            axes: __Chart.Gauge.getAxes(16, 8),
            series: __Chart.Gauge.getSeries('data', frequency.color)
          }]
        },{
          layout: {
            type: 'hbox',
            pack: 'center'
          },
          items: [{
            html: i18n.chart.cropRotation + '<br/>' + i18n.chart.numCrops + ': <b>' + data[0].diversity.toFixed(2) + '</b>',
            cls: 't-center t-xs-bigger',
            width: '50%'
          },{
            html: i18n.chart.frequency + '<br/>' + i18n.chart.yearsFallow + ': <b>' + data[0].frequency.toFixed(2) + '</b>',
            cls: 't-center t-xs-bigger',
            width: '50%'
          }]
        }
      ]
    });
  }
});