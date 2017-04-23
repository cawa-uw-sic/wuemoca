/**
* Aggregation combobox
*/
Ext.define('App.view.switcher.CbAggregation', {
  extend: 'Ext.form.field.ComboBox',

  requires: [
    'App.store.Aggregation'
  ],

  xtype: 'app-switcher-cb-aggregation',
  /**
  */
  itemId: 'switcher-cb-aggregation',
  /**
  */
  labelAlign: 'top',
  /**
  */
  store: {
    type: 'aggregation'
  },
  // Template for the dropdown menu.
  // Note the use of the "x-list-plain" and "x-boundlist-item" class,
  // this is required to make the items selectable.
  /**
  * @property {Ext.XTemplate} tpl template for the item list inside the drop down: name with tooltip. 
  * Note the use of the "x-list-plain" and "x-boundlist-item" style classes, this is required to make the items selectable.  
  */  
  tpl: Ext.create('Ext.XTemplate',
    '<tpl for=".">',
    '<div class="x-boundlist-item" data-qtip="{' + __Global.lang + 'Tooltip}">' +
    '{' + __Global.lang + 'Name}</div>',
         // '<ul><tpl for=".">',
      //'<ul class="x-list-plain"><tpl for=".">',
         // '<li role="option" class="x-boundlist-item" data-qtip="{' + __Global.lang + 'Tooltip}">{' + __Global.lang + 'Name}</li>',
      //'</tpl></ul>'
    '</tpl>'
  ),
  /**
  * @property {String} displayField enName or ruName of aggregation array depending on locale
  */  
  displayField: __Global.lang + 'Name',
  /**
  */  
  queryMode: 'local',
  /**
  */  
  valueField: 'id',
  /**
  */  
  forceSelection: true,
  /**
  */
  editable: false,
  /**
  * {@link App.controller.Switcher#onAggregation}
  */
  listeners: {
    change: 'onAggregation'
  }

});