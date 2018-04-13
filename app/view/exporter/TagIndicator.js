Ext.define('App.view.exporter.TagIndicator', {
  extend: 'Ext.form.field.Tag',

  requires: [
    'App.store.IndicatorExport'
  ],

  xtype: 'app-exporter-tag-indicator',


  
  fieldLabel: i18n.indicator.label,

  store: {
    type: 'indicatorexport'
  },

  displayField: __Global.lang + 'Name',
  queryMode: 'local',
  valueField: 'id',

  emptyText: i18n.exp.all,

  filterPickList: true,

  editable: false,
  selectOnFocus: false,
    // Template for the dropdown menu.
  // Note the use of the "x-list-plain" and "x-boundlist-item" class,
  // this is required to make the items selectable.
  //grouping: http://jsfiddle.net/rraponi/n9sm2q1e/
  tpl: Ext.create('Ext.XTemplate',
       '<tpl for=".">',
       '<tpl for="' + __Global.lang + 'Group" if="this.shouldShowHeader(' + __Global.lang + 'Group)">' +
       '<div class="group-header">{[this.showHeader(values.' + __Global.lang + 'Group)]}</div></tpl>',
       '<div class="x-boundlist-item" data-qtip="{' + __Global.lang + 'Tooltip}">' +
       '{' + __Global.lang + 'Name} ({' + __Global.lang + 'Unit})</div>',
       '</tpl>',
     // '<ul class="x-list-plain"><tpl for=".">',
     //     '<li role="option" class="x-boundlist-item" data-qtip="{' + __Global.lang + 'Tooltip}">{' + __Global.lang + 'Name} ({' + __Global.lang + 'Unit})</li>',
    //  '</tpl></ul>',
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
  /*displayTpl: Ext.create('Ext.XTemplate',
      '<tpl for=".">',
        //'<div data-qtip="{' + __Global.lang + 'Tooltip}">',
        '{' + __Global.lang + 'Name} ({' + __Global.lang + 'Unit})',
      '</tpl>'
  ), */

   listConfig: {
       cls: 'grouped-list',
       maxHeight: 400
   }
  
});