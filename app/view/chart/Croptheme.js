Ext.define('App.view.chart.Croptheme', {
    extend: 'Ext.chart.theme.Base',
    singleton: true,
    xtype: 'app-chart-croptheme',
    alias: ['chart.theme.croptheme'],

    config: {
        colors: [
			cotton_color, 
			wheat_color, 
			rice_color, 
			alfa_color, 
			orchard_color, 
			garden_color, 
			other_color, 
			maize_color, 
			sun_color, 
			veg_color
        ]
     
    }

});
