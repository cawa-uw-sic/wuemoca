Ext.define('App.controller.Switcher', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.switcher',

  afterRender: function () {
    App.service.Helper.setComponentsValue([
       { id: 'switcher-cb-indicator',   selection: 'Indicator'   }
      ,{ id: 'switcher-cb-unit',        selection: 'Unit'        }
      ,{ id: 'switcher-cb-aggregation', selection: 'Aggregation' }
    ]);
    this.createFilters();
    App.service.Watcher.activateFilters();
  },

  onIndicator: function (cb, val) {
    App.service.Watcher.set('Indicator', val);
    this.fillCrops(App.service.Helper.getComponentExt('switcher-btns-crop'));
    this.fillUnits();
    App.service.Yearslider.didRender();
    App.service.Yearslider.pause();
    if (App.service.Chart.e && !App.service.Chart.window.isHidden()) App.service.Chart.doRequest();
  },

  onCrop: function (button, el) {
    App.service.Watcher.set('Crop', button.getItemId());
    if (App.service.Chart.e && !App.service.Chart.window.isHidden()) App.service.Chart.doRequest();
  },

  onUnit: function (cb, val) {
    App.service.Watcher.set('Unit', val);
    this.fillAggregations(cb.getSelection().get('items'), val);
  },

  onAggregation: function (cb, val) {
    App.service.Watcher.set('Aggregation', val);
    if (App.service.Chart.e && !App.service.Chart.window.isHidden()) App.service.Chart.doRequest();
  },

  fillCrops: function (component) {
    var indicator = App.service.Watcher.getIndicator();
    var data = [];
    var cropNames = [];

    component.removeAll();

    if (!indicator.crops) {
      //data = [];
      App.service.Watcher.set('Crop', '');
      return App.service.Helper.hideComponents(['switcher-btns-crop']);
    }

    if (typeof indicator.crops == 'object' && indicator.crops.length > 0) {
      data = indicator.crops;
      cropNames = indicator[__Global.Lang + 'Legend'];
      if (indicator.crops.indexOf(App.service.Watcher.get('Crop')) < 0) {
        App.service.Watcher.set('Crop', indicator.crops[0]);
      }
    }
    if (!App.service.Watcher.get('Crop') && data.length > 0) App.service.Watcher.set('Crop', data[0]);

    for (var i = 0; i < data.length; i++) {
      component.add({
        iconCls: data[i],
        itemId: data[i],
        scale: 'large',
        tooltip: cropNames[i],
        toggleGroup: 'map-filters-crops',
        pressed: App.service.Watcher.get('Crop') == data[i],
        handler: this.onCrop
      });
    }

    App.service.Helper.showComponents(['switcher-btns-crop']);
  },

  fillUnits: function () {
    availableAggregations = App.service.Watcher.getIndicator().aggregation;
    var unitStore = Ext.getStore('unit');
    var unitData = __Aggregation;
    if (typeof availableAggregations == 'object') {
      unitData = [];
      __Aggregation.map(function (unit) { if (availableAggregations.indexOf(unit.id) >= 0) unitData.push(unit); });
      if (availableAggregations.indexOf(App.service.Watcher.get('Unit')) < 0) {
        App.service.Watcher.set('Unit', availableAggregations[0]);
        App.service.Helper.setComponentsValue([{ id: 'switcher-cb-unit', selection: 'Unit' }]);
      }
    }
    unitStore.removeAll();
    unitStore.loadData(unitData);
  },

  fillAggregations: function (aggregationData, unit) {

    var aggregationStore = Ext.getStore('aggregation');

    aggregationStore.removeAll();
    App.service.Helper.hideComponents(['switcher-cb-aggregation']);
    if (typeof aggregationData == 'object' && aggregationData.length > 0) {
      aggregationStore.loadData(aggregationData);
      App.service.Helper.showComponents(['switcher-cb-aggregation']);
      if (aggregationData.map(function (d) { return d.id; }).indexOf(App.service.Watcher.get('Aggregation')) < 0 ) {
        App.service.Watcher.set('Aggregation', App.service.Helper.getDefaultValue(aggregationData));
        App.service.Helper.setComponentsValue([{ id: 'switcher-cb-aggregation', selection: 'Aggregation' }]);
      }
    }
    if (!aggregationData) App.service.Watcher.set('Aggregation', unit);

  },

  createFilters: function () {
    var self = this;
    var fieldset = App.service.Helper.getComponentExt('switcher-filter');
    __Filter.map(function (filter) {
      var store = Ext.create('Ext.data.Store', {
        fields: ['id', 'enName', 'ruName'],
        data: [ __EmptyFilter ].concat(filter.items)
      });
      var cb = Ext.create('Ext.form.field.ComboBox', {
        store: store,
        displayField: __Global.Lang + 'Name',
        valueField: 'id',
        itemId: 'switcher-filter-' + filter.id,
        value: __FilterSelection[filter.id],
        listeners: { change: self.changeFilters }
      });
      fieldset.add(cb);
    });
  },

  changeFilters: function (cb, val) {
    var cFilter = cb.getItemId().replace('switcher-filter-', '');
    __LocalDB.set('FilterSelections.' + cFilter, val);
    __FilterSelection[cFilter] = val;
    App.service.Watcher.activateFilters();
  }

});
