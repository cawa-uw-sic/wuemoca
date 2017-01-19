Ext.define('App.view.polygon.Index', {
  extend: 'Ext.toolbar.Toolbar',

  requires: [
    'App.controller.Polygon',
    'App.view.polygon.Grid'
  ],

  xtype: 'app-polygon',

  controller: 'polygon',

  dock: 'right',

  listeners: {
    afterrender: 'onAfterRender'
  },
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },
  defaults:{
    border: '1px'
  },
  items: [
     {
      text: i18n.polygon.activate,
      iconCls: 'x-fa fa-edit',
      handler: 'onActivate',
      itemId: 'polygon-btn-activate'
    },{
      text: i18n.polygon.deactivate,
      iconCls: 'x-fa fa-lock',
      handler: 'onDeactivate',
      itemId: 'polygon-btn-deactivate',
      hidden: true
    },{
      xtype: 'filefield',
      buttonOnly: true,
      listeners : { afterrender: 'onUpload' },
      itemId: 'polygon-btn-upload',
      buttonConfig: {
        text: i18n.polygon.upload,
        width: '100%',
        iconCls: 'x-fa fa-upload',
        ui: 'default-toolbar',
        handler: function(){ alert(i18n.polygon.uploadAlert);},
        baseCls: 'x-btn'
      }

   /* },{
      xtype: 'label',
      html: i18n.polygon.shift
    },{
      text: i18n.polygon.edit,
      iconCls: 'x-fa fa-map-marker',
      handler: 'onEdit',
      itemId: 'polygon-btn-edit',
      disabled: true
    },{
      text: i18n.polygon.calculate,
      iconCls: 'x-fa fa-calculator',
      handler: 'onCalculate',
      itemId: 'polygon-btn-calculate',
      disabled: true
    },{
      text: i18n.polygon.remove,
      iconCls: 'x-fa  fa-remove',
      handler: 'onRemove',
      itemId: 'polygon-btn-remove',
      disabled: true*/
    },{      
      xtype: 'label',
      html: '<b>' + i18n.polygon.list + '</b><br>(' + i18n.polygon.doubleclick + ')'
    },{
      xtype: 'app-polygon-grid'
    }
  ]
});