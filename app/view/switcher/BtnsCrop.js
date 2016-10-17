Ext.define('App.view.switcher.BtnsCrop', {
  extend: 'Ext.container.ButtonGroup',

  requires: [

  ],

  xtype: 'app-switcher-btns-crop',

  itemId: 'switcher-btns-crop',
  title: i18n.crop.label,
  titleAlign : 'left',
  hidden: true,

  border: false,
  frame: false,
  columns: 6,
  //flex: 1,



  defaults:{
    width: 36,
    height: 36,
    padding: 3,
    margin: '0 5 5 0'
  },
  items: []

});