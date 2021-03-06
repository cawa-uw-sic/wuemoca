/**
* methods for (geo)data download
*/
Ext.define('App.service.Exporter', {

  singleton: true,
  //userPolygon: false,
  filter_array: false,
  filter: false,
  outputformat: false,
  yearfilter: false,
  year: false,
  indicatorfilter: false,
  indicator: false,  
  requires: [
    'App.util.Window'
  ],

  //acronym window
  window    : Ext.create('App.util.Window', { 
    itemId: 'acronym-window',
    title: i18n.acronyms.windowtitle, 
    tools: [{ 
      type: 'help',
      tooltip: i18n.acronyms.RS + '<br>' + i18n.acronyms.stats + '<br>' + i18n.acronyms.ET
    },{
      type: 'print',
      tooltip: 'Opens a new window',
      callback: function(){
        var group = '';
        var htmlTable = '<!DOCTYPE HTML><html><head><meta charset="utf-8">' +
          '<title>' + i18n.acronyms.printtitle + '</title>' +
          '<link rel="stylesheet" type="text/css" href="' + Ext.getResourcePath('css/print_acronym.css', null, '') + '">' +
          '</head><body>' +
          '<table class="table-bordered"><tr><th>' +  i18n.acronyms.acronym + '</th><th>' +  i18n.acronyms.name + '</th><th>' +  i18n.acronyms.crops + '</th><th>' +  i18n.acronyms.description + '</th></tr>';
        Ext.getStore('exportergrid').each(function(record){
          if (group != record.get('group')){
            group = record.get('group');
            htmlTable += '<tr><td colspan="4"><b>' + group + '</b></td></tr>';            
          }
          htmlTable += '<tr><td>' + record.get('field') + '</td><td>' + record.get('name') + '</td><td>' + record.get('crops') + '</td><td>' + record.get('tooltip') + '</td></tr>';
        });
        htmlTable += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
        htmlTable += '<tr><td>&nbsp;</td><td>' + i18n.acronyms.RS + '</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
        htmlTable += '<tr><td>&nbsp;</td><td>' + i18n.acronyms.stats + '</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
        htmlTable += '<tr><td>&nbsp;</td><td>' + i18n.acronyms.ET + '</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
        htmlTable += '</table></body></html>';
        var x = window.open('', 'acronym');
        x.document.open().write(htmlTable);
        x.document.close();        
      }

    }],    
    items: [],    
    listeners: { 
      show: 'onExporterWindow'
    }
  }),

  getGridData: function(userPolygon){
    var griddata = [];
    __Indicator.map(function (indicator) {
      if ((userPolygon && indicator.userDB) || (!userPolygon && indicator.serverDB)) {
        var croptext = '';
        if (!!indicator.crops){
          if (typeof indicator.crops == 'object'){
            if (isNaN(indicator.crops[0])){
              croptext = App.service.Helper.getById(__Crop, indicator.crops[0])[__Global.lang + 'Name'] + ', ';
            }
            croptext += i18n.acronyms.cwr;
          }
          else{
            croptext = i18n.acronyms.allcroptypes;
            if (indicator.crops != 'all'){
              croptext += ' ' + i18n.acronyms._and + ' ' + App.service.Helper.getById(__Crop, indicator.crops)[__Global.lang + 'Name'];
            }
          }     
        }
        else {
          croptext = '-';
        }
        griddata.push({
          field: indicator.field, 
          name: indicator[__Global.lang + 'Name'] + ' ' + (indicator[__Global.lang + 'Affix'] || '') + ' [' + indicator[__Global.lang + 'Unit'] + ']',
          group: i18n.acronyms.indicators + ': ' + indicator[__Global.lang + 'Group'].replace('<span style="color:#970016">','').replace('</span>',''),
          groupsort: indicator.groupsort,
          crops: croptext,
          tooltip: indicator[__Global.lang + 'Tooltip']
        }); 
      }       
    });

    if (userPolygon){
      __Indicator_userPolygon.map(function (indicator) {
        var croptext = indicator.field.indexOf('{crop}') != -1 ? i18n.acronyms.allcroptypes : '-';
        griddata.push({
          field: indicator.field, 
          name: indicator[__Global.lang + 'Name'] + ' [' + indicator[__Global.lang + 'Unit'] + ']',
          group: i18n.acronyms.additional,
          groupsort: '6',
          crops: croptext,
          tooltip: indicator[__Global.lang + 'ProdTooltip'] || ''
        });         
      });
    }
    __Crop.map(function(crop){
        griddata.push({
          field: crop.id, 
          name: crop[__Global.lang + 'Name'],
          group: i18n.acronyms.croptypes,
          groupsort: '7',
          crops: '',
          tooltip: ''
        });        
    });
    return griddata;
  },


/*  //http://jsfiddle.net/insin/cmewv/  https://gist.github.com/insin/1031969
  uri: 'data:application/vnd.ms-excel;base64,',
  template: '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
  'xmlns:x="urn:schemas-microsoft-com:office:excel" ' + 
  'xmlns="http://www.w3.org/TR/REC-html40">' +
  '<head><meta http-equiv="content-type" content="text/plain; charset=utf-8">' +
    '<!--[if gte mso 9]>' +
      '<xml>' +
        '<x:ExcelWorkbook><x:ExcelWorksheets>' +
          '<x:ExcelWorksheet>' +
            '<x:Name>{worksheet}</x:Name>' +
            '<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>' +
          '</x:ExcelWorksheet>' +
          '</x:ExcelWorksheets></x:ExcelWorkbook>' +
      '</xml>' +
    '<![endif]-->' +
  '</head><body><table>{table}</table></body></html>',*/

  /**
  * @method setDownloadCombotext
  * update download button and select filter combobox of the download options window, 
  */
  setDownloadCombotext: function(){
    var userPolygon = (App.service.Watcher.get('UserPolygon') == 'show');
    var aggregation = App.service.Watcher.getAggregation();

    var polygon;
    if (userPolygon){
      var selectedPolygons = App.service.Polygon.getSelectedPolygons();
      if (selectedPolygons && selectedPolygons.length > 0){
        polygon = selectedPolygons[0];
      }
    }


    //set download button enabled/disabled and text
    var button = App.service.Helper.getComponentExt('exporter-btn-download');
    var no_export = false;
    if (App.service.Watcher.getIndicator().chart == 'Multiannual' || aggregation.id == 'grid' || !App.util.Layer.current){
      no_export = true;
      App.service.Helper.getComponentExt('exporter-window').hide(); 
    }
    if (!!App.util.Layer.current){
      if (!App.util.Layer.current.getVisible()){
        no_export = true;
        if (!userPolygon){
          App.service.Helper.getComponentExt('exporter-window').hide(); 
        }
      }
    }
    button.setDisabled(no_export);
    button.setText(
      i18n.exp.download2 + ' ' + aggregation[__Global.lang + 'NameShort'] + ' ' + i18n.exp.mapOrTable
    );
    button.setTooltip(
      i18n.exp.btnTooltip1 + ' ' + aggregation[__Global.lang + 'NameShort'] + 
      ' ' + i18n.exp.btnTooltip2
    );
    //Download options window: select filter combobox
    //first entry of select filter list: all aggregation units
    var name_text = '';
    if (userPolygon){
      name_text = i18n.exp.allpolygons;
    }
    else{
      var aggregationlevel = aggregation[__Global.lang + 'NameShort'];
      name_text = i18n.exp.all + ' ' + i18n.exp.plural() + i18n.exp.ASB;
    }
    var downloadSelectionData =  [{
      id: '0', 
      filter: 'all',
      name: name_text
    }];
    //second entry of select filter list: filtered aggregation unit(s) by area filter, if applied
    var filterFilter = '';
    var nameFilter = '';
    if (userPolygon){
      if (!!polygon){
        filterFilter = polygon.uid;
        nameFilter = polygon.info.name;
      }
      else{
        filterFilter = 'no_filter';
        nameFilter = '-- ' + i18n.exp.noselectionPolygon + ' --';
      }
    }
    else{
      //check if area filter is applied
      var filter = App.service.Watcher.get('Aoi_Filter');
      var filterapplied = true;
      if (!!filter){
        var filtername = App.service.Helper.getComponentExt('zoom-cb-' + filter.split('_')[0]).getRawValue();
        if (filtername != ''){
          var conjunction = ': ';
          if (filter.split('_')[0] != aggregation['id']){
            conjunction = i18n.exp.conjunction;
          }
          filterFilter = filter;
          nameFilter = i18n.exp.filtered + ' ' + aggregationlevel + conjunction + filtername;
        }  
        else{
          filterapplied = false;   
        }          
      }
      else{
        filterapplied = false;       
      }
      if (!filterapplied){
        filterFilter = 'no_filter';
        nameFilter = '-- ' + i18n.exp.nofilter + ' --';
      }
    }
    downloadSelectionData.push({
      id: '1',
      filter: filterFilter, 
      name: nameFilter
    });
    //third entry of select filter list: selected aggregation unit by mouse click on the map, if applied
    if (!userPolygon){
      var filterSelection = '';
      var nameSelection = '';
      //check if chart object has data, means that an unit is selected by mouse click
      if (App.service.Chart.data.length > 0){
        var selection = App.service.Chart.data[0][aggregation['id'] + '_' + __Global.lang];
        filterSelection = aggregation['id'] + '_id=' + App.service.Chart.data[0][aggregation['id'] + '_id'];
        nameSelection = i18n.exp.selected + ' ' + aggregationlevel + ': ' + selection;
      }  
      else{
        filterSelection = 'no_selection';
        nameSelection = '-- ' + i18n.exp.noselection1 + ' ' + aggregationlevel + ' ' + i18n.exp.noselection2 + ' --';
      }
      downloadSelectionData.push({
        id: '2',
        filter: filterSelection, 
        name: nameSelection        
      });
    }

    //store user selection to recover it after new data loading
    var selectedIndex = App.service.Helper.getComboboxSelectedIndex('exporter-cb-downloadselection');
    var downloadSelectionStore = Ext.getStore('downloadselection');
    downloadSelectionStore.removeAll();
    downloadSelectionStore.loadData(downloadSelectionData);
    //set combobox value to previously selected index if any
    if (!!polygon){
      selectedIndex = 1;        
    }
    else{
      selectedIndex = 0;
    }
    if (downloadSelectionStore.count() > selectedIndex){
      App.service.Helper.setComboboxSelectedIndex('exporter-cb-downloadselection', selectedIndex);
    }

    var years = App.service.Report.getYearData();
    //add current year for user polygons if available
    if (userPolygon && !!polygon){
      var last_polygon_year = polygon.data[polygon.data.length-1].year;
      if (last_polygon_year > years[years.length-1].id){
        years.push({id: last_polygon_year, name: last_polygon_year});
      }
    }
    years.unshift({id: 1000, name: i18n.exp.all});
    App.service.Helper.getComponentExt('exporter-tag-year').getStore().setData(years);    
  },
  
  /**
  * @method download
  * prepare download of tables or maps, set filter
  * @param params
  * parameters transferred from the download options window
  */
  download: function(params){
    var userPolygon = (App.service.Watcher.get('UserPolygon') == 'show');
    this.filter = params.filter;
    this.filter_array = this.filter.split('=');
    this.outputformat = params.type;
    this.year = params.year;
    this.yearfilter = '';
    
    if (this.year != ''){
      //array
      if (this.year.length == 1){
        this.yearfilter = 'year=' + this.year;
      }
      else{
        this.year = this.year.sort();
        this.yearfilter = 'year in (' + this.year + ')';
      }
    }
    this.indicator = params.indicator;

    // if the user wants to download data of an user polygon (stored in JSON format)
    // in Excel format, SheetJS is used for client side export 
    if (this.outputformat == 'excel' && userPolygon){
      this.prepareData4Excel(this.filter == 'all');  
    }
    else{
      if (userPolygon){
        App.service.Polygon.writePolygon(this.filter == 'all', 0);
      }
      else{
        this.downloadWFS(false);
      }
    }
  },
  /**
  * @method downloadWFS
  * compose HTTP request URL of WFS download via GeoServer
  * @param userPolygon
  * boolean
  */
  downloadWFS: function(userPolygon){
    var filter_array = this.filter_array;
    var filter = this.filter;
    var outputformat = this.outputformat;
    var yearfilter = this.yearfilter;
    var year = this.year;
    var export_indicators = this.indicator;
    var aggregation = App.service.Watcher.getAggregation()['id'];
    //propertyname = field list
    var propertyname = '';
    var field_array = this.getExportFields(userPolygon, export_indicators);
    field_array.map(function (field) {
      propertyname += field + ',';
    });
    if (outputformat != 'excel'){
      propertyname += 'geom';
    }
    else{
      //remove last comma
      propertyname = propertyname.slice(0, -1);      
    }
    //filter and filename
    var ending = '';
    switch (outputformat){
      case 'excel':
        ending = '.xls';
        break;
      case 'application/vnd.google-earth.kml+xml':
        ending = '.kml';
        break;
      case 'SHAPE-ZIP':
        ending = '.zip';
        break;
    }
    var cql_filter = ''; 
    // filename as clear as possible
    var filename = '';

    if (userPolygon){

      if (filter == 'all'){
        filename = 'userpolygons';
        var uids = '';
        App.service.Polygon.all.map(
          function(polygon){
            uids += "'" + polygon.uid + "',";
        });        
        //remove last comma
        uids = uids.slice(0, -1); 
        cql_filter = '&CQL_FILTER=' + 'uid in (' + uids + ')';
      }
      else{
        var selectedPolygon = App.service.Polygon.getSelectedPolygons()[0];
        filename = selectedPolygon.info.name.replace(/ /g,"_");
        if (!!selectedPolygon.info.location && selectedPolygon.info.location != ''){
          filename += '_' + selectedPolygon.info.location.replace(/ /g,"_");
        }  
        cql_filter = '&CQL_FILTER=' + 'uid=' + "'" + selectedPolygon.uid + "'";    
      }
    }
    else{
      filename = aggregation;
      //check if valid filter clause 
      if (filter.indexOf('=') != -1){
        cql_filter = '&CQL_FILTER=' + filter;
        filename += '_';
        var filter_value = filter_array[1].replace(/'/g, '');
        //check if filter is composed of two components. If so take only the first part and ignore the second part
        if (filter_value.indexOf(' and ') != -1){
          filter_value = filter_value.split(' ')[0];
        }
        //check if aggregation level is equal to filter, to avoid redundancies
        var filter_name = filter.split('_')[0];
        if (aggregation == filter_name){
          filename += filter_value;
        }
        //if filter is superordinated (e.g. all rayons of oblast xy), then specify filter in filename
        else{
          filename += filter_name + '_' + filter_value;
        }
      }
    }
    if (yearfilter != ''){
      if (cql_filter == ''){
        cql_filter = '&CQL_FILTER=';        
      }
      else{
        cql_filter += ' and ';
      }
      cql_filter += yearfilter;
      filename += '_' + year;
    }      
    filename += ending;
    filename = filename.replace(/,/g, '_');

    var typename = __Global.geoserverWorkspace + ':';
    if (userPolygon){
      typename += 'mypolygon';
    }
    else{
      typename += 'ca_' + aggregation;
    }

    var requesturl = __Global.urls.Mapserver_WFS + 
      'outputFormat=' + outputformat +
      '&propertyName=' + propertyname +  
      cql_filter +  
      '&filename=' + filename +         
      '&typeName=' + typename;
      //'&id_policy=false';
      
    App.service.Helper.openDocument(requesturl, 'download', null);  
  },

  /**
  * @method getIndicators 
  * filter indicator list by user DB or server DB properties
  * @param userPolygon
  * boolean
  */
  getIndicators: function(userPolygon){
    //duplicate array of nested objects
    var indicatorData = JSON.parse(JSON.stringify(__Indicator));
    var filteredData = [];
    indicatorData.map(function (indicator) {
      if (indicator.chart != 'Multiannual' && 
        ((userPolygon && indicator.userDB) || (!userPolygon && indicator.serverDB))) {
        filteredData.push(indicator);
      }
    });
    return filteredData;
  }, 

  writeExcel: function (data, filename, sheetname) {
    var wb = XLSX.utils.book_new();
    wb.SheetNames.push(sheetname);
    //write JSON array to worksheet
    var ws = XLSX.utils.json_to_sheet(data);
    wb.Sheets[sheetname] = ws;
    var wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
    function s2ab (s) {
      var buff = new ArrayBuffer(s.length);
      var view = new Uint8Array(buff);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buff;
    }
    saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), filename + '.xlsx');
  },

  /**
  * @method prepareData4Excel 
  * the polygon indicator values, stored in user database in JSON format, are written to Excel file with SheetJS
  */
  prepareData4Excel: function (allPolygons) { 
    var self = this;
    var year = self.year;
    //indicator filter for export
    var export_indicators = self.indicator;
    var jSONData = [];
    var fileName = '';
    if (!allPolygons){
      var polygon = App.service.Polygon.getSelectedPolygons()[0];
      if (!!polygon){ 
        //copy of polygon data to extent it with name       
        jSONData = polygon.data.slice(); 
        for (d = 0; d < jSONData.length; ++d) {         
          jSONData[d]['name'] = polygon.info.name;
          if (!!polygon.info.location && polygon.info.location != ''){
            jSONData[d]['location'] = polygon.info.location; 
          }
        }
        //Generate a file name
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName = jSONData[0]['name'].replace(/ |,/g,'_');  
      }
    }
    else if (allPolygons &&  App.service.Polygon.all.length > 0){ 
      fileName = 'user_polygon';
     
      App.service.Polygon.all.map(
        function(polygon){
          //copy of polygon data to extent it with name  
          temp_data = polygon.data.slice(); 
          for (d = 0; d < temp_data.length; ++d) {           
            temp_data[d]['name'] = polygon.info.name;
            if (!!polygon.info.location && polygon.info.location != ''){
              temp_data[d]['location'] = polygon.info.location; 
            }
          }
          jSONData = jSONData.concat(temp_data); 
        }
      );
    }

    if (jSONData.length > 0){
      //If jSONData is not an object then JSON.parse will parse the JSON string in an Object
      var arrData = typeof jSONData != 'object' ? JSON.parse(jSONData) : jSONData;

      var indicator_fields = self.getExportFields(true, export_indicators);

      //change order of arrData with selection of fields
      //http://jsfiddle.net/drndW/    
      var sortedData = JSON.parse(JSON.stringify( arrData, indicator_fields , 4));   

      for (var i = 0; i < indicator_fields.length; ++i) {  
        var key_empty = true; 
        for (var a = sortedData.length - 1; a >= 0; a--) {  
          //delete datasets of years which were not selected       
          if (year != '' && year.indexOf(sortedData[a]['year']) == -1){
            sortedData.splice(a, 1);
          }         
          else {
            //fill missing keys
            if(!sortedData[a][indicator_fields[i]]){   
              sortedData[a][indicator_fields[i]] = null;
            }
            else if (sortedData[a][indicator_fields[i]] != null && sortedData[a][indicator_fields[i]] != ''){
              key_empty = false;
            }
          }
        }
        //delete indicators which do not occur
        if (key_empty){
          for (var a = 0; a < sortedData.length; ++a) { 
            delete sortedData[a][indicator_fields[i]];
          }          
        }           
      }     

      if (year != ''){
        fileName += '_' + year;
      } 
      var sheetName = i18n.unit.polygon;

      this.writeExcel(sortedData, fileName, sheetName);
    }
  },

  getExportFields: function (userPolygon, export_indicators) {
    var indicator_fields = [];
    var aggregation = 'grid';
    if (!userPolygon){ 
      var aggregation_object = App.service.Watcher.getAggregation();
      aggregation = aggregation_object['id'];
      var aggregation_id = aggregation + '_id';
      indicator_fields.push(aggregation_id);
      if (aggregation != 'grid'){
        indicator_fields.push(aggregation + '_' + __Global.lang);
      }
      var super_filter = aggregation_object['super_filter'];
      if (super_filter != aggregation){
        indicator_fields.push(super_filter + '_id');
        indicator_fields.push(super_filter + '_' + __Global.lang);
      }
    } 
    else{
      indicator_fields.push('name'); 
      indicator_fields.push('location');      
    }
    indicator_fields.push('area_ha'); 
    indicator_fields.push('year');

    __Indicator.map(function (indicator) {
      var crop_spec = (!!indicator.crops_userDB && userPolygon) ? indicator.crops_userDB : indicator.crops;

      if (
        ((userPolygon && indicator.userDB) || (!userPolygon && indicator.serverDB))
        && indicator.chart != 'Multiannual' 
        && (userPolygon || indicator.aggregation == 'all' || indicator.aggregation.indexOf(aggregation) >= 0)
        && (export_indicators == '' || export_indicators.indexOf(indicator.id) != -1)
        ) {
        var field = indicator.field;
        if (!!crop_spec){
          if (typeof crop_spec == 'object'){
            crop_spec.map(function(crop){
              var fieldcopy = field;
              crop_name = !isNaN(crop) ? App.service.Helper.getByAttr(__Crop, 'idx', parseInt(crop)).id : crop;
              indicator_fields.push(fieldcopy.replace('{crop}', crop_name));
            });
          }
          else{
            __Crop.map(function(crop){
              //crop_spec can be 'all', 'sum' or 'avg'
              if (crop.idx == 0 && crop.id != crop_spec) return false;
              var fieldcopy = field;
              indicator_fields.push(fieldcopy.replace('{crop}', crop.id));
            });            
          }
        }
        else{
          indicator_fields.push(field);
        }
      }        
    });
    if (
      export_indicators != '' 
      && export_indicators.indexOf('vir') != -1 
      && export_indicators.indexOf('etf') == -1
      ){
      indicator_fields.push('etf_non');          
    }
    if (userPolygon){
      var wf_added = false;
      var temp_field_list = [];
      if (export_indicators == '' || export_indicators.indexOf('vir') != -1){

        temp_field_list.push('wf');
        wf_added = true;
        for (var month = 3; month <= 10; month++) {
          temp_field_list.push('etf_m' + month);
          temp_field_list.push('vir_m' + month);
          temp_field_list.push('wf_m' + month);
          for (var decade = 1; decade <= 3; decade++){
            temp_field_list.push('etf_m' + month + '_' + decade);
            temp_field_list.push('vir_m' + month + '_' + decade);
            temp_field_list.push('wf_m' + month + '_' + decade);
          }
        }
      }
      __Indicator_userPolygon.map(function (indicator) {
        var add = false;  
        if (export_indicators == ''){
          add = true;
        } 
        if (!add){
          indicator.connectedTo.map(function (conn) {  
            if (add) return false; 
            if (conn != 'vir' && export_indicators.indexOf(conn) != -1){
              add = true;
            } 
          });    
        }
        if (indicator.id == 'wf' && wf_added){
          add = false;
        } 
        if (add){
          //no monthly and decadal indicators
          if (indicator.id.indexOf('_d') == -1 && indicator.id.indexOf('_m') == -1){
            if(indicator.crops){
            __Crop.map(function (crop) {
              var crop_id = crop.id;
              //indicator.crops can be 'all', 'sum' or 'avg'
              if (crop.idx == 0 && crop.id != indicator.crops) return false;
              temp_field_list.push(indicator.id + '_' + crop_id);
            });
            }
            else{
              temp_field_list.push(indicator.id);
            }
          }
        }
      });
      indicator_fields = indicator_fields.concat(temp_field_list); 

    }
    return indicator_fields;
  }
    


});