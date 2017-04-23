/**
* switcher controller for map selection panel (switch indicator, crop type and aggregation level)
*/
Ext.define('App.controller.Switcher', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.switcher',
  /**
  * @method afterRender
  * set stored indicator and aggregation values to comboboxes, sort indicator entries
  */
  afterRender: function () {
    App.service.Helper.setComponentsValue([
       { id: 'switcher-cb-indicator',   selection: 'Indicator'   }
     // ,{ id: 'switcher-cb-unit',        selection: 'Unit'        }
      ,{ id: 'switcher-cb-aggregation', selection: 'Aggregation' }
    ]);
    this.createFilters();
    Ext.getStore('indicator').sort([
      {
        property :  __Global.lang + 'Group',
        direction: 'ASC'
      },
      {
        property :  __Global.lang + 'Name',
        direction: 'ASC'
      }
    ]);


   // App.service.Watcher.activateFilters();
  },
  /**
  * @method onIndicator
  * when indicator is changed, store new indicator, set cb label with tooltip, update yearslider, update chart
  * @param cb
  * combobox
  * @param val
  * new value
  */
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
/**
* get stored indicator object
*/
    var indicator = App.service.Watcher.getIndicator();
    //var label = '<a href="' + __Global.urls.GlossaryBase + indicator['glossary'] + 
      //'" title="' + indicator[__Global.lang + 'NameShort'] + ': ' + indicator[__Global.lang + 'Tooltip'] + 
      //'" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>' + i18n.indicator.label; 

    var label = '<a href="' + __Global.urls.GlossaryBase + indicator['glossary'] + 
      '" data-qtip="' + i18n.header.readmore + ' ' + indicator[__Global.lang + 'NameShort'] + 
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
  /**
  * @method onCrop
  * when crop is changed, store new crop, set button group title with tooltip, update chart
  * @param button
  * button
  * @param el
  * new value
  */
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

 /* onUnit: function (cb, val) {
   var aoi_filter = App.service.Watcher.get('Aoi_Filter');
    if (!!aoi_filter){
      if ((aoi_filter.indexOf(App.service.Watcher.getSuperFilterAggregation(val)) < 0)
        && (aoi_filter.indexOf('country') < 0)){
        App.service.Watcher.set('Aoi_Filter', false);
      }
    }
    App.service.Watcher.set('Unit', val);
    this.fillAggregations(cb.getSelection().get('items'), val);
  },*/
  /**
  * @method onAggregation
  * when aggregation is changed, check map filter, store new aggregation, set cb label with tooltip, update chart
  * @param cb
  * combobox
  * @param val
  * new value
  */
  onAggregation: function (cb, val) {
    var aoi_filter = App.service.Watcher.get('Aoi_Filter');
    if (!!aoi_filter){
      if (val == 'command'){
        App.service.Helper.resetComboboxes(['zoom-cb-rayon', 'zoom-cb-wua', 'zoom-cb-buis']);
      }
      else if (val == 'wua'){
        App.service.Helper.resetComboboxes(['zoom-cb-rayon', 'zoom-cb-buis']);        
      }
      else if (val == 'rayon'){
        App.service.Helper.resetComboboxes(['zoom-cb-wua', 'zoom-cb-buis']);        
      }      
      else if (val == 'buis'){
        App.service.Helper.resetComboboxes(['zoom-cb-uis', 'zoom-cb-oblast']);        
      } 
      else if (val == 'oblast'){
        App.service.Helper.resetComboboxes(['zoom-cb-rayon', 'zoom-cb-wua', 'zoom-cb-buis']);
      }       
      //reset filter
      if ((aoi_filter.indexOf(App.service.Watcher.getSuperFilterAggregation(val)) < 0)
        && (aoi_filter.indexOf('country') < 0)){
       // && (aoi_filter.indexOf(val) < 0)){
        App.service.Watcher.set('Aoi_Filter', false);
        console.log('onAggregation fillAggregations_new');        
        App.service.Map.fillAggregations_new();
      }
      else{
        //set super filter
        if (aoi_filter.indexOf('and') >= 0){
          var super_aoi_filter = aoi_filter.split(' and ')[1];
          if (aoi_filter.indexOf(val) < 0 || super_aoi_filter.split('=')[0] == val + '_id'){
            //if (sub_aoi_filter.indexOf(App.service.Watcher.getSuperFilterAggregation(val)) < 0){
              App.service.Watcher.set('Aoi_Filter', super_aoi_filter);
            //}
          }
        }
      }
    }
    App.service.Helper.getComponentExt('zoom-btn-reset').setDisabled(!aoi_filter);
    App.service.Watcher.set('Aggregation', val);

    var aggregation = App.service.Watcher.getAggregation();
    //var label = '<a href="' + __Global.urls.GlossaryBase + aggregation['glossary'] + 
      //'" title="' + aggregation[__Global.lang + 'NameShort'] + ': ' + aggregation[__Global.lang + 'Tooltip'] + 
      //'" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>' + i18n.aggreg.label;
    var label = '<a href="' + __Global.urls.GlossaryBase + aggregation['glossary'] + 
      '" data-qtip="' + i18n.header.readmore + ' ' + aggregation[__Global.lang + 'NameShort'] + 
      '" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>' + i18n.aggreg.label;      
    cb.setFieldLabel(label);

    if (App.service.Chart.e && !App.service.Chart.window.isHidden()) App.service.Chart.doRequest();
    if (App.service.Watcher.get('UserPolygon') == 'show' && !App.service.Polygon.windowChart.isHidden()) {
      App.service.Polygon.showChartWindow();
    }
  },
  /**
  * @method fillCrops
  * create crop buttons depending from current indicator
  * @param component
  * button group
  */
  fillCrops: function (component) {
    var indicator = App.service.Watcher.getIndicator();
    var crops = [];
    var cropNames = [];

    component.removeAll();

    if (!indicator.crops) {
      App.service.Watcher.set('Crop', '');
      return App.service.Helper.hideComponents(['switcher-btns-crop']);
    }
    //y and pirf
    if (typeof indicator.crops == 'object' && indicator.crops.length > 0) {
      crops = indicator.crops;
      cropNames = indicator[__Global.lang + 'Legend'];
      if (indicator.crops.indexOf(App.service.Watcher.get('Crop')) < 0) {
        App.service.Watcher.set('Crop', indicator.crops[0]);
      }
    }
    //firf and uir
    else if (indicator.crops == 'all'){
      __Crop.map(function (crop) {
          crops.push(crop.id);
          cropNames.push(crop[__Global.lang + 'Name']);
      });      
    }
    if (!App.service.Watcher.get('Crop') && crops.length > 0) App.service.Watcher.set('Crop', crops[0]);

    for (var i = 0; i < crops.length; i++) {
      component.add({
        iconCls: crops[i],
        itemId: crops[i],
        scale: 'large',
        tooltip: cropNames[i],
        toggleGroup: 'map-filters-crops',
        pressed: App.service.Watcher.get('Crop') == crops[i],
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
  /**
  * @method fillAggregations
  * fill aggregation list and set combobox value
  * @param aggregationData
  * list of allowed aggregations
  * @param unit
  * unit
  */
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
        displayField: __Global.lang + 'Name',
        valueField: 'id',
        itemId: 'switcher-filter-' + filter.id,
        value: __FilterSelection[filter.id],
        emptyText: __EmptyFilter[__Global.lang + 'Name'],
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
  /**
  * @method resetSelection
  * reset original settings
  * @param button
  * reset button
  * @param e
  * click event: do not collapse/expand accordion panel
  */
  resetSelection: function(button, e){
    //App.service.Helper.resetComboboxes(['switcher-cb-indicator']);
    App.service.Watcher.set('Indicator', undefined);
    App.service.Watcher.set('Aggregation', 'rayon');
    this.afterRender();
    //do not collapse/expand accordion panel
    e.stopPropagation();
  },  
  /**
  * @method onShapefile
  * download zipped shapefile (with map filter if applicable) as WFS from GeoServer
  */
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
    App.service.Helper.openDocument(requesturl, 'download_shp');
  }

});
