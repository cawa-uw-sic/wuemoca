Ext.define('App.controller.Switcher', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.switcher',

  afterRender: function () {
    App.service.Helper.setComponentsValue([
       { id: 'switcher-cb-indicator',   selection: 'Indicator'   }
     // ,{ id: 'switcher-cb-unit',        selection: 'Unit'        }
      ,{ id: 'switcher-cb-aggregation', selection: 'Aggregation' }
    ]);
    this.createFilters();
    Ext.getStore('indicator').sort(__Global.Lang + 'Name', 'ASC');
   // App.service.Watcher.activateFilters();
  },

  onIndicator: function (cb, val) {

    console.log('onIndicator: ' + val);
    if (!val){
      val == '';
      //App.service.Helper.getComponentExt('switcher-btn-reset').setDisabled(true);
    }
    else{
      //App.service.Helper.getComponentExt('switcher-btn-reset').setDisabled(false);
    }

    App.service.Watcher.set('Indicator', val);

    var indicator = App.service.Watcher.getIndicator();
    //var label = '<a href="' + __Global.urls.GlossaryBase + indicator['glossary'] + 
      //'" title="' + indicator[__Global.Lang + 'NameShort'] + ': ' + indicator[__Global.Lang + 'Tooltip'] + 
      //'" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>' + i18n.indicator.label; 
    var label = '<a data-qtip="' + i18n.header.readmore + ' ' + indicator[__Global.Lang + 'NameShort'] + 
      '" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>' + i18n.indicator.label;      
    cb.setFieldLabel(label);

    this.fillCrops(App.service.Helper.getComponentExt('switcher-btns-crop'));
    //this.fillUnits();
    console.log('onIndicator fillAggregations_new');
    App.service.Map.fillAggregations_new();

    App.service.Yearslider.didRender();
    App.service.Yearslider.pause();
    if (App.service.Chart.e && !App.service.Chart.window.isHidden()) App.service.Chart.doRequest();
    if (App.service.Watcher.get('UserPolygon') == 'show' && !App.service.Polygon.windowChart.isHidden()) {
      App.service.Polygon.showChartWindow();
    }
  },

  onCrop: function (button, el) {
    App.service.Watcher.set('Crop', button.getItemId());
    if (App.service.Chart.e && !App.service.Chart.window.isHidden()) App.service.Chart.doRequest();
    if (App.service.Watcher.get('UserPolygon') == 'show' && !App.service.Polygon.windowChart.isHidden()) {
      App.service.Polygon.showChartWindow();
    }
    var label = '<span style="font-size:13px;"><a data-qtip="' + i18n.header.readmore + ' ' + button.tooltip + 
      '" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>' + i18n.crop.label + '</span>';    
    App.service.Helper.getComponentExt('switcher-btns-crop').setTitle(label);
  },

  onUnit: function (cb, val) {
   var aoi_filter = App.service.Watcher.get('Aoi_Filter');
    if (!!aoi_filter){
      if ((aoi_filter.indexOf(App.service.Watcher.getFilterAggregation(val)) < 0)
        && (aoi_filter.indexOf('country') < 0)){
        App.service.Watcher.set('Aoi_Filter', false);
      }
    }
    App.service.Watcher.set('Unit', val);
    this.fillAggregations(cb.getSelection().get('items'), val);
  },

  onAggregation: function (cb, val) {
    var aoi_filter = App.service.Watcher.get('Aoi_Filter');
    if (!!aoi_filter){
      if ((aoi_filter.indexOf(App.service.Watcher.getFilterAggregation(val)) < 0)
        && (aoi_filter.indexOf('country') < 0)
        && (aoi_filter.indexOf(val) < 0)){
        aoi_filter = false;

        App.service.Watcher.set('Aoi_Filter', aoi_filter);
    console.log('onAggregation fillAggregations_new');        
        App.service.Map.fillAggregations_new();
      }
    }
    App.service.Helper.getComponentExt('zoom-btn-reset').setDisabled(!aoi_filter);
    App.service.Watcher.set('Aggregation', val);

    var aggregation = App.service.Watcher.getAggregation();
    //var label = '<a href="' + __Global.urls.GlossaryBase + aggregation['glossary'] + 
      //'" title="' + aggregation[__Global.Lang + 'NameShort'] + ': ' + aggregation[__Global.Lang + 'Tooltip'] + 
      //'" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>' + i18n.aggreg.label;
    var label = '<a data-qtip="' + i18n.header.readmore + ' ' + aggregation[__Global.Lang + 'NameShort'] + 
      '" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>' + i18n.aggreg.label;      
    cb.setFieldLabel(label);

    if (App.service.Chart.e && !App.service.Chart.window.isHidden()) App.service.Chart.doRequest();
    if (App.service.Watcher.get('UserPolygon') == 'show' && !App.service.Polygon.windowChart.isHidden()) {
      App.service.Polygon.showChartWindow();
    }
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

    var label = '<span style="font-size:13px;"><a data-qtip="' + i18n.header.readmore + ' ' + 
      App.service.Helper.getCropName() + '" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>' + 
      i18n.crop.label + '</span>';
    App.service.Helper.getComponentExt('switcher-btns-crop').setTitle(label);
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

  fillAggregations_new: function () {
    availableAggregations = App.service.Watcher.getIndicator().aggregation;
    var aoi_filter = App.service.Watcher.get('Aoi_Filter');
    var aggregationStore = Ext.getStore('aggregation');
    var aggregationData = __Aggregation;
    if (typeof availableAggregations == 'object') {
      aggregationData = [];
      __Aggregation.map(function (aggregation) {
        if (availableAggregations.indexOf(aggregation.id) >= 0) {
             aggregationData.push(aggregation); 
        }
      });
      if (availableAggregations.indexOf(App.service.Watcher.get('Aggregation')) < 0) {
        App.service.Watcher.set('Aggregation', availableAggregations[0]);
        App.service.Helper.setComponentsValue([{ id: 'switcher-cb-aggregation', selection: 'Aggregation' }]);
      }
    }
    if (aoi_filter){
      var filteredData = [];
      aggregationData.map(function (aggregation) {
        if (!aggregation.aoi_filter || aggregation.aoi_filter.indexOf(aoi_filter) >= 0) {
          filteredData.push(aggregation); 
        }
      });
      aggregationData = filteredData;
    }
    aggregationStore.removeAll();
    aggregationStore.loadData(aggregationData);

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
        emptyText: __EmptyFilter[__Global.Lang + 'Name'],
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
  },

  resetFilters: function (fieldset, eOpts){
    //load entire list, but keep filters stored in LocalDB
    var indicators = __Indicator;     
    Ext.getStore('indicator').removeAll();
    Ext.getStore('indicator').loadData(indicators);
  },

  loadFilters: function (fieldset, eOpts){
    App.service.Watcher.activateFilters();
  },

  resetSelection: function(button, e){
    //App.service.Helper.resetComboboxes(['switcher-cb-indicator']);
    App.service.Watcher.set('Indicator', undefined);
    App.service.Watcher.set('Aggregation', 'rayon');
    this.afterRender();
    //do not collapse/expand accordion panel
    e.stopPropagation();
  },  

  onShapefile: function(){
    var aggregation = App.service.Watcher.get('Aggregation');
    var propertyname = '';
    var field_array = App.service.Helper.getExportFields(false);
    field_array.map(function (field) {
      propertyname += field + ',';
    });

    var requesturl = __Global.urls.Mapserver + 'wfs?' +
      'request=getfeature&' +
      'version=1.0.0&' +
      'outputformat=shape-zip&' +
      'service=wfs&' +
      'format_options=CHARSET:UTF-8&' +
      'propertyname=' + propertyname + 'geom&' +      
      'typename=' + __Global.geoserverWorkspace + ':ca_' + aggregation;

    var aoi_filter = App.service.Watcher.get('Aoi_Filter');
    if (!!aoi_filter){
      requesturl += '&cql_filter=' + aoi_filter;
    }       
    window.open(requesturl, 'download_shp');
  }

});
