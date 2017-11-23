Ext.define('App.view.wue.FormByDecade', {
  extend: 'Ext.grid.Panel',

  xtype: 'app-wue-form-by-decade',

  itemId: 'wue-form-by-decade',

  requires: [
    'Ext.selection.CellModel',
    'Ext.grid.*',
    'App.controller.Wue',
    'App.store.WueDecade'
  ],
  controller: 'wue',

  plugins: [ new Ext.grid.plugin.CellEditing() ],

  features: [{
    ftype: 'grouping',
    groupHeaderTpl: '{name} <div role="button" class="x-action-col-icon x-action-col-0 x-fa fa-save" ' +
      'data-qtip="Apply sum of decades to monthly form" style="padding:0 20px 0 20px;"></div>',
    collapsible: false,
    collapseTip: '',
    id: 'yearGrouping'
  }],

  store: {
    type: 'wue-decade'
  },
  columnLines: true,
  height: 350,

  initComponent: function() {
    var columns = [{
      header: i18n.wue.decade,
      dataIndex: 'decade',
      flex: 1,
      menuDisabled: true
    }];

    for (var i = 3; i <= 10; i++) {
      columns.push({
        header: i18n.month['m' + i],
        dataIndex: 'm' + i,
        width: 54,
        menuDisabled: true,
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
    afterrender: 'onRenderFormByDecade',
    //https://www.sencha.com/forum/showthread.php?311822-Action-in-grid-summary-row
    //click on grouping header button
    click: {
      fn: 'onApply',
      element: 'el',
      delegate: 'div.x-action-col-icon' // some specific class on your custom element
    }
  }

});

