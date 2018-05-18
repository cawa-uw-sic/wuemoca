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
  // grouping: http://jsfiddle.net/rraponi/n9sm2q1e/
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

  listConfig: {
    cls: 'grouped-list',
    maxHeight: 400
  }
});