Ext.define('App.view.switcher.IconLabel', {
    extend:'Ext.form.Label',

      xtype: 'app-switcher-iconlabel',

  itemId: 'switcher-iconlabel',
    iconCls: null,
    constructor: function(config) {
    var me = this;
        me.componentCls= config.iconCls ? config.iconCls + ' ' + 'x-label-icon' : null
        me.callParent( arguments );
    }
});
