Ext.define('App.view.loss.GridResult', {
  extend: 'Ext.grid.Panel',

  requires: [
    'Ext.selection.CellModel',
    'Ext.grid.*',
    'App.controller.Loss',
    'App.store.LossResult'
  ],

  xtype: 'app-loss-grid-result',

  itemId: 'loss-grid-result',

  controller: 'loss',

  flex: 1,

  tbar: [
    { text: i18n.loss.exportXls, handler: 'onExportResult' }
  ],

  plugins: [ new Ext.grid.plugin.CellEditing() ],

  features: [{
    ftype: 'grouping',
    groupHeaderTpl: '{name}',
    collapsible: false,
    collapseTip: '',
    id: 'yearGrouping'
  }],

  columnLines: true,

  split: true,

  lockedGridConfig: {
    header: false,
    collapsible: true,
    width: 300,
    forceFit: true
  },

  lockedViewConfig: {
    scroll: 'horizontal'
  },

  initComponent: function() {
    var columns = [{
      header: i18n.loss.alias,
      dataIndex: 'alias',
      flex: 1,
      minWidth: 105,
      sortable: false
    },{
      header: i18n.loss.indicator,
      dataIndex: 'name',
      flex: 1,
      minWidth: 320,
      sortable: false
    },{
      header: i18n.loss.unit,
      dataIndex: 'unit',
      flex: 1,
      minWidth: 50,
      menuDisabled: true
    },{
      header: i18n.loss.formula,
      dataIndex: 'formula',
      flex: 1,
      minWidth: 200,
      sortable: false
    }];

    for (var m = 4; m <= 9; m++) {
      var month = {
        header: i18n.month['m' + m],
        columns: []
      };


      for (var d = 1; d <= 3; d++) {
        month.columns.push({
          header: d,
          dataIndex: 'm_0' + m + '_' + d,
          minWidth: 80,
          flex: 1,
          menuDisabled: true,
          editor: { allowBlank: true }
        });
      }

      columns.push(month);
    }

    Ext.apply(this, {
      columns: columns
    });

    this.callParent();

    this.groupingFeature = this.view.getFeature('yearGrouping');
  }
});