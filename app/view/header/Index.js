Ext.define('App.view.header.Index', {
  extend: 'Ext.toolbar.Toolbar',

  requires: [
    'Ext.layout.container.HBox',

    'App.controller.Header',

    'App.view.report.Button',
    'App.view.header.CawaLogo',
    'App.view.header.FfoLogo',    
    'App.view.header.UniLogo',
    'App.view.header.SicLogo',
    'App.view.header.CbTitle',
    //'App.view.header.IntroWindowButton',
    //'App.view.header.Feedback',
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

  items: [

     { xtype: 'app-header-cawalogo' }
    ,{ xtype: 'app-header-ffologo' }
    ,{ xtype: 'app-header-cb-title'    }
    ,{ xtype: 'app-report-button'  }
    //,{ xtype: 'app-introwindow-button'  }

    ,'->'

    //,{ xtype: 'app-header-feedback' }
    ,{ xtype: 'app-header-help'     }
    ,{ xtype: 'app-header-locale'   }
    ,{ xtype: 'app-header-unilogo'   }
    ,{ xtype: 'app-header-siclogo'   }

  ]
});
