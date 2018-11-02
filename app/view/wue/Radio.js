Ext.define('App.view.wue.Radio', {
  extend: 'Ext.form.RadioGroup',

  xtype: 'app-wue-radio',

  itemId: 'wue-radio',

  columns: 3,

  items: [
    { 
      name: 'period', 
      boxLabel: i18n.wue.byYear + '<i class="fa fa-info" style="padding:0 5px 0 10px;"></i>', 
      boxLabelAttrTpl: 'data-qtip="' + App.service.Helper.getById( __Indicator_userPolygon, 'wf')[__Global.lang + 'ProdTooltip'] + '"', 
      inputValue: 'year', 
      checked: true 
    },
    { name: 'period', boxLabel: i18n.wue.byMonth,  inputValue: 'month' },
    { name: 'period', boxLabel: i18n.wue.byDecade, inputValue: 'decade' }
  ],

  listeners: {
    change: 'onPeriodChange'
  }

});
