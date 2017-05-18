/**
* Title combobox, used for expanding textfield with information, not intended for user selection
*/
Ext.define('App.view.header.CbTitle', {
  extend: 'Ext.form.field.ComboBox',

  xtype: 'app-header-cb-title',
  /**
  */
  itemId: 'header-cb-title',
  /**
  */  
  width: 290,
  /**
  */  
  forceSelection: true,
  /**
  * @property {Ext.data.Store} store
  * @property {String[]} store.fields id, title, enName, ruName
  * @property {Object[]} store.data one dataset only
  */  
  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'title', 'enName', 'ruName'],
    data : [
      {
        'id':'beta', 
        'title': 'WUEMoCA (' + i18n.header.beta + ')',
        'enName': 'WUEMoCA stands for ' + i18n.header.wuemoca_long + '<br><br>' +
          'WUEMoCA is a freely accessible interactive web mapping tool for the regional monitoring of ' +
          'irrigated cropland in the Aral Sea Basin. ' +
          'Information is largely based on optical Remote Sensing data (MODIS; ' +
          'Moderate Resolution Imaging Spectroradiometer) from 2000 to 2016. ' +
          'Results are summarized at different administrative and hydrographic levels and ' +
          'provided as maps, diagrams, and tables.' + '<br><br>' + 
          'With the designed system of indicators and methods, WUEMoCA aims to contribute to the ' +
          'current data basis at regional scale. Potential applications are supposed to include assessments ' +
          'of marginal lands with low productivity, the intensity of land use, and the assessment of water use ' +
          'efficiency.' + '<br><br>' +
          'The joint development of WUEMoCA and related research was conducted within the framework of the ' +
          'work package 3 of the 3rd project phase of the Regional Research Network \"Water in Central Asia\" (CAWa). ' +
          'The CAWa project is funded by the German Federal Foreign Office as scientific-technical component of the ' +
          'German Water Initiative for Central Asia (\"Berlin Process\"), grant no. AA7090002.' + '<br><br>' +
          'Please note that the tool ' +
          'and all documentary presented herewith are not finished yet. ' +
          'Thus, they are provided \"as is\" (April 2017), therefore refer to as BETA versions. ' +
          'Changes within those current beta versions are possible, even though meant to be under development. ' +
          'Since WUEMoCA is yet in the process of final developing, presented results and information provided ' +
          'must considered as preliminary.', 
        'ruName': i18n.header.wuemoca_long + '<br><br>' +
          'Обращаем Ваше внимание на то, что онлайн-инструмент WUEMoCA и вся представленная здесь документация, ' +
          'находятся в стадии разработки. Текущий статус проекта на этапе бета-версии (март 2017 г.). Возможны ' +
          'некоторые изменения. Представленные результаты и предоставленная информация должны рассматриваться как ' +
          'предварительные, поскольку WUEMoCA еще находится в процессе разработки.'
      }
    ]
  }),
  /**
  * style of the field element
  */    
  fieldStyle: 
    "font-size: 18px;" +
    "font-weight: bold;" +
    "color: #00589C;",
  /**
  * @property {Ext.XTemplate} tpl template with style for the content inside the drop down
  */   
  tpl: Ext.create('Ext.XTemplate',
    '<tpl for=".">',
        '<div style="padding:5px 10px;font-size:13px;color:#00589C;">{' + __Global.lang + 'Name}</div>',
    '</tpl>'
  ),
  /**
  */    
  displayField: 'title',
  /**
  */    
  queryMode: 'local',
  /**
  */  
  valueField: 'id',
  /**
  * when value is specified, then show this dataset (no empty field)
  */    
  value: 'beta',
  /**
  */ 
  editable: false

});