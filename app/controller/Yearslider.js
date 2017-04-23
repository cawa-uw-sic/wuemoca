/**
* year slider controller
*/
Ext.define('App.controller.Yearslider', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.yearslider',
  /**
  * @method onChange
  * store new year
  * @param el
  * yearslider
  * @param val
  * new value
  */
  onChange: function (el, val) {
    App.service.Watcher.set('Year', val);
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
