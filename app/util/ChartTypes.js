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
          axes   : __Chart.VBar.getAxes   (
            'year', 
            yField, 
            (indicator[ __Global.lang + 'Unit' ] != '-' ? indicator[ __Global.lang + 'Unit' ] : ''), 
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
          //{ xtype: 'label', text: 'All crops incl. double usage, without fallow land' }
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
    //var cropNames = indicator[ __Global.lang + 'Legend'].slice(1);
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
      limit = App.service.Chart.data[0].fir_n;
    }
    else{
      ind_type = 'rel';
      limit = 100;
    }
    if (limit > App.service.Chart.maxData){
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
    return Ext.create('App.view.chart.FPanel', {
      items: [
        {
          xtype  : 'app-chart-stackedvbar',
          store  : App.service.Chart.stores.defaults, 
          axes   : __Chart.StackedVBar.getAxes   (
            'year', 
            yFields,
            ind_type,
            limit, 
            (indicator[ __Global.lang + 'Unit' ] != '-' ? indicator[ __Global.lang + 'Unit' ] : ''),
            maximum
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
    var cr = App.service.Helper.getById( __Indicator, 'cr' );
    var flf = App.service.Helper.getById( __Indicator, 'flf' );
    var mlu = App.service.Helper.getById( __Indicator, 'mlu' );
    var cropNameList = mlu[__Global.lang + 'CropNames'];
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
            store: App.service.Chart.stores.cr,
            gradients:__Chart.Gauge.getGradient(cr.legendcolors[0], cr.legendcolors[1], cr.legendcolors[2], 'cr'), 
            colors: ['url(#gradient-cr)'],           
            axes: __Chart.Gauge.getAxes(cr.maximum, cr.maximum, cr[__Global.lang + 'Name']),
            series: __Chart.Gauge.getSeries('data'),
            sprites: __Chart.Gauge.getSprites(cr[__Global.lang + 'Legend']  + ': ' + data[0].cr.toFixed(1)),
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
            axes: __Chart.Gauge.getAxes(deltaYears, deltaYears/2, flf[__Global.lang + 'Name']),
            series: __Chart.Gauge.getSeries('data'),
            sprites: __Chart.Gauge.getSprites(flf[__Global.lang + 'Legend']  + ': ' + data[0].flf.toFixed(1)),
            margin: '10 0 0 0'
          }]
       /* },{
          layout: {
            type: 'hbox',
            pack: 'center'
          },
          items: [{
            html: cr[__Global.lang + 'Name'] + '<br/>' + cr[__Global.lang + 'Legend']  + ': <b>' + 
              data[0].cr.toFixed(1) + '</b>',
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
   /* var color = indicator.color;
    if (!!indicator.crops) {
      yField = yField.replace('{crop}', App.service.Watcher.get('Crop'));
      color = App.service.Helper.getById(__Crop, crop).color;
    }*/
    //var color = '#989800';
    var color = indicator.color;
    var maximum = NaN;
    var threshold = 10;
    var decimals = 0;
    var display = 'over';
    if (indicator.id = 'fir_n'){
      display = 'under';
    }
    if (indicator.id == 'y'){
      threshold = 6;
    }
    if (indicator.id == 'cd' || indicator.id == 'vir'){
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
          axes: __Chart.Line.getAxes(
            'year', 
            yField, 
            (indicator[ __Global.lang + 'Unit' ] != '-' ? indicator[ __Global.lang + 'Unit' ] : ''), 
            maximum, 
            decimals
          ),
          series : __Chart.Line.getSeries(
            'year', 
            yField, 
            (indicator[ __Global.lang + 'Unit' ] != '-' ? indicator[ __Global.lang + 'Unit' ] : ''), 
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
          //{ xtype: 'label', text: 'All crops incl. double usage, without fallow land' }
          { xtype: 'tbfill' }
          ,{ xtype: 'button', text: i18n.chart.png, handler: 'onPreview' }
        ]
      }
    });
  }
});
