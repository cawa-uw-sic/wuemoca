Ext.define('App.view.switcher.BtnsCrop', {
  extend: 'Ext.container.ButtonGroup',

  requires: [

  ],

  xtype: 'app-switcher-btns-crop',

  itemId: 'switcher-btns-crop',

  titleAlign : 'left',
  header:{
    padding: '8 8 0 8'
  },
  hidden: true,

  border: false,
  frame: false,
  columns: 6,

  defaults:{
    width: 36,
    height: 36,
    padding: 3,
    margin: '0 0 4 4',
    scale: 'large',
    toggleGroup: 'switcher-crops',    
    handler: 'onCrop'
  },
  items: []

});