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
      ,{ id: 'switcher-cb-aggregation', selection: 'Aggregation' }
    ]);
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

    if (!val){
      val == '';
    }

    App.service.Watcher.set('Indicator', val);
    /**
    * get stored indicator object
    */
    var indicator = App.service.Watcher.getIndicator();

   // var label = '<a href="' + __Global.urls.GlossaryBase + indicator['glossary'] +  
    var label = '<a data-qtip="' + indicator[__Global.lang + 'Name'] + ' ' + (indicator[__Global.lang + 'Affix'] || '') + 
      ':<br> ' + indicator[__Global.lang + 'Tooltip'] + '<br>' + i18n.header.readmore +
      '" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>' + i18n.indicator.label;  

    cb.setFieldLabel(label);

    App.service.Map.fillCrops();
    App.service.Map.fillAggregations();

    App.service.Yearslider.didRender();
    App.service.Yearslider.pause();
    if (App.service.Chart.click_coordinates && !App.service.Chart.window.isHidden()) App.service.Chart.doRequest();
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
    if (App.service.Chart.click_coordinates && !App.service.Chart.window.isHidden()) App.service.Chart.doRequest();
    if (App.service.Watcher.get('UserPolygon') == 'show' && !App.service.Polygon.windowChart.isHidden()) {
      App.service.Polygon.showChartWindow();
    }
    var label = '<span style="font-size:13px;"><a data-qtip="' + i18n.header.readmore + ' ' + button.tooltip + 
      '" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>' + 
      i18n.crop.label + '</span>';    
    App.service.Helper.getComponentExt('switcher-btns-crop').setTitle(label);
  },

  /**
  * @method onAggregation
  * when aggregation is changed, check map filter, store new aggregation, set cb label with tooltip, update chart
  * @param cb
  * combobox
  * @param val
  * new value
  */
  onAggregation: function (cb, val) {
    App.service.Map.onAggregation(cb, val);
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
    App.service.Map.filterAreaOfInterest('','0');
    App.service.Watcher.set('Indicator', undefined);
    App.service.Watcher.set('Aggregation', 'oblast');
    this.afterRender();
    //do not collapse/expand accordion panel by clicking on the button
    e.stopPropagation();
  }

});
