/**
* 
*/
Ext.define('App.view.exporter.CbDownloadselection', {
  extend: 'Ext.form.field.ComboBox',

  xtype: 'app-exporter-cb-downloadselection',
  /**
  */
  itemId: 'exporter-cb-downloadselection',

  requires: [
    'App.store.DownloadSelection'
  ],    
  /**
  */  
  width: 290,
  /**
  */  
  forceSelection: true,

  fieldLabel: i18n.exp.selectFilter,

  store: {
    type: 'downloadselection'
  },

  /**
  * @property {Ext.XTemplate} tpl template with style for the content inside the drop down
  */   
  tpl: Ext.create('Ext.XTemplate',
    '<tpl for=".">',
        '<div class="x-boundlist-item">{name}</div>',
    '</tpl>'
  ),

  displayField: 'name',
  /**
  */  
  valueField: 'filter',
  /**
  */    
  queryMode: 'local',
  /**
  */ 
  editable: false,
  /**
  * {@link App.controller.Switcher#onDownloadSelection}
  */
  listeners: {
    change: 'onDownloadSelection'
  }

});