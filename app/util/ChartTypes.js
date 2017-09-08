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
    //var yield_classes = 0;
    if (!!indicator.crops) {
      var crop = App.service.Watcher.get('Crop');
      yField = yField.replace('{crop}', crop);
      color = App.service.Helper.getById(__Crop, crop).color;
    }
    var maximum = NaN;
    var threshold = 6;
    var decimals = 0;
    var maxData = App.service.Chart.maxData;

    if (maxData < threshold){
      maximum = threshold;
    }
    var thousand = false;
    if (maxData > 1000){
      thousand = true;
      if (maxData < 5000){
        decimals = 1;
      }
    }

    return Ext.create('App.view.chart.FPanel', {
      items: [
        {
          xtype  : 'app-chart-vbar',
          store  : App.service.Chart.stores.defaults,
          axes   : __Chart.VBar.getAxes   (
            'year', 
            yField, 
            thousand,
            App.service.Map.getLegendTitle(true, thousand),
            maximum, 
            decimals
          ),
          series : __Chart.VBar.getSeries (
            'year', 
            yField,
            (indicator[ __Global.lang + 'Unit' ] != '-' ? indicator[ __Global.lang + 'Unit' ] : ''), 
            color, 
            indicator.decimals
          )
        }
      ],
      bbar: {
        height: 27,
        style: {
          margin: '0px 0px 5px 0px'
        },
        defaults : {
          height : 22,
          style: { padding: '0px 7px' }
        },
        items:
        [ 
          { xtype: 'tbfill' }
          ,{ xtype: 'button', text: i18n.chart.png, handler: 'onPreview' }
        ]
      }
    });
  },

  Stacked: function (data) {
    self = this;
    App.service.Chart.loadData();
    var indicator = App.service.Watcher.getIndicator();
    var ind_id = indicator.id;
    var yFields = [];
    var cropNames = [];
    __Crop.map(function(crop) {
      if (crop.id != 'sum'){
        cropNames.push(crop[__Global.lang + 'Name']);
        yFields.push(ind_id + '_' + crop.id);
      }
    });
    var ind_type = '';
    var limit = 0;
    var maximum = NaN;
    if (ind_id == 'firf'){
      ind_type = 'abs';
      limit = App.service.Chart.data[0].firn;
    }
    else{
      ind_type = 'rel';
      limit = 100;
    }
    var maxData = App.service.Chart.maxData;
    if (limit > maxData){
      maximum = limit + (limit/5);

      if (ind_type == 'abs'){

        /*var divisor = 1000;
        if (maximum < 1000 && maximum >= 500){
          divisor = 500;
        }
        else if (maximum < 500 && maximum >= 100){
          divisor = 100;
        }
        else if (maximum < 100){
          divisor = 10;
        }*/
        maximum = (Math.ceil(maximum/100)) * 100;
      }
    }
    var thousand = false;
    var decimals = 0;
    if (maxData > 1000){
      thousand = true;
      if (maxData < 5000){
        decimals = 1;
      }
    }
    return Ext.create('App.view.chart.FPanel', {
      items: [
        {
          xtype  : 'app-chart-stackedvbar',
          store  : App.service.Chart.stores.defaults, 
          axes   : __Chart.StackedVBar.getAxes   (
            'year', 
            yFields,
            thousand,
            App.service.Map.getLegendTitle(true, thousand),
            ind_type,
            limit, 
            maximum,
            decimals
          ),
          series : __Chart.StackedVBar.getSeries (
            cropNames, 
            'year', 
            yFields,
            (indicator[ __Global.lang + 'Unit' ] != '-' ? indicator[ __Global.lang + 'Unit' ] : ''), 
            indicator.decimals
          )
        }
      ],
      bbar: {
        height: 27,
        style: {
          margin: '0px 0px 5px 0px'
        },
        defaults : {
          height : 22,
          style: { padding: '0px 7px' }
        },        
        items:
        [ 
          { xtype: 'label', text: i18n.chart.sumDoubleFallow }
          ,{ xtype: 'tbfill' }
          ,{ xtype: 'button', text: i18n.chart.png, handler: 'onPreview' }
        ]
      }
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
    if (lur_steps % 2 == 0){
      lur_steps++;
    }

    return Ext.create('App.view.chart.VPanel', {
      items: [
        {
          html: i18n.chart.multiannualHeader1 + ' ' + __Global.year.Min + ' - ' + __Global.year.Max + '<br>' + 
            i18n.chart.multiannualHeader2,
          cls: 't-center t-bold t-bigger mlu-header'
        },{
          html: mlu[__Global.lang + 'Name'] + ': ' + cropNameList[data[0].mlu - 1],
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
            insetPadding: 25,
            store: App.service.Chart.stores.lur,
            gradients:__Chart.Gauge.getGradient(lur.legendcolors[0], lur.legendcolors[1], lur.legendcolors[2], 'lur'), 
            colors: ['url(#gradient-lur)'],           
            axes: __Chart.Gauge.getAxes(lur.minimum, lur.maximum, lur_steps, lur[__Global.lang + 'Name']),
            series: __Chart.Gauge.getSeries('data'),
            sprites: __Chart.Gauge.getSprites(lur[__Global.lang + 'Legend']  + ': ' + parseFloat(data[0].lur).toFixed(1)),
            margin: '10 0 0 0'
          },{
            html: '<img src="' + Ext.getResourcePath('images/' + cropList[data[0].mlu - 1] + '_icon.png', null, '') + 
              '">',         
            cls: 't-center mlu-crop-img'            
          },{
            xtype: 'app-chart-gauge',
            width: '45%',
            height: 200,
            insetPadding: 25,
            store: App.service.Chart.stores.flf,
            gradients: __Chart.Gauge.getGradient(flf.legendcolors[0],flf.legendcolors[1],flf.legendcolors[2], 'flf'),
            colors: ['url(#gradient-flf)'],             
            axes: __Chart.Gauge.getAxes(0, deltaYears, deltaYears/2, flf[__Global.lang + 'Name']),
            series: __Chart.Gauge.getSeries('data'),
            sprites: __Chart.Gauge.getSprites(flf[__Global.lang + 'Legend']  + ': ' + parseFloat(data[0].flf).toFixed(1)),
            margin: '10 0 0 0'
          }]
       /* },{
          layout: {
            type: 'hbox',
            pack: 'center'
          },
          items: [{
            html: lur[__Global.lang + 'Name'] + '<br/>' + lur[__Global.lang + 'Legend']  + ': <b>' + 
              data[0].lur.toFixed(1) + '</b>',
            cls: 't-center t-xs-bigger',
            width: '40%'
          },{
            html: '' ,
            width: '50px'           
          },{
            html: flf[__Global.lang + 'Name'] + '<br/>' + flf[__Global.lang + 'Legend'] + ': <b>' + 
              data[0].flf.toFixed(1) + '</b>',
            cls: 't-center t-xs-bigger',
            width: '40%'
          }]*/
        }
      ]
    });
  },

  Line: function (data) {
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
    var display = 'over';
    var maximum = 1;
    var thousand = false;
    var decimals = 1;
    var maxData = App.service.Chart.maxData;
    var unit = '';
    if (indicator.id == 'firn'){
      display = 'under';
      maximum = NaN;
      decimals = 0;
      unit = indicator[ __Global.lang + 'Unit'];
      if (maxData > 1000){
        thousand = true;
        if (maxData < 5000){
          decimals = 1;
        }
      }      
    }
    else{
      if (maxData > 0.9){
        tolerance = maxData/10;
        maximum = parseFloat((maxData + tolerance).toFixed(decimals));
      }
    }
    var vir_text = (App.service.Watcher.get('UserPolygon') == 'show' && indicator.id == 'vir') ? 'Press "Calculate WUE" and insert Water intake' : '';


    return Ext.create('App.view.chart.FPanel', {
      items: [
        {
          xtype  : 'app-chart-line',
          store  : App.service.Chart.stores.defaults,
          innerPadding: {
            left: 14,
            right: 11
          },
          axes: __Chart.Line.getAxes(
            'year', 
            yField, 
            thousand,
            maximum, 
            decimals
          ),
          series : __Chart.Line.getSeries(
            'year', 
            yField, 
            unit, 
            color, 
            indicator.decimals,
            display
          )
        }
      ],
      bbar: {
        height: 27,
        style: {
          margin: '0px 0px 5px 0px'
        },
        defaults : {
          height : 22,
          style: { padding: '0px 7px' }
        },
        items:
        [ 
          { xtype: 'label', text: vir_text },
          { xtype: 'tbfill' }
          ,{ xtype: 'button', text: i18n.chart.png, handler: 'onPreview' }
        ]
      }
    });
  }
});
