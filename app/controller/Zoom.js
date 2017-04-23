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
    App.service.Helper.hideComponents(['zoom-container-oblast','zoom-cb-oblast', 'zoom-container-buis', 'zoom-cb-buis']);
    
    if (val) {
      //avoid zoom to country if other parameters are stored
      var oblast = App.service.Watcher.get('Oblast');
      var buis = App.service.Watcher.get('Buis');
      if (oblast == null && buis == null ){
        App.service.Map.setMapExtent(App.service.Helper.getScalar('country', val, 'extent'), true);
        if (val != 'all'){
          App.service.Map.filterAreaOfInterest('country', val);
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
        if (this.setAggregationLevel('oblast')){
          if (val != 'all'){
            App.service.Map.filterAreaOfInterest('oblast', val);
          }
          else{
            App.service.Map.filterAreaOfInterest('country', App.service.Watcher.get('Country'));
          }        
        }
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
      if (this.setAggregationLevel('rayon') && val != 'all'){
        App.service.Map.filterAreaOfInterest('rayon', val, 'oblast', App.service.Watcher.get('Oblast'));
      }
      else{
        App.service.Map.filterAreaOfInterest('oblast', App.service.Watcher.get('Oblast'));
      }
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
        if (this.setAggregationLevel('buis') && val != 'all'){
          App.service.Map.filterAreaOfInterest('buis', val);
        }
        else{
          App.service.Map.filterAreaOfInterest('country', App.service.Watcher.get('Country'));
        }
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
      if (this.setAggregationLevel('uis')){
        if (val != 'all'){
          App.service.Map.filterAreaOfInterest('uis', val, 'buis', App.service.Watcher.get('Buis'));
        }
        else{
          App.service.Map.filterAreaOfInterest('buis', App.service.Watcher.get('Buis'));
        }
      }
      else{
        App.service.Map.filterAreaOfInterest('country', App.service.Watcher.get('Country'));        
      }
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
      if (this.setAggregationLevel('wua') && val != 'all'){
        App.service.Map.filterAreaOfInterest('wua', val, 'oblast', App.service.Watcher.get('Oblast'));
      }
      else{
        App.service.Map.filterAreaOfInterest('oblast', App.service.Watcher.get('Oblast'));
      } 
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
    var changeAggreg = false;
    if (App.service.Watcher.get('Aggregation') != aggreg){ 
      changeAggreg = true;
    }
    //possible limitation of indicator's aggregation levels
    var availableAggregations = App.service.Watcher.getIndicator().aggregation;
    if (typeof availableAggregations == 'object') {
      // means 'grid' limitation: grid can be filtered only by country or oblast
      if (availableAggregations.indexOf(aggreg) < 0) {
        changeAggreg = false;
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
    //do not collapse/expand accordion panel
    e.stopPropagation();
  },
  /**
  * @method onPilot
  * when pilot area is selected, clear all stored ids, empty comboboxes, set new ids, start loading chain with country combobox
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
    //undefined error
    if (Ext.getStore('oblast').count() > 0){
      App.service.Watcher.set('Country', null);
    }
    else{
      App.service.Watcher.set('Country', country);
    }
    App.service.Watcher.set('Oblast', null);
    App.service.Watcher.set('Rayon', null);
    App.service.Watcher.set('Buis', null);
    App.service.Watcher.set('Uis', null);
    App.service.Watcher.set('Wua', null);
    App.service.Helper.setComponentsValue([{ id: 'zoom-cb-country', selection: 'Country' }]);
    //set values
    App.service.Watcher.set('Country', country);
    App.service.Watcher.set('Oblast', oblast);
    App.service.Watcher.set('Rayon', rayon);
    App.service.Watcher.set('Buis', buis);
    App.service.Watcher.set('Uis', uis);
    App.service.Watcher.set('Wua', wua);

    App.service.Helper.setComponentsValue([{ id: 'zoom-cb-country', selection: 'Country' }]);
  }

});
