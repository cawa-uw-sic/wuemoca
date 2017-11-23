Ext.define('App.view.wue.FormByMonth', {
  extend: 'Ext.grid.Panel',

  xtype: 'app-wue-form-by-month',

  itemId: 'wue-form-by-month',

  requires: [
    'Ext.selection.CellModel',
    'Ext.grid.*',

    'App.store.WueMonth'
  ],

  plugins: [ new Ext.grid.plugin.CellEditing() ],

  store: {
    type: 'wue-month'
  },
  columnLines: true,
  height: 350,

  initComponent: function() {
    var columns = [{
      text: i18n.wue.year,
      //custom class (no right border in header and cells)
      tdCls: 'app-wue-form-by-month-yearcolumn',
      cls: 'app-wue-form-by-month-yearcolumn',
      dataIndex: 'year',
      width: 60,
      menuDisabled: true
    },{
      xtype:'actioncolumn',
      flex: 1,
      hideable: false,
      menuDisabled: true,
      items: [{
        iconCls: 'x-fa fa-save',
        tooltip: 'Apply sum of months to yearly form',
        handler: 'onApply'
      }]
    }];

    for (var i = 3; i <= 10; i++) {
      columns.push({
        text: i18n.month['m' + i],
        dataIndex: 'm' + i,
        width: 55,
        menuDisabled: true,
        editor: { allowBlank: true }
      });
    }

    Ext.apply(this, {
      columns: columns
    });

    this.callParent();
  },

  listeners: {
    afterrender: 'onRenderFormByMonth'
  }

});

