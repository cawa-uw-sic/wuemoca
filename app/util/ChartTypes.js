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
    var userPolygon = App.service.Polygon.getSelectedPolygons().length > 0;   
    var yField = indicator.field;
    var color = indicator.color_chart;
    if (!!indicator.crops) {
      var crop = App.service.Watcher.getCrop();
      yField = yField.replace('{crop}', crop.id);
      color = crop.color_chart;
    }
    var maximum = NaN;
    var threshold = 6;
    var decimals = 0;
    var maxData = App.service.Chart.maxData;
    var newMax = Math.max.apply(null, data.map(function(d) { return d[yField] || 0; }));

    if (maxData < threshold){
      maximum = threshold;
      decimals = 1;
    }
    var bigdata = 'no';
    if (maxData > 1000){
      bigdata = 'thousand';
      if (maxData < 5000){
        decimals = 1;
      }
      if (maxData > 1000000){
        bigdata = 'million';
        decimals = 0;
        if (maxData < 5000000){
          decimals = 1;
        }
      }
    }
    var measure = indicator[ __Global.lang + 'Unit' ] != '-' ? indicator[ __Global.lang + 'Unit' ] : '';
    
    return Ext.create('App.view.chart.FPanel', {
      items: [
        {
          xtype  : 'app-chart-vbar',
          axes   : __Chart.VBar.getAxes   (
            'year',
            yField,
            bigdata,
            App.service.Map.getLegendTitle(true, bigdata).replace('<sub>','').replace('</sub>',''),
            newMax * 1.1 || maximum,
            decimals,
            userPolygon ? 0 : App.service.Watcher.get('Year')
          ),
          series : __Chart.VBar.getSeries (
            'year',
            yField,
            measure,
            color,
            indicator.decimals
          )
        }
      ],
      dockedItems: __Chart.Annual.getBbar (
        indicator.id,
        indicator.userInput,
        indicator.enTooltip.indexOf('Crop_price') > 0,
        userPolygon,
        App.service.Watcher.getAggregation()[__Global.lang + 'NameShort'], 
        ''
      )
    });
  },

  Stacked: function (data) {
    self = this;
    App.service.Chart.loadData();
    var indicator = App.service.Watcher.getIndicator();
    var userPolygon = App.service.Polygon.getSelectedPolygons().length > 0;   
    var ind_id = indicator.id;
    var yFields = [];
    var cropNames = [];
    __Crop.map(function(crop) {
      // add all crops to the stack except of idx=0 (sum, avg, non), check idx if reduced crop list 
      if (crop.idx == 0 || (typeof indicator.crops == 'object' && indicator.crops.indexOf(crop.idx.toString()) == -1)) return false;
      cropNames.push(crop[__Global.lang + 'Name']);
      yFields.push(ind_id + '_' + crop.id);
    });
    var ind_type = '';
    var limit = 0;
    var maximum = NaN;
    if (ind_id == 'firf'){
      ind_type = 'abs';
      limit = App.service.Chart.data[0].firn;
    }
    else if (ind_id == 'uir'){
      ind_type = 'rel';
      limit = 100;
    }

    var maxData = App.service.Chart.maxData;
    if (limit > maxData){
      maximum = limit + (limit/5);

      if (ind_type == 'abs'){
        maximum = (Math.ceil(maximum/100)) * 100;
      }
    }
    var decimals = 0;
    var bigdata = 'no';
    if (maxData > 1000){
      bigdata = 'thousand';
      if (maxData < 5000){
        decimals = 1;
      }
      if (maxData > 1000000){
        bigdata = 'million';
        decimals = 0;
        if (maxData < 5000000){
          decimals = 1;
        }
      }
    }
    
    return Ext.create('App.view.chart.FPanel', {
      items: [
        {
          xtype  : 'app-chart-stackedvbar',
          axes   : __Chart.StackedVBar.getAxes   (
            'year',
            yFields,
            bigdata,
            App.service.Map.getLegendTitle(true, bigdata).replace('<sub>','').replace('</sub>',''),
            limit,
            maximum,
            decimals,
            userPolygon ? 0 : App.service.Watcher.get('Year')
          ),
          series : __Chart.StackedVBar.getSeries (
            cropNames,
            'year',
            yFields,
            (indicator[ __Global.lang + 'Unit' ] != '-' ? indicator[ __Global.lang + 'Unit' ] : ''),
            indicator.decimals
          ),
          theme: 'croptheme'
        }
      ],
      dockedItems: __Chart.Annual.getBbar (
        indicator.id,
        indicator.userInput,
        indicator.enTooltip.indexOf('Crop_price') > 0,
        userPolygon,
        App.service.Watcher.getAggregation()[__Global.lang + 'NameShort'], 
        i18n.chart.legendNotIncluded
      )
    });
  },

  Multiannual: function (data) {
    var self = this;
    var lur = App.service.Helper.getById( __Indicator, 'lur' );
    var flf = App.service.Helper.getById( __Indicator, 'flf' );
    var mlu = App.service.Helper.getById( __Indicator, 'mlu' );
    var cropNameList = mlu[__Global.lang + 'CropNames'];
    var cropList = mlu['croplist'];
    //workaround for numeric axis label bug (multiply by 10)
    App.service.Chart.stores.lur.setData([ { data: data[0].lur * 10 } ]);
    App.service.Chart.stores.flf.setData([ { data: data[0].flf * 10} ]);

    var deltaYears = __Global.year.Max - __Global.year.Min;
    deltaYears++;
    if (deltaYears % 2 == 1){
      deltaYears++;
    }
    var lur_steps = lur.maximum - lur.minimum;
    /*if (lur_steps % 2 == 0){
      lur_steps++;
    }*/

    return Ext.create('App.view.chart.VPanel', {
      items: [
        {
          html: i18n.chart.multiannualHeader1 + ' ' + __Global.year.Min + ' - ' + __Global.year.Max,          
          //html: i18n.chart.multiannualHeader1 + ' ' + __Global.year.Min + ' - ' + __Global.year.Max + '<br>' +
            //i18n.chart.multiannualHeader2,
          cls: 't-center t-bold t-bigger mlu-header'
        },{
          html: mlu[__Global.lang + 'Name'] + ': ' + cropNameList[cropList.indexOf(data[0].mlu)],
          cls: 't-center t-bigger mlu-landuse'
        },{
          layout: {
            type: 'hbox',
            pack: 'center'
          },
          items: [{
            xtype: 'app-chart-gauge',
            width: '45%',
            height: 200,
            padding: '20 0 0 0',
            insetPadding: 25,
            store: App.service.Chart.stores.lur,
            gradients:__Chart.Gauge.getGradient(lur.color_dark, lur.color_medium, lur.color_bright, 'lur'),
            colors: ['url(#gradient-lur)'],
            axes: __Chart.Gauge.getAxes(lur.minimum, lur.maximum, lur_steps, lur[__Global.lang + 'Name']),
            series: __Chart.Gauge.getSeries('data'),
            sprites: __Chart.Gauge.getSprites(lur[__Global.lang + 'Legend']  + ': ' + parseFloat(data[0].lur).toFixed(1)),
            margin: '10 0 0 0'
          },{
            html: '<img src="' + Ext.getResourcePath('images/' + data[0].mlu + '_icon.png', null, '') +
              '">',
            cls: 't-center mlu-crop-img'
          },{
            xtype: 'app-chart-gauge',
            width: '45%',
            height: 200,
            padding: '20 0 0 0',            
            insetPadding: 25,
            store: App.service.Chart.stores.flf,
            gradients: __Chart.Gauge.getGradient(flf.color_dark, flf.color_medium, flf.color_bright, 'flf'),
            colors: ['url(#gradient-flf)'],
            axes: __Chart.Gauge.getAxes(0, deltaYears, deltaYears/2, flf[__Global.lang + 'Name']),
            series: __Chart.Gauge.getSeries('data'),
            sprites: __Chart.Gauge.getSprites(flf[__Global.lang + 'Legend']  + ': ' + parseFloat(data[0].flf).toFixed(1)),
            margin: '10 0 0 0'
          }]
        }
      ]
    });
  },

  Line: function (data) {
    self = this;
    App.service.Chart.loadData();
    var indicator = App.service.Watcher.getIndicator();
    var userPolygon = App.service.Polygon.getSelectedPolygons().length > 0;
    var yField = indicator.field;
    var color = indicator.color_chart;
    if (!!indicator.crops) {
      var crop = App.service.Watcher.getCrop();
      yField = yField.replace('{crop}', crop.id);
      color = crop.color_chart;
    }
    var display = 'over';
    var bigdata = 'no';
    var maximum = 1;
    var decimals = 1;
    var maxData = App.service.Chart.maxData;
    if (maxData > 10){
      decimals = 0;
    }
    var unit = '';
    if (indicator.enUnit != 'Index'){
      unit = indicator[ __Global.lang + 'Unit'];
    }
    if (indicator.id == 'firn'){
      display = 'under';
      maximum = NaN;
      decimals = 0;

      if (maxData > 1000){
        bigdata = 'thousand';
        if (maxData < 5000){
          decimals = 1;
        }
        if (maxData > 1000000){
          bigdata = 'million';
          decimals = 0;
          if (maxData < 5000000){
            decimals = 1;
          }
        }
      }
    }
    else{
      if (maxData > 0.9){
        tolerance = maxData/7;
        maximum = parseFloat((maxData + tolerance).toFixed(decimals));
      }
    }

    return Ext.create('App.view.chart.FPanel', {
      items: [
        {
          xtype  : 'app-chart-line',
          innerPadding: {
            left: 14,
            right: 11
          },
          axes: __Chart.Line.getAxes(
            'year',
            yField,
            bigdata,
            unit == '' ? '' : App.service.Map.getLegendTitle(true, bigdata).replace('<sub>','').replace('</sub>',''),
            maximum,
            decimals,
            userPolygon ? 0 : App.service.Watcher.get('Year')
          ),
          series : __Chart.Line.getSeries(
            'year',
            yField,
            indicator.id == 'firn' ? unit : '',
            color,
            indicator.decimals,
            display
          )
        }
      ],
      dockedItems: __Chart.Annual.getBbar (
        indicator.id,
        indicator.userInput,
        indicator.enTooltip.indexOf('Crop_price') > 0,
        userPolygon,
        App.service.Watcher.getAggregation()[__Global.lang + 'NameShort'], 
        ''
      )
    });
  },

  Stacked_watersupply: function (data) {
    self = this;
    App.service.Chart.loadData();
    var indicator = App.service.Watcher.getIndicator();
    var userPolygon = App.service.Polygon.getSelectedPolygons().length > 0;    
    var yFields = ['wf_rel', 'gwc_rel', 'rain_rel'];
    var names = indicator[__Global.lang + 'Names'];
    var limit = 0;
    var maximum = NaN;
    var maxData = App.service.Chart.maxData;
    var decimals = 0;
    var bigdata = 'no';
    if (maxData > 1000){
      bigdata = 'thousand';
      if (maxData < 5000){
        decimals = 1;
      }
      if (maxData > 1000000){
        bigdata = 'million';
        decimals = 0;
        if (maxData < 5000000){
          decimals = 1;
        }
      }
    }
    
    return Ext.create('App.view.chart.FPanel', {
      items: [
        {
          xtype  : 'app-chart-stackedvbar',
          axes   : __Chart.StackedVBar.getAxes   (
            'year',
            yFields,
            bigdata,
            App.service.Map.getLegendTitle(true, bigdata).replace('<sub>','').replace('</sub>',''),
            limit,
            maximum,
            decimals,
            userPolygon ? 0 : App.service.Watcher.get('Year')
          ),
          series : __Chart.StackedVBar.getSeries (
            names,
            'year',
            yFields,
            (indicator[ __Global.lang + 'Unit' ] != '-' ? indicator[ __Global.lang + 'Unit' ] : ''),
            indicator.decimals
          ),
          theme: 'watertheme'
        }
      ],
      dockedItems: __Chart.Annual.getBbar (
        indicator.id,
        indicator.userInput,
        indicator.enTooltip.indexOf('Crop_price') > 0,
        userPolygon,
        App.service.Watcher.getAggregation()[__Global.lang + 'NameShort'], 
        i18n.chart.legendNotIncluded
      )
    });
  }
});
