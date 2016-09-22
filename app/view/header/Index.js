Ext.define('App.view.header.Index', {
  extend: 'Ext.toolbar.Toolbar',

  requires: [
    'Ext.layout.container.HBox',

    'App.controller.Header',

    'App.view.header.CawaLogo',
    'App.view.header.WULogo',
    'App.view.header.Title',
    'App.view.header.Pilot',
    'App.view.header.Feedback',
    'App.view.header.Help',
    'App.view.header.Locale'
  ],

  xtype: 'app-header',

  controller: 'header',

  cls: 'app-header',

  height: 55,

  layout: {
    type: 'hbox',
    pack: 'start',
    align: 'stretch'
  },

  bodyPadding: 5,

  items: [

     { xtype: 'app-header-cawalogo' }
    ,{ xtype: 'app-header-title'    }
    ,{ xtype: 'app-header-pilot'  }

    ,'->'

    ,{ xtype: 'app-header-feedback' }
    ,{ xtype: 'app-header-help'     }
    ,{ xtype: 'app-header-locale'   }
    ,{ xtype: 'app-header-wulogo'   }

  ]
});
