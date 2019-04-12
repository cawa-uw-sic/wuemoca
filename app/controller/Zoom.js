/**
* zoom controller for map filter panel (selection of province, district, BISA, ISA, etc.)
*/
Ext.define('App.controller.Zoom', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.zoom',

  /**
  * @method onCountry
  * when country is changed, zoom to new extent, apply map filter, load depending comboboxes
  * @param {App.view.zoom.CbCountry} cb
  * country combobox
  * @param {String} val
  * new value
  */
  onCountry: function (cb, val) {
    App.service.Watcher.set('Country', val);
    App.service.Helper.resetStores(['oblast', 'buis']);
    App.service.Helper.resetComboboxes(['zoom-cb-oblast', 'zoom-cb-buis']);
    App.service.Helper.hideComponents([
      'zoom-container-oblast',
      'zoom-cb-oblast', 
      'zoom-container-buis', 
      'zoom-cb-buis'
    ]);
    
    if (val) {
      //avoid zoom to country if other parameters are stored
      var oblast = App.service.Watcher.get('Oblast');
      var buis = App.service.Watcher.get('Buis');
      if (oblast == null && buis == null ){
        App.service.Map.setMapExtent(App.service.Helper.getScalar('country', val, 'extent'), true);
        if (val != 'all'){
          App.service.Map.filterAreaOfInterest('country', val);
          App.service.Watcher.set('Oblast', 'all');
        }
        else{
          App.service.Map.filterAreaOfInterest('','0');
        }        
      }
      if (val != 'all'){
        App.service.Helper.showComponents(['zoom-container-oblast','zoom-cb-oblast']);
        Ext.getStore('oblast').load({params: {country: val}});
        if (val == 'UZB') {
          App.service.Helper.showComponents(['zoom-container-buis','zoom-cb-buis']);
          Ext.getStore('buis').load({params: {country: val}});
        }
      }
    }
  },

  /**
  * @method onOblast
  * when oblast is changed, zoom to new extent, apply map filter, load depending comboboxes, set aggregation level
  * @param cb
  * combobox
  * @param val
  * new value
  */
  onOblast: function (cb, val) {
    App.service.Watcher.set('Oblast', val);
    App.service.Helper.resetStores(['rayon', 'wua']);
    App.service.Helper.resetComboboxes(['zoom-cb-rayon', 'zoom-cb-wua']);
    App.service.Helper.hideComponents(['zoom-cb-rayon', 'zoom-cb-wua']);
    if (val) {

      App.service.Helper.resetStores(['uis']);
      App.service.Helper.resetComboboxes(['zoom-cb-buis', 'zoom-cb-uis']);
      App.service.Helper.hideComponents(['zoom-cb-uis']);
      if (val != 'all'){
        App.service.Helper.showComponents(['zoom-cb-rayon']);
        Ext.getStore('rayon').load({params: {oblast: val}});
        Ext.getStore('wua').load({params: {oblast: val, buis:''}});
      }

      //avoid zoom to oblast if other parameters are stored
      var rayon = App.service.Watcher.get('Rayon');
      var wua = App.service.Watcher.get('Wua');

      if (rayon == null && wua == null){
        App.service.Map.setMapExtent(App.service.Helper.getScalar('oblast', val, 'extent'), true); 
          if (val != 'all'){
            App.service.Map.filterAreaOfInterest('oblast', val);
            this.selectFilteredObject();
          }
          else{
            App.service.Map.filterAreaOfInterest('country', App.service.Watcher.get('Country'));
          }  
        if (this.setAggregationLevel('oblast')){
      
        }
        else{
          App.service.Map.filterAreaOfInterest('','0');
        }        
        App.service.Helper.getComponentExt('legend-cx-current').setValue(true);
      }
    }
  },

  /**
  * @method onRayon
  * when rayon is changed, zoom to new extent, apply map filter, set aggregation level
  * @param cb
  * combobox
  * @param val
  * new value
  */
  onRayon: function (cb, val) {
    App.service.Watcher.set('Rayon', val);
    if (val) {
      App.service.Helper.resetComboboxes(['zoom-cb-wua']);
      App.service.Map.setMapExtent(App.service.Helper.getScalar('rayon', val, 'extent'), true);
        if (val != 'all'){
          App.service.Map.filterAreaOfInterest('rayon', val, 'oblast', App.service.Watcher.get('Oblast'));
          this.selectFilteredObject();
        }
        else{
          App.service.Map.filterAreaOfInterest('oblast', App.service.Watcher.get('Oblast'));
        }      
      if (this.setAggregationLevel('rayon')){

      }
      else{
        App.service.Map.filterAreaOfInterest('','0');
      }
      App.service.Helper.getComponentExt('legend-cx-current').setValue(true);
    }
  },

  /**
  * @method onRayonSearch
  * when rayon is changed, zoom to new extent, apply map filter, set aggregation level
  * @param cb
  * combobox
  * @param val
  * new value
  */
  onRayonSearch: function (cb, val) {
    if (val){
      var record_data = cb.findRecord('id', val).data;      
      this.onPilot(record_data.country_id, record_data.oblast_id, val, null, null, null);
      App.service.Helper.resetComboboxes(['zoom-cb-rayonsearch']);
    }
  },  

  /**
  * @method onBuis
  * when BUIS is changed, zoom to new extent, apply map filter, load depending comboboxes, set aggregation level
  * @param cb
  * combobox
  * @param val
  * new value
  */
  onBuis: function (cb, val) {
    App.service.Watcher.set('Buis', val);
    App.service.Helper.resetStores(['uis', 'wua']);
    App.service.Helper.resetComboboxes(['zoom-cb-uis', 'zoom-cb-wua']);
    App.service.Helper.hideComponents(['zoom-cb-uis', 'zoom-cb-wua']);

    if (val) {
      App.service.Helper.resetStores(['rayon']);
      App.service.Helper.resetComboboxes(['zoom-cb-oblast', 'zoom-cb-rayon']);
      App.service.Helper.hideComponents(['zoom-cb-rayon']);

      if (val != 'all'){
        App.service.Helper.showComponents(['zoom-cb-uis']);
        Ext.getStore('uis').load({params: {buis: val}});
      }

      //avoid zoom to buis if other parameters are stored
      var uis = App.service.Watcher.get('Uis');
      if (uis == null){
        App.service.Map.setMapExtent(App.service.Helper.getScalar('buis', val, 'extent'), true);
          if (val != 'all'){
            App.service.Map.filterAreaOfInterest('buis', val);
            this.selectFilteredObject();
          }
          else{
            App.service.Map.filterAreaOfInterest('country', App.service.Watcher.get('Country'));
          }        
        if (this.setAggregationLevel('buis')){

        }
        else{
          App.service.Map.filterAreaOfInterest('','0');
        }
        App.service.Helper.getComponentExt('legend-cx-current').setValue(true);
      }
    }
  },

  /**
  * @method onUis
  * when UIS is changed, zoom to new extent, apply map filter, set aggregation level
  * @param cb
  * combobox
  * @param val
  * new value
  */
  onUis: function (cb, val) {
    App.service.Watcher.set('Uis', val);
    if (val) {
      App.service.Map.setMapExtent(App.service.Helper.getScalar('uis', val, 'extent'), true);
        if (val != 'all'){
          App.service.Map.filterAreaOfInterest('uis', val, 'buis', App.service.Watcher.get('Buis'));
          this.selectFilteredObject();
        }
        else{
          App.service.Map.filterAreaOfInterest('buis', App.service.Watcher.get('Buis'));
        }      
      if (this.setAggregationLevel('uis')){

      }
      else{
        App.service.Map.filterAreaOfInterest('','0');
      }
      App.service.Helper.getComponentExt('legend-cx-current').setValue(true);
    }
  },

  /**
  * @method onWua
  * when WUA is changed, zoom to new extent, apply map filter, set aggregation level
  * @param cb
  * combobox
  * @param val
  * new value
  */
  onWua: function (cb, val) {
    App.service.Watcher.set('Wua', val);
    //reset filter if user clears search textfield
    if (val == null) {
      cb.clearValue();
      cb.doQuery('', true);
      cb.collapse();
    }
    else if (val) {
      App.service.Helper.resetComboboxes(['zoom-cb-rayon', 'zoom-cb-uis']);
      App.service.Map.setMapExtent(App.service.Helper.getScalar('wua', val, 'extent'), true);
        if ( val != 'all'){
          App.service.Map.filterAreaOfInterest('wua', val, 'oblast', App.service.Watcher.get('Oblast'));
          this.selectFilteredObject();
        }
        else{
          App.service.Map.filterAreaOfInterest('oblast', App.service.Watcher.get('Oblast'));
        }       
      if (this.setAggregationLevel('wua')){

      }
      else{
        App.service.Map.filterAreaOfInterest('','0');
      }
      App.service.Helper.getComponentExt('legend-cx-current').setValue(true);
    }
  },

  /**
  * @method setAggregationLevel
  * set aggregation level, check possible limitations of allowed aggregation levels of current indicator
  * 'grid' limitation: grid can be filtered only by country or oblast
  * @param aggreg
  * aggregation level
  * @return {Boolean}
  * true for successful setting of aggregation level
  */
  setAggregationLevel: function (aggreg) {
    if (App.service.Watcher.get('UserPolygon') == 'show'){
      return false;
    }
    var changeAggreg = false;
    var aggregation_id = App.service.Watcher.get('Aggregation');
    if (aggregation_id != aggreg){ 
      changeAggreg = true;
    }
    //possible limitation of indicator's aggregation levels
    var indicator = App.service.Watcher.getIndicator();
    var availableAggregations = indicator.aggregation;
    if (typeof availableAggregations == 'object') {
      
      if (availableAggregations.indexOf(aggreg) < 0) {
        changeAggreg = false;
        var aggreg_name = App.service.Helper.getById(__Aggregation, aggreg)[__Global.lang + 'NameShort'];
        var msg_title = i18n.adminFilters.zoom_to_selected + ' ' + aggreg_name; 
        if (App.service.Watcher.get(aggreg.charAt(0).toUpperCase() + aggreg.slice(1)) == 'all'){
          msg_title += i18n.exp.plural;
        }
        //Ext.Msg.alert(msg_title, "'" + indicator[__Global.lang + 'Name'] + "' is not available as " + aggreg_name + ' Map.'); 
        Ext.toast({
          html: "'" + indicator[__Global.lang + 'Name'] + "' " + i18n.adminFilters.is_not_available_as + " " + aggreg_name + ' ' + i18n.aggreg.map + '.',
          title: msg_title,
          //width: 200,
          align: 't',
          anchor: App.service.Helper.getComponentExt('map-container'),
          closable: false,
          slideDUration: 1000,
          maxWidth: 400
        });
        // means 'grid' and 'wua' limitation: grid and wua can be filtered only by country or oblast
        if (aggreg != 'country' && aggreg != 'oblast'){
          return false;
        }
      }
    }
    if (changeAggreg){
      App.service.Watcher.set('Aggregation', aggreg);
      App.service.Helper.setComponentsValue([
        { id: 'switcher-cb-aggregation', selection: 'Aggregation' }
      ]);
    }
    return true;
  },

  /**
  * @method resetFilter
  * reset all map filters
  * @param button
  * reset button
  * @param e
  * click event: do not collapse/expand accordion panel
  */  
  resetFilter: function(button, e){
    App.service.Map.filterAreaOfInterest('','0');
    //do not collapse/expand accordion panel by clicking on the button in the header
    e.stopPropagation();
  },

  /**
  * @method onPilot
  * when pilot area is selected, clear all stored ids, empty comboboxes, set new ids, 
  * start loading chain with country combobox
  * @param country
  * country id
  * @param oblast
  * oblast id
  * @param rayon
  * rayon id
  * @param buis
  * buis id
  * @param uis
  * uis id
  * @param wua
  * wua id  
  */
  onPilot: function (country, oblast, rayon, buis, uis, wua) {

    if (Ext.getStore('oblast').count() > 0){
      App.service.Watcher.set('Country', null);
      App.service.Watcher.set('Oblast', null);
      App.service.Watcher.set('Rayon', null);
      App.service.Watcher.set('Buis', null);
      App.service.Watcher.set('Uis', null);
      App.service.Watcher.set('Wua', null);
      App.service.Helper.setComponentsValue([{ id: 'zoom-cb-country', selection: 'Country' }]);
    }
    // else{
    //   //undefined error
    //   App.service.Watcher.set('Country', country);
    // }

    //set values
    App.service.Watcher.set('Country', country);
    App.service.Watcher.set('Oblast', oblast);
    App.service.Watcher.set('Rayon', rayon);
    App.service.Watcher.set('Buis', buis);
    App.service.Watcher.set('Uis', uis);
    App.service.Watcher.set('Wua', wua);

    App.service.Helper.setComponentsValue([{ id: 'zoom-cb-country', selection: 'Country' }]);
  },

  /**
  * @method selectFilteredObject
  * set the filtered map unit selected as if the user had clicked on this unit (highlight and show chart window)
  */ 
  selectFilteredObject: function(){
    if (!!App.util.Layer.current){
      if (App.util.Layer.current.getVisible()){
        //trigger programmatically WMS getFeature event, 
        //show chart window only if filtered object covers the map center
        var coordinates = App.service.Map.instance.getView().getCenter();
        App.service.Chart.click_coordinates = coordinates;
        setTimeout(function(){
            App.service.Chart.doRequest();
          }, 251
        );
      }
    }
  }
});
