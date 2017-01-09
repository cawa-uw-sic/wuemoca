Ext.define('App.view.zoom.CbWua', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Wua'
  ],

  xtype: 'app-zoom-cb-wua',

  itemId: 'zoom-cb-wua',
  emptyText: i18n.adminFilters.wua_empty,
  fieldLabel: i18n.adminFilters.wua,

  //labelAlign: 'top',

  hidden: true,
  store: {
    type: 'wua'
    //autoLoad: true
  },

  displayField: 'name',
  valueField: 'id',
  //all occurrences of typed letters are searched
  anyMatch: true,
  lastQuery: '',
  //the last filtered list is shown again when expanding
  triggerAction: 'last',
  //change event will be triggered on selection only
  forceSelection: true,
  queryMode: 'local',
  //editable=true enables the search function
  editable: true,
  // Template for the dropdown menu.
  // Note the use of "x-boundlist-item" class,
  // this is required to make the items selectable.
 /* matchFieldWidth: false,
  listConfig:{
    width: 250
  },*/
  tpl: Ext.create('Ext.XTemplate',
    '<tpl for=".">',
      '<div class="x-boundlist-item">{name}</div>',
    '</tpl>'
  ),
  // template for the content inside text field
  displayTpl: Ext.create('Ext.XTemplate',
    '<tpl for=".">',
      '{name}',
    '</tpl>'
  ),


  listeners: {
    change: 'onWua'
  }

});