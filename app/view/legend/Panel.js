Ext.define('App.view.legend.Panel', {
  extend: 'Ext.panel.Panel',

  xtype: 'app-legend-panel',

  itemId: 'legend-panel',
  layout: 'hbox',
  cls: 'legend-panel',

  items:[{
  	xtype: 'image',
  	itemId: 'legend-image',
  	height: 150,
  	width: 40,
  	alt: 'legend',
  	src: ''
  },{
  	xtype: 'component',
    itemId: 'legend-text',
  	style: {
  		padding: '0px 0px 0px 5px',
  		fontSize: '13px',
  		lineHeight: '130%'
  	},

  	html: ''

  }]

});