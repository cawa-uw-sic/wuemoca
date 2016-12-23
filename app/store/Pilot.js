Ext.define('App.store.Pilot', {
  extend: 'Ext.data.Store',

  alias: 'store.pilot',

  storeId: 'pilot',

  fields: [ 'id', 'name', 'country', 'oblast', 'rayon', 'buis', 'uis', 'wua' ],

  data: [
        {'id': '1', 'name': i18n.fergana.text, 'country':'UZB', 'oblast':'1730', 'rayon':null, 'buis':null, 'uis':null, 'wua':null},
        {'id': '2', 'name': i18n.khorezm.text, 'country':'UZB', 'oblast':'1733', 'rayon':null, 'buis':null, 'uis':null, 'wua':null},
        {'id': '3', 'name': i18n.dargom.text, 'country':'UZB', 'oblast':null, 'rayon':null, 'buis':'1', 'uis':'43', 'wua':null}
    ],

  proxy: {
    type: 'memory',
    reader: {
      type: 'json'
    }
  }
});
