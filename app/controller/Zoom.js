Ext.define('App.controller.Zoom', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.zoom',

  onCountry: function (cb, val) {
    App.service.Watcher.set('Country', val);
    App.service.Helper.resetStores(['oblast', 'buis']);
    App.service.Helper.resetComboboxes(['zoom-cb-oblast', 'zoom-cb-buis']);
    App.service.Helper.hideComponents(['zoom-cb-oblast', 'zoom-btn-oblast', 'zoom-cb-buis', 'zoom-btn-buis']);

    if (val) {
      //avoid zoom to country if other parameters are stored
      var oblast = App.service.Watcher.get('Oblast');
      var buis = App.service.Watcher.get('Buis');
      if ((oblast == null || oblast == '0') && (buis == null || buis == '0')){
        App.service.Map.setMapExtent(App.service.Helper.getScalar('country', val, 'extent'));
        //if (val != '0'){
          App.service.Map.filterAreaOfInterest('country', val);
        //}
      }
      if (val != '0'){
        App.service.Helper.showComponents(['zoom-cb-oblast', 'zoom-btn-oblast']);
        Ext.getStore('oblast').load({params: {country: val}});
        if (val == 'UZB') {
          App.service.Helper.showComponents(['zoom-cb-buis', 'zoom-btn-buis']);
          Ext.getStore('buis').load({params: {country: val}});
        }
      }
      //App.service.Map.filterAreaOfInterest('country', val);
    }
  },

  onOblast: function (cb, val) {
    App.service.Watcher.set('Oblast', val);

    App.service.Helper.resetStores(['rayon', 'wua']);
    App.service.Helper.resetComboboxes(['zoom-cb-rayon', 'zoom-cb-wua']);
    App.service.Helper.hideComponents(['zoom-cb-rayon', 'zoom-btn-rayon', 'zoom-cb-wua', 'zoom-btn-wua']);
    if (val) {

      App.service.Helper.resetStores(['uis']);
      App.service.Helper.resetComboboxes(['zoom-cb-buis', 'zoom-cb-uis']);
      App.service.Helper.hideComponents(['zoom-cb-uis', 'zoom-btn-uis']);
      if (val != '0'){
        App.service.Helper.showComponents(['zoom-cb-rayon', 'zoom-btn-rayon']);
        Ext.getStore('rayon').load({params: {oblast: val}});
        Ext.getStore('wua').load({params: {oblast: val, buis:''}});
      }

      //avoid zoom to oblast if other parameters are stored
      var rayon = App.service.Watcher.get('Rayon');
      var wua = App.service.Watcher.get('Wua');
      if ((rayon == null || rayon == '0') && (wua == null || wua == '0')){
        App.service.Map.setMapExtent(App.service.Helper.getScalar('oblast', val, 'extent')); 
        this.setAggregationLevel('oblast');
        if (val != '0'){
          App.service.Map.filterAreaOfInterest('oblast', val);
        }
        else{
          App.service.Map.filterAreaOfInterest('country', App.service.Watcher.get('Country'));
        }        

      }
    }
  },

  onRayon: function (cb, val) {
    App.service.Watcher.set('Rayon', val);
    if (val) {
      App.service.Helper.resetComboboxes(['zoom-cb-wua']);
      App.service.Map.setMapExtent(App.service.Helper.getScalar('rayon', val, 'extent'));
      this.setAggregationLevel('rayon');
      if (val != '0'){
        App.service.Map.filterAreaOfInterest('rayon', val);
      }
      else{
        App.service.Map.filterAreaOfInterest('oblast', App.service.Watcher.get('Oblast'));
      }
    }
  },

  onBuis: function (cb, val) {
    App.service.Watcher.set('Buis', val);

    App.service.Helper.resetStores(['uis', 'wua']);
    App.service.Helper.resetComboboxes(['zoom-cb-uis', 'zoom-cb-wua']);
    App.service.Helper.hideComponents(['zoom-cb-uis', 'zoom-btn-uis', 'zoom-cb-wua', 'zoom-btn-wua']);

    if (val) {

      App.service.Helper.resetStores(['rayon']);
      App.service.Helper.resetComboboxes(['zoom-cb-oblast', 'zoom-cb-rayon']);
      App.service.Helper.hideComponents(['zoom-cb-rayon', 'zoom-btn-rayon']);

      if (val != '0'){
        App.service.Helper.showComponents(['zoom-cb-uis', 'zoom-btn-uis']);
        Ext.getStore('uis').load({params: {buis: val}});
        //Ext.getStore('wua').load({params: {oblast: '', buis: val}});
      }
      //avoid zoom to buis if other parameters are stored
      var uis = App.service.Watcher.get('Uis');
      var wua = App.service.Watcher.get('Wua');
      if ((uis == null || uis == '0') && (wua == null || wua == '0')){
        App.service.Map.setMapExtent(App.service.Helper.getScalar('buis', val, 'extent'));
        this.setAggregationLevel('buis');        
        if (val != '0'){
          App.service.Map.filterAreaOfInterest('buis', val);
        }
        else{
          App.service.Map.filterAreaOfInterest('country', App.service.Watcher.get('Country'));
        }          
      }
    }
  },

  onUis: function (cb, val) {
    App.service.Watcher.set('Uis', val);
    if (val) {
      App.service.Map.setMapExtent(App.service.Helper.getScalar('uis', val, 'extent'));
      this.setAggregationLevel('uis');
      if (val != '0'){
        App.service.Map.filterAreaOfInterest('uis', val);
      }
      else{
        App.service.Map.filterAreaOfInterest('buis', App.service.Watcher.get('Buis'));
      }      
    }

  },

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
      App.service.Map.setMapExtent(App.service.Helper.getScalar('wua', val, 'extent'));
      this.setAggregationLevel('wua');
      if (val != '0'){
        App.service.Map.filterAreaOfInterest('wua', val);
      }
      else{
        App.service.Map.filterAreaOfInterest('oblast', App.service.Watcher.get('Oblast'));
      }      
      
    }
    
  },
  setAggregationLevel: function (aggreg) {
  //onBtnZoom: function (button, e) {
    //var aggreg = button.getItemId().replace('zoom-btn-', '');
    var changeAggreg = true;
    var availableAggregations = App.service.Watcher.getIndicator().aggregation;
    if (typeof availableAggregations == 'object') {
      if (availableAggregations.indexOf(aggreg) < 0) {
        changeAggreg = false;
      }
    }

    if (changeAggreg){
      var unit = '';
      for (var u = 0; u < __Aggregation.length; u++){
        if (App.service.Helper.inArrayId(__Aggregation[u].items, aggreg)){
          unit = __Aggregation[u].id;
          break;
        }
      }

      App.service.Watcher.set('Unit', unit);

      App.service.Watcher.set('Aggregation', aggreg);
      App.service.Helper.setComponentsValue([
        { id: 'switcher-cb-unit', selection: 'Unit' },
        { id: 'switcher-cb-aggregation', selection: 'Aggregation' }
      ]);
    }
  }

});
