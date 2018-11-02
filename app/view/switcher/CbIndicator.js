Ext.define('App.view.switcher.CbIndicator', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Indicator'
  ],

  xtype: 'app-switcher-cb-indicator',

  itemId: 'switcher-cb-indicator',

  fieldLabel: i18n.indicator.label,

  labelAlign: 'top',

  store: {
    type: 'indicator'
  },
  
  forceSelection: true,

  // Template for the dropdown menu.
  // Note the use of the "x-list-plain" and "x-boundlist-item" class,
  // this is required to make the items selectable.
  //grouping: http://jsfiddle.net/rraponi/n9sm2q1e/
  tpl: Ext.create('Ext.XTemplate',
       '<tpl for=".">',
       '<tpl if="this.shouldShowHeader(' + __Global.lang + 'Group)">' +
       '<div class="group-header">{[this.showHeader(values.' + __Global.lang + 'Group)]}</div></tpl>',
       '<div class="x-boundlist-item" data-qtip="{' + __Global.lang + 'Tooltip}">' +
       '{' + __Global.lang + 'Name} [{' + __Global.lang + 'Unit}]</div>',
       '</tpl>',
       {
       shouldShowHeader: function (group) {
           return this.currentGroup !== group;
       },
       showHeader: function (group) {
           this.currentGroup = group;
           return group;
       }
    }

  ),
  // template for the content inside text field
  displayTpl: Ext.create('Ext.XTemplate',
      '<tpl for=".">',
        //'<div data-qtip="{' + __Global.lang + 'Tooltip}">',
        '{' + __Global.lang + 'Name} [{' + __Global.lang + 'Unit}]',
      '</tpl>'
  ), 

  valueField: 'id',
  queryMode: 'local',
  editable: false,
   listConfig: {
       cls: 'grouped-list',
       maxHeight: 400
   },
  listeners: {
    change: 'onIndicator'
    /*afterrender: function(cb){
      Ext.tip.QuickTipManager.register({ target: cb.getEl(), itemId: 'switcher-qtip-indicator', text: 'snsebns' })
    }*/
  }

});