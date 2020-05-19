/**
* Yearslider methods
*/
Ext.define('App.service.Yearslider', {

  singleton: true,

  interval: false,

  play: function () {
    var self = this;
    var year = App.service.Watcher.get('Year');
    var indicator = App.service.Watcher.getIndicator();
    var minMax = this.getMinMax();
    self.interval = setInterval(function () {
      if (year == minMax.max) year = minMax.min;
      App.service.Watcher.set('Year', year);
      App.service.Helper.setComponentsValue([{ id: 'yearslider-slider', selection: 'Year' }])
      year += 1;
    }, 2000);
    App.service.Helper.showComponents(['yearslider-btn-pause']);
    App.service.Helper.hideComponents(['yearslider-btn-play']);
  },

  pause: function () {
    clearInterval(this.interval);
    this.interval = false;
    App.service.Helper.showComponents(['yearslider-btn-play']);
    App.service.Helper.hideComponents(['yearslider-btn-pause']);
  },

  didRender: function () {
    var indicator = App.service.Watcher.getIndicator();
    var slider = App.service.Helper.getComponentExt('yearslider-slider');
    var minMax = this.getMinMax(); 
    slider.setMaxValue(minMax.max);
    slider.setMinValue(minMax.min);
    if (!indicator.years || !App.util.Layer.current || !App.util.Layer.current.getVisible()){
      App.service.Helper.hideComponents(['app-yearslider', 'yearslider-btn-pause', 'yearslider-btn-play']);
    }
    else{
      App.service.Helper.showComponents(['app-yearslider', 'yearslider-btn-play']);
      App.service.Helper.hideComponents(['yearslider-btn-pause']);
      slider.setValue(App.service.Watcher.get('Year'));
      Ext.select('.app-yearslider .x-slider-horz .x-slider-thumb').elements[0].innerHTML = slider.getValue();
    }
  },

  getMinMax: function () {
    var result = { min: __Global.year.Min, max: __Global.year.Max };
    var indicator = App.service.Watcher.getIndicator();
    if (typeof indicator.years == 'object') {
      result.max = Ext.Array.max(indicator.years);
      result.min = Ext.Array.min(indicator.years);
    }
    return result;
  }

});