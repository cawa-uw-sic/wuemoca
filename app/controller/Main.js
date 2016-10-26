Ext.define('App.controller.Main', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.main',

  interval: false,

  onMainAfterRender: function () {
    //App.service.Helper.getComponentExt('app-introwindow').show();
  },

  onMapAfterRender: function () {
    App.service.Map.setMainTitle();
  },

  onLegendBtn: function () {
    App.service.Helper.getComponentExt('legend-window').show();
  },

  onShowPolygon: function(){
    App.service.Polygon.switchView(true);
  },

  onHidePolygon: function(){
    App.service.Polygon.switchView(false);
  },
  onPrintChart: function(){
      var win = window.open('', '_blank');
      win.document.open();
      win.document.write(
        '<html>',
        '<head>',
          '<link rel="stylesheet" href="build/development/app/resources/app-all.css" />',
          '<link rel="stylesheet" href="' + Ext.getResourcePath('css/style.css') + '" />',

        '</head>',
          '<body>',
          //'<body onload="window.print()">',
            '<div class="clearfix">'+document.getElementById('app-header-gridpanel').innerHTML+'</div>',
          '</body>',
        '</html>');
      win.document.close();
  }
});