Ext.define('App.service.Prod', {

  singleton: true,

  isBusy: false,

  polygon: false,

  progressBar: false,

  requires: [
    'App.util.Window'
  ],

  window    : Ext.create('App.util.Window', {
    title: i18n.prod.windowTitle,
    items: [{ xtype: 'app-prod-form' }],
    modal: true,
    height: 500,
    width: 800,
    resizable: false,
    listeners:{
      close: function () {
        /*var container = App.service.Helper.getComponentExt('app-wue-container');
        container.removeAll();
        if (!!Ext.getStore('wue-month')){
          Ext.getStore('wue-month').removeAll();
        }
        if (!!Ext.getStore('wue-decade')){
          Ext.getStore('wue-decade').removeAll();
        }*/
      }
    }
  }),


  renderFormByYear: function (crop) {
    var indicators = ['yf', 'firf', 'price'];
    var width = (85 / indicators.length) * 0.01;
    var el = App.service.Helper.getComponentExt('prod-form-by-year');
    el.removeAll();
    var polygon = App.service.Polygon.getSelectedPolygons()[0];

    var items = [];

    el.add([{
      xtype: 'textfield',
      fieldLabel: i18n.prod.rate,
      value: polygon.data[0]['rate_' + crop] || '',
      name: 'rate_' + crop + '_all_years',
      listeners: { change: 'onInputChange' }
    }]);

    var labels = [i18n.wue.year, i18n.prod.yf, i18n.prod.firf, i18n.prod.price];
    var item = {
      defaults: {
        xtype: 'label',
        columnWidth: width,
        margin: '10 10 10 0'
      },

      items: []
    };
    labels.map(function (label) {
      var obj = { html: label }
      if (label == i18n.wue.year) {
        obj.columnWidth = 0.10;
      }
      item.items.push(obj);
    });
    el.add([item]);

    for (var year = __Global.year.Max; year >= __Global.year.Min; year--) {
      item = {
        defaults: {
          xtype: 'textfield',
          columnWidth: width,
          margin: '2 10 0 0',
          listeners: { change: 'onInputChange' }
        },

        items: []
      };

      var label = { xtype: 'label', html: year.toString(), margin: '10 20 0 0', columnWidth: 0.10 };
      item.items.push(label);

      indicators.map(function (indicator) {
        var index = polygon.data.map(function (d) { return d.year }).indexOf(year);
        var val = (index >= 0) ? polygon.data[index][indicator + '_' + crop] : '';
        item.items.push({ name: indicator + '_' + crop + '_' + year, value: val });
      });
      items.push(item);
    }
    el.add(items);
  },

  renderFormSecondary: function () {
    var self = this;
    var indicators = ['firn', 'groundwater', 'coefficient'];
    var width = (90 / indicators.length) * 0.01;
    var el = App.service.Helper.getComponentExt('prod-form-secondary');
    el.removeAll();

    var items = [];
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    console.log(polygon);

    var item = {
      defaults: {
        xtype: 'textfield',
        columnWidth: width,
        margin: '2 10 0 0',
        listeners: { change: 'onInputChange' }
      },

      items: []
    };

    indicators.map(function (indicator) {
      item.items.push({ name: indicator, value: polygon.data[0][indicator] || '', fieldLabel: i18n.prod[indicator] });
    });

    items.push(item);

    var indicators = ['wf', 'rains'];
    indicators.map(function (indicator) { items.push(self.getYearlyForm(indicator)); });

    el.add(items);
  },

  getYearlyForm: function(indicator) {
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    item = {
      xtype: 'fieldset',
      title: i18n.prod[indicator],
      width: 735,
      defaults: {
        xtype: 'textfield',
        columnWidth: 0.20,
        margin: '2 10 0 0',
        listeners: { change: 'onInputChange' }
      },

      items: []
    };
    for (var year = __Global.year.Max; year >= __Global.year.Min; year--) {

      var index = polygon.data.map(function (d) { return d.year }).indexOf(year);
      var val = (index >= 0) ? polygon.data[index][indicator] : '';
      item.items.push({ name: indicator + '_' + year, value: val, fieldLabel: year.toString() });

    }
    return item;
  },

  // Расчет корректировочного водозабора на основе норм
  calcWf: function() {
    var polygon = App.service.Polygon.getSelectedPolygons()[0];
    polygon.data = polygon.data.map(function(d) {
      d['wf_sum'] = 0;
      __Crop.map(function (crop) {
        crop = crop.id;

        if (crop == 'sum') return false;
        if (!d['firf_' + crop] || !d['rate_' + crop]) return false;
        d['wf_' + crop] = d['rate_' + crop] * d['firf_' + crop] * 0.000001;
        d['wf_sum'] += d['wf_' + crop];

      });
      d['wf_ratio'] = d['wf_sum'] / d['wf'];
      d['wf_sum'] = 0;

      __Crop.map(function (crop) {
        crop = crop.id;

        if (crop == 'sum') return false;
        if (!d['wf_' + crop] || !d['wf_ratio']) return false;
        d['wf_' + crop] = d['wf_' + crop] / d['wf_ratio'];
        d['wf_sum'] += d['wf_' + crop];
      });
      return d;
    });
    return polygon.data;
  }

});
