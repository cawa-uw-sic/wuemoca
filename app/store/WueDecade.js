Ext.define('App.store.WueDecade', {
  extend: 'Ext.data.JsonStore',

  alias: 'store.wue-decade',

  storeId: 'wue-decade',

  fields: [ 
  	'year', 
  	'decade',{
	    //type: 'float',
	    name: 'm3'
	},{
	    //type: 'float',
	    name: 'm4'
	},{
	    //type: 'float',
	    name: 'm5'
	},{
	    //type: 'float',
	    name: 'm6'
	},{
	    //type: 'float',
	    name: 'm7'
	},{
	    //type: 'float',
	    name: 'm8'
	},{
	    //type: 'float',
	    name: 'm9'
	},{
	    //type: 'float',
	    name: 'm10'
	}
  ],

  groupField: 'year',

  groupDir: 'DESC',

  data: []

});
