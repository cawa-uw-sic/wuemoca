Ext.define('App.view.loss.Grid', {
  extend: 'Ext.grid.Panel',

  requires: [
    'Ext.selection.CellModel',
    'Ext.grid.*',
    'App.controller.Loss',
    'App.store.Loss',
    'App.view.loss.Crop'
  ],

  xtype: 'app-loss-grid',

  itemId: 'loss-grid',

  controller: 'loss',

  flex: 1,

  store: {
    type: 'loss'
  },

  tbar: [
    { xtype: 'app-loss-crop' },
    { text: i18n.loss.export, handler: 'onExportInput' },
    {
      xtype: 'fileuploadfield',
      itemId: 'loss-btn-import',
      buttonOnly: true,
      buttonText: i18n.loss.import,
      width: 65,
      listeners: {
        change: 'onImportInput',
        render: 'onFileSelection'
      }
    }
  ],

  plugins: [ new Ext.grid.plugin.CellEditing({
    listeners: {
      beforeedit: function(e, opts){
        if (opts.record.data.fromServer) {
          Ext.Msg.show({
            title: i18n.loss.fromServerTitle,
            message: i18n.loss.fromServerText,
            buttons: Ext.Msg.OK
          });
          return false;
        }
      }
    }
  })],

  features: [{
    ftype: 'grouping',
    groupHeaderTpl: '{name}',
    collapsible: false,
    collapseTip: '',
    id: 'yearGrouping'
  }],

  columnLines: true,

  split: true,

  viewConfig: {
    getRowClass: function(record, rowIndex, rowParams, store){
      return record.get("fromServer") ? "loss-row-server" : "";
    }
  },

  initComponent: function() {
    var columns = [{
      header: i18n.loss.alias,
      dataIndex: 'alias',
      flex: 1,
      minWidth: 105,
      menuDisabled: true
    },{
      header: i18n.loss.indicator,
      dataIndex: 'name',
      flex: 1,
      minWidth: 320,
      menuDisabled: true
    },{
      header: i18n.loss.unit,
      dataIndex: 'unit',
      flex: 1,
      minWidth: 50,
      menuDisabled: true
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
  },

  bbar: Ext.create('Ext.ux.StatusBar', {
    itemId: 'loss-status',
    iconCls: 'ready-icon',
    text: '',

    items: [{
      itemId: 'loss-btn-submit',
      text: i18n.loss.btnSubmit,
      disabled: false,
      handler: 'onFormSubmit'
    }]
  })
});