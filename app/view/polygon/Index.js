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
  layout: 'fit',
  defaults:{
    //width: 138,
    border: '1px'
  },
  items: [
     {
      text: i18n.polygon.activate,
      iconCls: 'x-fa fa-edit',
      handler: 'onActivate',
      itemId: 'polygon-btn-activate',
      disabled: !__LocalDB.get('Selections.UserPolygon', false)
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
        iconCls: 'x-fa fa-upload',
       // tooltip: 'only zipped Shapefile, coordinate system WGS 84 (EPSG:4326)',
        ui: 'default-toolbar',
        handler: function(){ alert('Select a zipped Polygon Shapefile with coordinate system WGS 84 (EPSG:4326)');},
        baseCls: 'x-btn'
      }

    },{
      xtype: 'label',
      html: 'Click on a polygon<br>to activate<br>the buttons below'
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
    /*},{
      text: 'Show Chart',
      iconCls: 'x-fa fa-bar-chart',
      handler: 'onShowChart',
      itemId: 'polygon-btn-chart',
      disabled: true
    },{
      text: i18n.polygon.exportExcel,
      iconCls: 'x-fa  fa-file-excel-o',
      handler: 'onExcel',
      itemId: 'polygon-btn-excel',
      disabled: true */
    },{
      text: i18n.polygon.remove,
      iconCls: 'x-fa  fa-remove',
      handler: 'onRemove',
      itemId: 'polygon-btn-remove',
      disabled: true
    }
  ]
});