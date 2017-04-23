/**
* BISA data model
*/
Ext.define('App.model.Buis', {
  extend: 'Ext.data.Model',

  fields: [
    { name: 'id',     type: 'string' },
    { name: 'name',   type: 'string' },
    { name: 'extent', type: 'string' }
  ]

});