Ext.define('App.view.chart.CropPriceWindow', {
  extend: 'Ext.Window',

  xtype: 'app-chart-croppricewindow',
  width: 560,
  height: 381,
  layout: 'fit',
  border: false,
  title:   '<a href="http://www.indexmundi.com" data-qtip="source: www.indexmundi.com" target="indexmundi">' +
    '<i class="fa fa-info" style="padding:0 20px 0 5px;"></i></a>World crop prices in $/ton',
  collapsed: false,
  resizable: true,
  closeAction: 'hide',
  plain: true,
  shadow: true,
  bodyBorder: false,

  html: '<img src="' + Ext.getResourcePath('images/crop_price_chart.png', null, '') + 
    '" width="100%" height="100%" border="0">'


});
