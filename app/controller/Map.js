/**
* map controller
*/
Ext.define('App.controller.Map', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.map',
/**
* @method onAfterRender
* create overview map
*/
  onAfterRender: function (view) {

    var map = App.service.Map.instance;

    App.service.Helper.getComponentExt('app-overview').add(
      Ext.create('GeoExt.component.OverviewMap', {
        parentMap: map,
        layers: App.util.Layer.overview,
        magnification: 15
      })
    );
    //mouse click for chart window
    map.on('singleclick', function(e) { App.service.Chart.display(e); });

    //mouse over for status bar
    map.on('pointermove', function(e) { App.service.Tooltip.display(e); });

    App.service.Chart.initialize();

  }

});
