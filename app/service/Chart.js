Ext.define('App.service.Chart', {

  singleton: true,

  requires: [
    'App.util.Window'
  ],

  isBusy: false,

  isVisible: true,

  window: Ext.create('App.util.Window'),

  e: false,

  data: [],

  maxData: 0,

  startFrom: 0,

  maxBars: __Global.chart.MaxBars,

  stores: {
    defaults  : Ext.create('Ext.data.JsonStore'),
    //kir       : Ext.create('Ext.data.JsonStore'),
    //fir       : Ext.create('Ext.data.JsonStore'),
    diversity : Ext.create('Ext.data.JsonStore'),
    frequency : Ext.create('Ext.data.JsonStore')
  },

  initialize: function () {
    var self = this;
    self.window.on("close", function () {
      App.service.Highlight.clear();
    });
  },

  display: function (e) {
    if (this.isBusy || App.service.Polygon.activated || App.service.Map.itsPolygon(e)) return false;
    this.e = e;
    this.doRequest();
  },

  doRequest: function () {
    var self = this;
    self.isBusy = true;
    Ext.data.JsonP.request({
      url : App.service.Map.getUrl(self.e, false),
      callbackName: 'ChartResponse',
      params: {format_options: 'callback:Ext.data.JsonP.ChartResponse'},
      success: function (results) {
        self.isBusy = false;
        self.dataResponse(results.features);
        App.service.Highlight.display(results.features);
        self.showWindow();
      }
    });
  },

  showWindow: function () {
    var self = this;
    var indicator = App.service.Watcher.getIndicator();
    if (!!indicator.chart && self.data.length > 0) {
      var first = self.data[0];
      self.window.setTitle(
        (first[ App.service.Watcher.get('Aggregation') + '_' + __Global.Lang] || '') + ' '
        + App.service.Watcher.getAggregation()[__Global.Lang + 'NameShort'] + ' - '
        + App.service.Map.getLegendTitle(true)
      );

      self.window.removeAll();
      if (!!indicator.chart){
        self.window.add(App.util.ChartTypes[indicator.chart](self.data));
        return self.window.show();
      }
    }
    self.window.close();

  },

  dataResponse: function (data) {
    this.data = [];
    this.maxData = 0;
    var indicator = App.service.Watcher.getIndicator();
    var yField = indicator.field;
    if (!!indicator.crops) {
      yField = yField.replace('{crop}', App.service.Watcher.get('Crop'));
    }
    for (var i = 0; i < data.length; i++) {
      if (data[i].properties[yField] > this.maxData){
        this.maxData = data[i].properties[yField];
      }
      var index = this.data.map(function (d) { return d.year; }).indexOf(data[i].properties.year);
      if (index < 0) this.data.push(data[i].properties);
    }
    this.data.sort(function (a, b) {
      if (a.year > b.year) return 1;
      if (a.year < b.year) return -1;
      return 0;
    });
  },

  loadData: function () {
    var self = this;
    var data = [];
    self.data.map(function (rec, i) {
      if (i < self.startFrom || data.length > self.maxBars - 1) return false;
      return data.push(rec);
    });
    self.stores.defaults.setData(data);
  },

  prev: function () {
    if (this.startFrom <= 0) return false;
    this.startFrom -= 1;
    this.loadData();
  },

  next: function () {
    if (this.startFrom > (this.data.length - 1 - this.maxBars)) return false;
    this.startFrom += 1;
    this.loadData();
  }

});
