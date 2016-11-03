Ext.define('App.view.polygon.Index', {
  extend: 'Ext.toolbar.Toolbar',

  requires: [
    'App.controller.Polygon'
  ],

  xtype: 'app-polygon',

  controller: 'polygon',

  dock: 'right',

  listeners: {
    afterrender: 'onAfterRender'
  },

  items: [
     { text       : i18n.polygon.activate,         handler   : 'onActivate',                itemId: 'polygon-btn-activate'                         }
    ,{ text       : i18n.polygon.deactivate,       handler   : 'onDeactivate',              itemId: 'polygon-btn-deactivate',  hidden: true        }
    ,{ text       : i18n.polygon.edit,             handler   : 'onEdit',                    itemId: 'polygon-btn-edit',        disabled: true      }
    ,{ text       : i18n.polygon.calculate,        handler   : 'onCalculate',               itemId: 'polygon-btn-calculate',   disabled: true      }
    ,{ text       : i18n.polygon.remove,           handler   : 'onRemove',                  itemId: 'polygon-btn-remove',      disabled: true      }
    ,{ buttonText : i18n.polygon.upload,           listeners : { afterrender: 'onUpload' }, itemId: 'polygon-btn-upload',      xtype: 'filefield', buttonOnly: true }
  ]
});