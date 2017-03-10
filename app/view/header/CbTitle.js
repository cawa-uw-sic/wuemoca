Ext.define('App.view.header.CbTitle', {
  extend: 'Ext.form.field.ComboBox',

  /*requires: [
    'App.store.Unit'
  ],
  hidden:true,*/
  xtype: 'app-header-cb-title',

  itemId: 'header-cb-title',
  width: 290,
  //fieldLabel: i18n.unit.label,

  //http://stackoverflow.com/questions/34946014/combobox-showing-html-as-text
  /*fieldSubTpl: [ // note: {id} here is really {inputId}, but {cmpId} is available
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

  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'title', 'enName', 'ruName'],
    data : [
      {
        "id":"beta", 
        "title": 'WUEMoCA (BETA version)',
        "enName": i18n.header.wuemoca_long + '<br><br>' +
          "Please note that the freely accessible online information tool WUEMoCA " +
          "and all documentary presented herewith are not finished yet. " +
          "Thus, they are provided \"as is\" (March 2017), therefore refer to as beta versions. " +
          "Changes within those current beta versions are possible, even though meant to be under development. " +
          "Since WUEMoCA is yet in the process of final developing, presented results and information provided " +
          "must considered as preliminary.", 
        "ruName": i18n.header.wuemoca_long
      }
    ]
  }),
  fieldStyle: 
    "font-size: 18px;" +
    "font-weight: bold;" +
    "color: #00589C;",

  tpl: Ext.create('Ext.XTemplate',
    '<tpl for=".">',
        '<div style="padding:5px 10px;font-size:13px;color:#00589C;">{' + __Global.Lang + 'Name}</div>',
    '</tpl>'
  ),
  displayField: 'title',
  queryMode: 'local',
  valueField: 'id',
  value: 'beta',

  editable: false,
  border: false,

  listeners: {
    //change: 'onUnit'
  }
});