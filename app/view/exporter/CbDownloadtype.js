/**
* 
*/
Ext.define('App.view.exporter.CbDownloadtype', {
  extend: 'Ext.form.field.ComboBox',

  xtype: 'app-exporter-cb-downloadtype',
  /**
  */
  itemId: 'exporter-cb-downloadtype',
  /**
  */  
  width: 290,
  /**
  */  
  forceSelection: true,

  fieldLabel: i18n.exp.selectOutput,
  /**
  * @property {Ext.data.Store} store
  * @property {String[]} store.fields id, enName, ruName
  * @property {Object[]} store.data 
  */  
  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'enName', 'ruName'],
    data : [
      {
        id: 'excel',
        enName: 'Excel table',
        ruName: 'Таблица Excel'
      },{
        id: 'SHAPE-ZIP',
        enName: 'Shapefile (zip)',
        ruName: 'Шейпфайл (zip)'
      },{
        id: 'application/vnd.google-earth.kml+xml',
        enName: 'KML (Google Earth)',
        ruName: 'KML (Google Earth)'
      },{
        id: 'application/json',
        enName: 'GeoJSON',
        ruName: 'GeoJSON'
      }
    ]
  }),
  /**
  * @property {Ext.XTemplate} tpl template with style for the content inside the drop down
  */   
  tpl: Ext.create('Ext.XTemplate',
    '<tpl for=".">',
        '<div class="x-boundlist-item">{' + __Global.lang + 'Name}</div>',
    '</tpl>'
  ),
  /**
  */    
  displayField: __Global.lang + 'Name',
  /**
  */    
  queryMode: 'local',
  /**
  */  
  valueField: 'id',
  /**
  Selected value
  */ 
  value: 'excel',
  /**
  */ 
  editable: false


});