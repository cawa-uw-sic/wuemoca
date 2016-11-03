Ext.define('App.view.chart.Croptheme', {
    extend: 'Ext.chart.theme.Base',
    singleton: true,
    xtype: 'app-chart-croptheme',
    alias: ['chart.theme.croptheme'],

    config: {
        colors: [ __CropColors.cotton, __CropColors.wheat, __CropColors.rice, __CropColors.other, __CropColors.orchard, __CropColors.garden, __CropColors.maize, __CropColors.veg, __CropColors.sun ]
    }

});
