Ext.define('App.view.header.Sparklinebar', {
  extend: 'Ext.sparkline.Bar',

  xtype: 'app-header-sparklinebar',

  getRegionFields: function (region) {
      var values = Ext.Array.from(this.values[region]),
          result = [],
          value, i,
          //customized
          record = this.getWidgetRecord();
      for (i = values.length; i--;) {
          value = values[i];
          result.push({
              isNull: value === null,
              value: value,
              color: this.calcColor(i, value, region),
              offset: region,
              //customized
              year: record.get('years')[region]
          });
      }
      return result;
  },

  tdCls: 'printchart-col',
  barWidth: 12,
  height: 60,
  chartRangeMin: 0,
  chartRangeMax: 100,
  tipTpl: '{year}: {value:number("0.00")} %'
  
});