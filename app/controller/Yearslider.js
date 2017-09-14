/**
* year slider controller
*/
Ext.define('App.controller.Yearslider', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.yearslider',
  /**
  * @method onChangeComplete
  * store new year
  * @param el
  * yearslider
  * @param val
  * new value
  */
  onChangeComplete: function (el, val) {
    App.service.Watcher.set('Year', val);
    if (App.service.Chart.e && !App.service.Chart.window.isHidden()) App.service.Chart.doRequest();
  },
  
  onChange: function (el, val) {
    Ext.select('.app-yearslider .x-slider-horz .x-slider-thumb').elements[0].innerHTML = val;
  },
  /**
  * @method onAfterRender
  * set stored year
  * @param el
  * yearslider
  */
  onAfterRender: function (el) {
    el.setValue(App.service.Watcher.get('Year'));
  },
  /**
  * @method onPlay
  * start year animation
  */  
  onPlay: function () {
    App.service.Yearslider.play();
  },
  /**
  * @method onPause
  * stop year animation
  */
  onPause: function () {
    App.service.Yearslider.pause();
  }

});
