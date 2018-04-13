Ext.define('App.store.IndicatorExport', {
  extend: 'Ext.data.Store',

  alias: 'store.indicatorexport',

  storeId: 'indicatorexport',

  fields: [ 'enGroup', 'ruGroup', 'id', 'enName', 'ruName', 'enUnit', 'ruUnit', 'crops', 'aggreg', 'years', 'glossary', 'enTooltip', 'ruTooltip'],

  data: __Indicator,

  proxy: {
    type: 'memory',
    reader: {
      type: 'json'
    }
  }
});
