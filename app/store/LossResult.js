Ext.define('App.store.LossResult', {
  extend: 'Ext.data.JsonStore',

  alias: 'store.lossresult',

  storeId: 'lossresult',

  fields: [
    'alias',
    'name',
    'formula',
    'log',
    'year',
    'm_04_1',
    'm_04_2',
    'm_04_3',
    'm_05_1',
    'm_05_2',
    'm_05_3',
    'm_06_1',
    'm_06_2',
    'm_06_3',
    'm_07_1',
    'm_07_2',
    'm_07_3',
    'm_08_1',
    'm_08_2',
    'm_08_3',
    'm_09_1',
    'm_09_2',
    'm_09_3'
  ],

  groupField: 'year',

  groupDir: 'DESC',

  data: []

});
