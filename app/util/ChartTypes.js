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
      var crop = App.service.Watcher.get('Crop');
      yField = yField.replace('{crop}', crop);
      color = App.service.Helper.getById(__Crop, crop).color;
    }
    var maximum = NaN;
    var threshold = 10;
    var decimals = 0;
    if (indicator.id == 'y'){
      threshold = 6;
    }
    if (indicator.id == 'cd'){
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
          store  : App.service.Chart.stores.defaults,
          axes   : __Chart.VBar.getAxes   ('year', yField, (indicator[ __Global.Lang + 'Unit' ] != '-' ? indicator[ __Global.Lang + 'Unit' ] : ''), maximum, decimals),
          series : __Chart.VBar.getSeries ('year', yField, (indicator[ __Global.Lang + 'Unit' ] != '-' ? indicator[ __Global.Lang + 'Unit' ] : ''), color, indicator.decimals)
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
    //var cropNames = indicator[ __Global.Lang + 'Legend'].slice(1);
    var cropNames = [];
    __Crop.map(function(crop) {
      if (crop.id != 'sum'){
        cropNames.push(crop[__Global.Lang + 'Name']);
        yFields.push(ind_id + '_' + crop.id);
      }
    });

    return Ext.create('App.view.chart.FPanel', {
      items: [
        {
          xtype  : 'app-chart-stackedvbar',
          store  : App.service.Chart.stores.defaults, 
          axes   : __Chart.StackedVBar.getAxes   ('year', yFields, (indicator[ __Global.Lang + 'Unit' ] != '-' ? indicator[ __Global.Lang + 'Unit' ] : '')),
          series : __Chart.StackedVBar.getSeries (cropNames, 'year', yFields, (indicator[ __Global.Lang + 'Unit' ] != '-' ? indicator[ __Global.Lang + 'Unit' ] : ''), indicator.decimals)
        }
      ]
    });
  },

  Multiannual: function (data) { 
    var self = this;
    var cr = App.service.Helper.getById( __Indicator, 'cr' );
    var flf = App.service.Helper.getById( __Indicator, 'flf' );
    var mlu = App.service.Helper.getById( __Indicator, 'mlu' );
    var cropNameList = mlu[__Global.Lang + 'CropNames'];
    var cropList = mlu['croplist'];
    //workaround for numeric axis label bug (multiply by 10)
    App.service.Chart.stores.cr.setData([ { data: data[0].cr * 10 } ]);
    App.service.Chart.stores.flf.setData([ { data: data[0].flf * 10} ]);

    var deltaYears = __Global.year.Max - __Global.year.Min;
    deltaYears++;
    if (deltaYears % 2 == 1){
      deltaYears++;
    }

    return Ext.create('App.view.chart.VPanel', {
      items: [
        {
          html: i18n.chart.multiannualHeader1 + ' ' + __Global.year.Min + ' - ' + __Global.year.Max + '<br>' + i18n.chart.multiannualHeader2,
          cls: 't-center t-bold t-bigger mlu-header'
        },{
          html: mlu[__Global.Lang + 'Name'] + ': ' + cropNameList[data[0].mlu - 1],
          cls: 't-center t-bigger mlu-landuse'
        },{
          html: '<img src="' + Ext.getResourcePath('images/' + cropList[data[0].mlu - 1] + '_icon.png', null, '') + '">',         
          cls: 't-center mlu-crop-img'
        },{
          layout: {
            type: 'hbox',
            pack: 'center'
          },
          items: [{
            xtype: 'app-chart-gauge',
            width: '50%',
            height: 120,
            store: App.service.Chart.stores.cr,
            gradients:__Chart.Gauge.getGradient(cr.legendcolors[0],cr.legendcolors[1],cr.legendcolors[2], 'cr'), 
            colors: ['url(#gradient-cr)'],           
            axes: __Chart.Gauge.getAxes(cr.maximum, cr.maximum),
            series: __Chart.Gauge.getSeries('data'),
            margin: '0 10 0 0'
          },{
            xtype: 'app-chart-gauge',
            width: '50%',
            height: 120,
            store: App.service.Chart.stores.flf,
            gradients: __Chart.Gauge.getGradient(flf.legendcolors[0],flf.legendcolors[1],flf.legendcolors[2], 'flf'),
            colors: ['url(#gradient-flf)'],             
            axes: __Chart.Gauge.getAxes(deltaYears, deltaYears/2),
            series: __Chart.Gauge.getSeries('data')
          }]
        },{
          layout: {
            type: 'hbox',
            pack: 'center'
          },
          items: [{
            html: cr[__Global.Lang + 'Name'] + '<br/>' + cr[__Global.Lang + 'Legend']  + ': <b>' + data[0].cr.toFixed(1) + '</b>',
            cls: 't-center t-xs-bigger',
            width: '50%'
          },{
            html: flf[__Global.Lang + 'Name'] + '<br/>' + flf[__Global.Lang + 'Legend'] + ': <b>' + data[0].flf.toFixed(1) + '</b>',
            cls: 't-center t-xs-bigger',
            width: '50%'
          }]
        }
      ]
    });
  },

  Line: function (data) {
    self = this;
    App.service.Chart.loadData();
    var indicator = App.service.Watcher.getIndicator();
    var yField = indicator.field;
   /* var color = indicator.color;
    if (!!indicator.crops) {
      yField = yField.replace('{crop}', App.service.Watcher.get('Crop'));
      color = App.service.Helper.getById(__Crop, crop).color;
    }*/
    var color = '#989800';
    var maximum = NaN;
    var threshold = 10;
    var decimals = 0;
    if (indicator.id == 'y'){
      threshold = 6;
    }
    if (indicator.id == 'cd'){
      maximum = 1;
      decimals = 1;
    }
    else if (App.service.Chart.maxData < threshold){
      maximum = threshold;
    }

    return Ext.create('App.view.chart.FPanel', {
      items: [
        {
          xtype  : 'app-chart-line',
          store  : App.service.Chart.stores.defaults,
          innerPadding: {
            left: 14,
            right: 11
          },
          axes   : __Chart.Line.getAxes   ('year', yField, (indicator[ __Global.Lang + 'Unit' ] != '-' ? indicator[ __Global.Lang + 'Unit' ] : ''), maximum, decimals),
          series : __Chart.Line.getSeries ('year', yField, (indicator[ __Global.Lang + 'Unit' ] != '-' ? indicator[ __Global.Lang + 'Unit' ] : ''), color, indicator.decimals)
        }
      ]
    });
  }
});
