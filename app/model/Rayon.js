/**
* district data model
*/
Ext.define('App.model.Rayon', {
  extend: 'Ext.data.Model',

  fields: [
    { name: 'id',     type: 'string' },
    { name: 'name',   type: 'string' },
    { name: 'oblast_id',     type: 'string' },
    { name: 'oblast_name',   type: 'string' },   
    { name: 'country_id',   type: 'string' },      
    { name: 'extent', type: 'string' }
  ]

});