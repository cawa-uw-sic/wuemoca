Ext.define('App.view.wue.FormByDecade', {
  extend: 'Ext.grid.Panel',

  xtype: 'app-wue-form-by-decade',

  requires: [
    'Ext.selection.CellModel',
    'Ext.grid.*',

    'App.store.WueDecade'
  ],

  plugins: [ new Ext.grid.plugin.CellEditing() ],

  features: [{
    ftype: 'grouping',
    groupHeaderTpl: '{name}',
    id: 'yearGrouping'
  }],

  store: {
    type: 'wue-decade'
  },

  height: 350,

  initComponent: function() {
    var columns = [{
      header: i18n.wue.decade,
      dataIndex: 'decade',
      flex: 1
    }];

    for (var i = 1; i <= 12; i++) {
      columns.push({
        header: i18n.month['m'+i],
        dataIndex: 'm' + i,
        width: 54,
        editor: { allowBlank: true }
      });
    }

    Ext.apply(this, {
      columns: columns
    });

    this.callParent();

    this.groupingFeature = this.view.getFeature('yearGrouping');
  },

  listeners: {
    afterrender: 'onRenderFormByDecade'
  }

});

