/**
* country data model
*/
Ext.define('App.model.Country', {
  extend: 'Ext.data.Model',

  fields: [
    { name: 'id',     type: 'string' },
    { name: 'name',   type: 'string' },
    { name: 'extent', type: 'string' }
  ]

});