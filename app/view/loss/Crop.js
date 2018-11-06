function getOpts() {
  var items = [];

  __Crop.map(function (crop) {
    if (crop.idx == 0) return false;
    items.push({
      text: crop[__Global.lang + 'Name'],
      value: crop.id
    });
  });

  return items;
}

Ext.define('App.view.loss.Crop', {
  extend: 'Ext.form.field.ComboBox',

  xtype: 'app-loss-crop',

  itemId: 'loss-crop',

  fieldLabel: i18n.crop.label,
  displayField: 'text',
  valueField: 'value',

  store: Ext.create('Ext.data.Store', {
    fields: ['text', 'value'],
    data: getOpts()
  })

});
