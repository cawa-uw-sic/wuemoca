Ext.define('App.view.chart.CropPriceWindow', {
  extend: 'Ext.Window',

  xtype: 'app-chart-croppricewindow',
  width: 560,
  height: 381,
  layout: 'fit',
  border: false,
  title:   '<i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>Crop prices in $/ton',
  collapsed: false,
  resizable: true,
  closeAction: 'hide',
  plain: true,
  shadow: true,
  bodyBorder: false,
  bodyStyle: 'margin: 10px;',

  html: 'Data sources of cotton, wheat and rice prices:<br><br>' +
    'Kazakhstan, Kyrgyzstan, Tajikistan, and Turkmenistan 2000-2017:<br>' +
    'FAOSTAT country-specific annual agriculture producer prices. ' +
    'These are prices received by farmers for primary crops, as collected at the point of initial sale (prices paid at the farm-gate). ' +
    'FAO does not provide data for Uzbekistan and Afghanistan. see http://www.fao.org/faostat/en/#data/PP<br><br>' +
    'Uzbekistan Cotton country-wide prices 2011-2016:<br>' +
    'Average prices for government procurement products, country-wide average of all cotton quality classes.<br><br>' +
    'Uzbekistan Wheat and rice province-specific prices 2013-2016:<br>' +
    'Derived from district-specific crop prices (averaged)'


 // html: '<img src="' + Ext.getResourcePath('images/crop_price_chart.png', null, '') + 
  //  '" width="100%" height="100%" border="0">'


});
