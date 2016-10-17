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
  //layout: 'fit',
  defaults:{
    padding: '7px 4px 7px 4px'
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
      text: i18n.polygon.upload,     
      iconCls: 'x-fa fa-upload', 
      handler: 'onUpload',     
      itemId: 'polygon-btn-upload',      
      disabled: true 
    },{ 
      xtype: 'label',
      html: 'Click on a polygon<br>to activate<br>the buttons below!'
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
   /* },{ 
      text: 'Show Values',           
      iconCls: 'x-fa fa-list', 
      handler: 'onShowValues',     
      itemId: 'polygon-btn-show',      
      disabled: true */
    },{ 
      text: 'Export to EXCEL',       
      iconCls: 'x-fa  fa-file-excel-o', 
      handler: 'onExcel',     
      itemId: 'polygon-btn-excel',      
      disabled: true 
    },{ 
      text: i18n.polygon.remove,     
      iconCls: 'x-fa  fa-remove', 
      handler: 'onRemove',     
      itemId: 'polygon-btn-remove',      
      disabled: true 
    }
  ]
});