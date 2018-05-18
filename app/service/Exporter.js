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

  //http://jsfiddle.net/insin/cmewv/  https://gist.github.com/insin/1031969
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
  '</head><body><table>{table}</table></body></html>',

  /**
  * @method setDownloadCombotext
  * update download button and select filter combobox of the download options window, 
  */
  setDownloadCombotext: function(){
    var userPolygon = (App.service.Watcher.get('UserPolygon') == 'show');
    var aggregation = App.service.Watcher.getAggregation();

    //set download button enabled/disabled and text
    var button = App.service.Helper.getComponentExt('exporter-btn-download');
    var no_export = false;
    if (App.service.Watcher.getIndicator().chart == 'Multiannual' ||
      //userPolygon ||
      aggregation.id == 'grid' ||
      !App.util.Layer.current){
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
      i18n.exp.download + ' ' + aggregation[__Global.lang + 'NameShort'] + ' ' + i18n.exp.mapOrTable
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
      name_text = i18n.exp.all + ' ' + aggregationlevel + i18n.exp.plural + i18n.exp.ASB;
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
      var selectedPolygons = App.service.Polygon.getSelectedPolygons();
      if (selectedPolygons && selectedPolygons.length > 0){
        filterFilter = selectedPolygons[0].uid;
        nameFilter = selectedPolygons[0].info.name;
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
    //if (selectedIndex == -1){
      if (userPolygon && selectedPolygons.length > 0){
        selectedIndex = 1;        
      }
      else{
        selectedIndex = 0;
      }
    //}
    if (downloadSelectionStore.count() > selectedIndex){
      App.service.Helper.setComboboxSelectedIndex('exporter-cb-downloadselection', selectedIndex);
    }
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
    // in Excel format, use the JSON to HTML convertor (with explanations of DB acronyms)
    if (this.outputformat == 'excel' && userPolygon){
      this.JSONToHTMLConvertor(this.filter == 'all');  
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
    if (userPolygon){
      propertyname += 'name,location,area_ha,';
      //filter = '';
    }
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
      }
      else{
        var selectedPolygon = App.service.Polygon.getSelectedPolygons()[0];
        filename = selectedPolygon.info.name.replace(/ /g,"_");
        if (!!selectedPolygon.info.location && selectedPolygon.info.location != ''){
          filename += '_' + selectedPolygon.info.location.replace(/ /g,"_");
        }      
      }
      cql_filter = '';
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
      '&typeName=' + typename; +
      //'&id_policy=false';
      
    App.service.Helper.openDocument(requesturl, 'download', null);  
  },

  getIndicators: function(userPolygon){
    //duplicate array of nested objects
    var indicatorData = JSON.parse(JSON.stringify(__Indicator));
    var filteredData = [];
    indicatorData.map(function (indicator) {
      if (indicator.chart != 'Multiannual' && 
        ((userPolygon && indicator.userDB) || (!userPolygon && indicator.serverDB))) {
        if (userPolygon){
          if (!!indicator[__Global.lang + 'Group_userDB']){          
            indicator[__Global.lang + 'Group'] = indicator[__Global.lang + 'Group' + '_userDB'];
          }
          if (!!indicator[__Global.lang + 'Name_userDB']){
            indicator[__Global.lang + 'Name'] = indicator[__Global.lang + 'Name' + '_userDB'];            
          }
        }
        filteredData.push(indicator);
      }
    });
    return filteredData;
  }, 

  /**
* @method base64
*/
  base64: function (s)    { return window.btoa(unescape(encodeURIComponent(s))) },
/**
* @method format
*/
  format: function (s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) },
/**
* @method JSONToHTMLConvertor 
* the polygon indicator values, stored in user database in JSON format, are written to HTML table with MS Excel content type
*/
  JSONToHTMLConvertor: function (allPolygons) { 
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
      fileName = 'my_polygons';
     
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
      var ctx = { worksheet: fileName, table: self.indicator_table(sortedData, year) };

      App.service.Helper.openDocument(
        self.uri + self.base64(self.format(self.template, ctx)), 
        null, 
        fileName + ".xls"
      );
    }
  },

  indicator_table: function (data, year) {
    var fieldCount = 0;
    var result = { head: '', body: '' };
   
    result.head += '<tr>';

    //This loop will extract the label from 1st index of on array
    for (var index in data[0]) {
      fieldCount++;
      result.head += '<th>' + index + '</th>';
    }
    result.head += '</tr>';

    //1st loop is to extract each row
    for (var i = 0; i < data.length; i++) {
      result.body += '<tr>';
      //2nd loop will extract each column
      for (var index in data[i]) {
        //empty for null value
        if (data[i][index] == null){
          result.body += '<td></td>';
        }
        //no number format for year and string
        else if (isNaN(data[i][index]) || index == 'year'){
          result.body += '<td>' + data[i][index] + '</td>';            
        }
        //format with decimals and thousand separators
        else{
          var format = '0';
          //read decimal places from the indicator list
          __Indicator.map(function (indicator) {
            if (index.indexOf(indicator.id) != -1 && indicator.decimals != undefined){
              format = '#,##0';
              if (indicator.decimals > 0){
                format += '.';
                for (var count = 1; count <= indicator.decimals; count++){
                  format += '0';
                }
              } 
            }
          });
          __Indicator_userPolygon.map(function (indicator) {
            if (index.indexOf(indicator.id) != -1 && indicator.decimals != undefined){
              format = '#,##0';
              if (indicator.decimals > 0){
                format += '.';
                for (var count = 1; count <= indicator.decimals; count++){
                  format += '0';
                }
              } 
            }
          });            
          //workaround for problem with three decimals and German or Russian delimiter 
          var value = parseFloat(data[i][index]).toFixed(4);
          //indices = table columns that are not within the indicator list
          if (index == 'area_ha'){
            format = '#,##0'; 
          }
          result.body += '<td style=\'mso-number-format:"' + format + '"\'>' + value + '</td>';      
        }
      }
      result.body += '</tr>';
    }
    
    //add column name explanation
    result.body += '<tr></tr>'; 
    result.body += '<tr>';     
    result.body += '<th>' + i18n.exp.indicatorAcronym + '</th>'; 
    result.body += '<th></th>';       
    result.body += '<th>' + i18n.exp.indicatorName + '</th>';  
    for (var i = 4; i <= fieldCount; i++){
      result.body += '<th></th>';        
    }
    result.body += '</tr>';       
    var export_indicators = this.indicator;

    __Indicator.map(function (indicator) {
      if (export_indicators == '' || export_indicators.indexOf(indicator.id) != -1){
        if (indicator.userDB){
          result.body += '<tr>';     
          result.body += '<td><b>' + indicator.field + '</b></td>'; 
          result.body += '<td></td>';       
          result.body += '<td>' + indicator[__Global.lang + 'Name'] + ' [' + indicator[__Global.lang + 'Unit'] + ']</td>';
          for (var i = 4; i <= fieldCount; i++){
            result.body += '<td></td>';        
          }   
          result.body += '</tr>';          
        }
      }
    });
    if (
      export_indicators != '' 
      && export_indicators.indexOf('vir') != -1 
      && export_indicators.indexOf('etf') == -1
    ){
      result.body += '<tr>';     
      result.body += '<td><b>' + 'etf_non' + '</b></td>'; 
      result.body += '<td></td>';   
      var etf_indicator = App.service.Helper.getById( __Indicator, 'etf');    
      result.body += '<td>' + etf_indicator[__Global.lang + 'Name'] + ' [' + etf_indicator[__Global.lang + 'Unit'] + ']</td>';
      for (var i = 4; i <= fieldCount; i++){
        result.body += '<td></td>';        
      }   
      result.body += '</tr>';       
    }
    __Indicator_userPolygon.map(function (indicator) {
      var add = false;  
      if (export_indicators == ''){
        add = true;
      } 
      if (!add){
        indicator.connectedTo.map(function (conn) {  
          if (add) return false; 
          if (export_indicators.indexOf(conn) != -1){
            add = true;
          } 
        });    
      } 
      if (add){
        result.body += '<tr>';     
        result.body += '<td><b>' + indicator.field + '</b></td>'; 
        result.body += '<td></td>';       
        result.body += '<td>' + indicator[__Global.lang + 'Name'] + ' [' + indicator[__Global.lang + 'Unit'] + ']</td>';
        for (var i = 4; i <= fieldCount; i++){
          result.body += '<td></td>';        
        }   
        result.body += '</tr>';     
      }     
    });         

    result.body += '<tr></tr>'; 
    result.body += '<tr>';     
    result.body += '<th>' + i18n.exp.cropAcronym + '</th>'; 
    result.body += '<th></th>';       
    result.body += '<th>' + i18n.exp.cropName + '</th>';   
    result.body += '</tr>';  

    __Crop.map(function (crop) {
      result.body += '<tr>';     
      result.body += '<td><b>' + crop.id + '</b></td>'; 
      result.body += '<td></td>';       
      result.body += '<td>' + crop[__Global.lang + 'Name'] + '</td>';   
      result.body += '</tr>';         
    }); 
 
    return '<thead>' + result.head + '</thead><tbody>' + result.body + '</tbody>';
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
      });

      //temp_field_list.sort();

      indicator_fields = indicator_fields.concat(temp_field_list); 

    }
    return indicator_fields;
  }
    


});