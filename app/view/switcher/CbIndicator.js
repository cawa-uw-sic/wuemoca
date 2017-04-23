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
  
  /*//http://stackoverflow.com/questions/34946014/combobox-showing-html-as-text
  fieldSubTpl: [ // note: {id} here is really {inputId}, but {cmpId} is available
      '<input id="{id}" data-ref="inputEl" type="{type}" {inputAttrTpl}',
          ' size="1"', // allows inputs to fully respect CSS widths across all browsers
          '<tpl if="name"> name="{name}"</tpl>',
          '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
          '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>',
          '{%if (values.maxLength !== undefined){%} maxlength="{maxLength}"{%}%}',
          '<tpl if="readOnly"> readonly="readonly"</tpl>',
          '<tpl if="disabled"> disabled="disabled"</tpl>',
          '<tpl if="tabIdx != null"> tabindex="{tabIdx}"</tpl>',
          '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
          '<tpl foreach="inputElAriaAttributes"> {$}="{.}"</tpl>',
      ' class="{fieldCls} {typeCls} {typeCls}-{ui} {editableCls} {inputCls}" autocomplete="off"/>',
      // overlay element to show formatted value
      '<div id="{cmpId}-overlayEl" data-ref="overlayEl"<tpl if="name"> name="{name}-overlayEl"</tpl> class="{fieldCls}-overlay {typeCls} {typeCls}-{ui} {inputCls}">{value}</div>',
      {
          disableFormats: true
      }
  ],*/
  forceSelection: true,

  /*childEls: [
      'overlayEl'
  ],

  setRawValue: function(value) {
      var me = this;

      // set value in overlay
      if (me.rendered) {
          me.overlayEl.update(value);
      }
      return me.callParent([value]);
  },*/
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
  displayTpl: Ext.create('Ext.XTemplate',
      '<tpl for=".">',
         '{' + __Global.lang + 'Name} ({' + __Global.lang + 'Unit})',    
          //'<a href="' + __Global.urls.GlossaryBase + '{glossary}" title="{' + __Global.lang + 'Tooltip}" target="glossary"><i class="fa fa-info" style="padding:0 20px 0 0;"></i></a>{' + __Global.lang + 'Name} ({' + __Global.lang + 'Unit})',
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
  }

});