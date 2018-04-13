function getItems() {
  console.log(__Crop, __Global);
  var items = [];

  __Crop.map(function (crop) {
    if (crop.idx == 0) return false;
    items.push({
      iconCls: crop.id,
      itemId: crop.id,
      scale: 'large',
      tooltip: crop[__Global.lang + 'Name'],
      toggleGroup: 'prod-crops',
      pressed: crop.id == 'cotton',
      handler: 'onCropChange'
    });
  });

  return items;
}

Ext.define('App.view.prod.Radio', {
  extend: 'Ext.container.ButtonGroup',

  xtype: 'app-prod-radio',

  itemId: 'prod-radio',

//  columns: 3,

  items: getItems(),

  defaults:{
    width: 36,
    height: 36,
    padding: 3,
    margin: '0 0 4 4'
  }

});
