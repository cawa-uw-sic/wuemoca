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
  viewConfig:{
    markDirty:false
},

  initComponent: function() {
    var columns = [{
      text: i18n.wue.year,
      //custom class (no right border in header and cells)
      //tdCls: 'app-wue-form-by-month-yearcolumn',
      //cls: 'app-wue-form-by-month-yearcolumn',
      dataIndex: 'year',
      flex: 1,
      menuDisabled: true
    }];

    for (var i = 4; i <= 9; i++) {
      columns.push({
        text: i18n.month['m' + i],
        xtype: 'numbercolumn',
        dataIndex: 'm' + i,
        width: 70,
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

