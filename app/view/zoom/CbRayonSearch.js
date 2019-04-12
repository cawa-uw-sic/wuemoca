Ext.define('App.view.zoom.CbRayonSearch', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.RayonSearch'
  ],

  xtype: 'app-zoom-cb-rayonsearch',

  itemId: 'zoom-cb-rayonsearch',
  emptyText: i18n.adminFilters.rayonsearch_empty,
  //fieldLabel: i18n.adminFilters.rayonsearch,

  hidden: false,
  store: {
    type: 'rayonsearch'
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
  tpl: Ext.create('Ext.XTemplate',
    '<tpl for=".">',
      '<div class="x-boundlist-item">{name} ({oblast_name})</div>',
    '</tpl>'
  ),
  // template for the content inside text field
  displayTpl: Ext.create('Ext.XTemplate',
    '<tpl for=".">',
      '',
    '</tpl>'
  ),

  listeners: {
    change: 'onRayonSearch'
  }

});