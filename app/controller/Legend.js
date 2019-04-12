/**
* legend controller
*/
Ext.define('App.controller.Legend', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.legend',
  /**
  * @method onIrrigationExtent
  * switch maximum irrigation extent layer on and off
  * @param el
  * checkbox
  * @param val
  * value (true/false)  
  */
  onIrrigationExtent: function (el, val) {
    BackgroundLayers.irrigation.setVisible(val);
    //App.util.Layer.irrigVisible = val;
    App.service.Watcher.set('IrrigationExtent', val ? 'show' : 'noshow');
  },
  /**
  * @method onCurrentLayer
  * switch current layer on and off
  * @param el
  * checkbox
  * @param val
  * value (true/false)    
  */
  onCurrentLayer: function (el, val) {
    if (!!App.util.Layer.current){
      App.util.Layer.current.setVisible(val);
    }
    App.service.Yearslider.didRender();
    App.service.Watcher.set('Current', val ? 'show' : 'noshow');
  },

  onUserPolygon: function (el, val) {
    App.service.Polygon.layer.setVisible(val);
    if (!val){
      App.service.Polygon.deselectMapAndList();
    }
    App.service.Polygon.rerenderFeatures();
  },
  /**
  * @method onOpacityIrrigation
  * set opacity of maximum irrigation extent layer
  * @param el
  * slider
  * @param val
  * value (0-100)   
  */
  onOpacityIrrigation: function (el, val) {
    BackgroundLayers.irrigation.setOpacity(val / 100);
  },
  /**
  * @method onOpacityCurrent
  * set opacity of current layer
  * @param el
  * slider
  * @param val
  * value (0-100)    
  */
  onOpacityCurrent: function (el, val) {
    App.util.Layer.current.setOpacity(val / 100);
    App.util.Layer.currentOpaque = val;

  },
  onOpacityUserPolygon: function (el, val) {
    App.service.Polygon.layer.setOpacity(val / 100);
    App.service.Polygon.rerenderFeatures();
  }

});