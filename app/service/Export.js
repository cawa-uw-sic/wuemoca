/**
* methods for (geo)data download
*/
Ext.define('App.service.Exporter', {

  singleton: true,
  /**
  * @method setDownloadCombotext
  * update comboboxes of download option window, 
  * adapt window to regular resp. polygon download
  */
  setDownloadCombotext: function(){
    var button = App.service.Helper.getComponentExt('exporter-btn-download');
    button.setDisabled(App.service.Watcher.getIndicator().chart == 'Multiannual' ||
      App.service.Watcher.get('UserPolygon') == 'show');

    var aggregation = App.service.Watcher.getAggregation();

    // download selection of filter combobox unvisible with user polygon
    /*App.service.Helper.getComponentExt('exporter-cb-downloadselection').setVisible(
      App.service.Watcher.get('UserPolygon') != 'show'
    );*/

    // first entry of download selection option list: all aggregation units
    var aggregationlevel = aggregation[__Global.lang + 'NameShort'];
    var downloadSelectionData =  [{
      id: '0', 
      filter: 'all',
      name: i18n.exp.all + ' ' + aggregationlevel + i18n.exp.plural
    }];
    // second entry of download selection option list: filtered aggregation unit(s) by area filter
    var filterFilter = '';
    var nameFliter = '';
    // check if area filter is applied
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
    downloadSelectionData.push({
      id: '1',
      filter: filterFilter, 
      name: nameFilter
    });
    // third entry of download selection option list: selected aggregation unit by mouse click on the map
    var filterSelection = '';
    var nameSelection = '';
    // check if chart class has data, means that an unit is selected by mouse click
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
    // store user selection to recover it after new data loading
    var selectedIndex = App.service.Helper.getComboboxSelectedIndex('exporter-cb-downloadselection');
    var downloadSelectionStore = Ext.getStore('downloadselection');
    downloadSelectionStore.removeAll();
    downloadSelectionStore.loadData(downloadSelectionData);
    // set combobox value to previously selected index if any
    if (selectedIndex == -1 || App.service.Watcher.get('UserPolygon') == 'show'){
      selectedIndex = 0;
    }
    if (downloadSelectionStore.count() > selectedIndex){
      App.service.Helper.setComboboxSelectedIndex('exporter-cb-downloadselection', selectedIndex);
    }
  },

  download: function(params){
    var userPolygon = (App.service.Watcher.get('UserPolygon') == 'show');
    var aggregation = App.service.Watcher.getAggregation()['id'];
    var filter = params.filter;

    var outputformat = params.type;
    var year = params.year;
    var yearfilter = '';
    if (year != 'all'){
      yearfilter = 'year=' + year;
    }
    //propertyname = field list
    var propertyname = '';
    var field_array = App.service.Helper.getExportFields(userPolygon);
    field_array.map(function (field) {
      propertyname += field + ',';
    });
    if (userPolygon){
      propertyname += 'name,location,area_ha,';
      filter = '';
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
      var selectedPolygon = App.service.Polygon.getSelectedPolygons()[0];
      filename = selectedPolygon.info.name.replace(/ /g,"_");
      if (selectedPolygon.info.location != ''){
        filename += '_' + selectedPolygon.info.location.replace(/ /g,"_");
      }
    }
    else{
      filename = aggregation;
      //check if valid filter clause 
      if (filter.indexOf('=') != -1){
        cql_filter = '&CQL_FILTER=' + filter;
        filename += '_';
        var filter_value = filter.split('=')[1].replace(/'/g, '');
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
      
    App.service.Helper.openDocument(requesturl, 'download');    
  }

});