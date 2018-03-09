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
    if (selectedIndex == -1){
      selectedIndex = 0;
    }
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
    // if the user wants to download data of an user polygon (stored in JSON format)
    // in Excel format, use the JSON to HTML convertor (with explanations of DB acronyms)
    if (this.outputformat == 'excel' && userPolygon){
      App.service.Helper.JSONToHTMLConvertor(this.year);  
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
    var aggregation = App.service.Watcher.getAggregation()['id'];
    //propertyname = field list
    var propertyname = '';
    var field_array = App.service.Helper.getExportFields(userPolygon);
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
      //cql_filter = "&CQL_FILTER=uid='" + selectedPolygon.uid + "'";
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
      
    App.service.Helper.openDocument(requesturl, 'download');  
  }      


});