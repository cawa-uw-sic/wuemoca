Ext.define('App.view.wue.FormByMonth', {
  extend: 'Ext.grid.Panel',

  xtype: 'app-wue-form-by-month',

  requires: [
    'Ext.selection.CellModel',
    'Ext.grid.*',

    'App.store.WueMonth'
  ],

  plugins: [ new Ext.grid.plugin.CellEditing() ],

  store: {
    type: 'wue-month'
  },

  height: 350,

  initComponent: function() {
    var columns = [{
      header: i18n.wue.year,
      dataIndex: 'year',
      flex: 1
    }];

    for (var i = 3; i <= 10; i++) {
      columns.push({
        header: i18n.month['m' + i],
        dataIndex: 'm' + i,
        width: 55,
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

