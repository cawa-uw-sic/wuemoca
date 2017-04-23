Ext.define('App.view.header.IntroWindow', {
	extend: 'Ext.Window',

	xtype: 'app-header-introwindow',

	itemId: 'header-introwindow',

    width: 440,
    height: 400,
	//modal: true,
	closeAction: 'hide',

	title: 'WUEMoCA Instruction Videos',
    layout: {
        type: 'table',
        columns: 3,
        tdAttrs: {
            style: {
                padding: '5px'
            }
        }		
    },
	defaults: {
		xtype: 'button',
		scale: 'large',
		iconAlign: 'bottom',
		padding: '3px'
	},
	items: [
		//header button
		{
			text: '<i class="fa fa-youtube-play" style="padding:0 5px 0 0;"></i>Header',
			handler: 'onVideoHeader',
			iconCls: 'header',
			width: '100%',
			height: 90,
			colspan: 3
		},
		//map control button
		{
			text: '<i class="fa fa-youtube-play" style="padding:0 5px 0 0;"></i>Map<br>controls',
			//handler: 'onVideoMapControl',
			iconCls: 'mapcontrol',
    		width: 100,
    		height: 240						
		},
		//map and diagrams button
		{
			text: '<i class="fa fa-youtube-play" style="padding:0 5px 0 0;"></i>Maps and diagrams',
			//handler: 'onVideoMapDiagram',
			iconCls: 'mapdiagram',
    		width: 200,
    		height: 240			
		},  
		//user polygon button
		{
			text: '<i class="fa fa-youtube-play" style="padding:0 5px 0 0;"></i>User<br>polygon<br>tool',
			//handler: 'onVideoUserPolygon',
			iconCls: 'userpolygon',	
			width: 100,
    		height: 240				
		} 
	]
});