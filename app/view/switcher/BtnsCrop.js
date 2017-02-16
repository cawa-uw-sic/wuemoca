Ext.define('App.view.switcher.BtnsCrop', {
  extend: 'Ext.container.ButtonGroup',

  requires: [

  ],

  xtype: 'app-switcher-btns-crop',

  itemId: 'switcher-btns-crop',
  //title: i18n.crop.label,
  titleAlign : 'left',
  header:{
      padding: '8 8 0 8'
  },
  hidden: true,

  border: false,
  frame: false,
  columns: 5,
  //flex: 1,



  defaults:{
    width: 36,
    height: 36,
    padding: 3,
    margin: '0 0 5 5'
  },
  items: []

});