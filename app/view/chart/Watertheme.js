Ext.define('App.view.chart.Watertheme', {
    extend: 'Ext.chart.theme.Base',
    singleton: true,
    xtype: 'app-chart-watertheme',
    alias: ['chart.theme.watertheme'],

    config: {
        colors: [
			wf_color, 
			gwc_color, 
			rain_color
        ]
     
    }

});
