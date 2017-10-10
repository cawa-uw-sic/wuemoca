/**
* helper methods
*/
Ext.define('App.service.Helper', {

  singleton: true,

  resetStores: function (stores) {
    for (var i = stores.length - 1; i >= 0; i--) {
      Ext.getStore(stores[i]).removeAll();
    }
  },

  resetComboboxes: function (components) {
    for (var i = components.length - 1; i >= 0; i--) {
      var cmp = this.getComponentExt(components[i]);
      if (cmp) cmp.clearValue();
    }
  },

  setComponentsValue: function (components) {
    for (var i = 0; i < components.length; i++) {
      var cmp = this.getComponentExt(components[i].id);
      var val = App.service.Watcher.get(components[i].selection);
      if (cmp && val !== 'null') {
        cmp.setValue(components[i].value || val);
      }
    }
  },

  getComponentValue: function (itemId) {
      var cmp = this.getComponentExt(itemId);
      if (cmp) {
        return cmp.getValue();
      }
      else{
        return '';        
      }
  },

  getComboboxSelectedIndex: function (itemId){
    var combobox = this.getComponentExt(itemId);
    var store = combobox.getStore();
    return store.indexOf(combobox.findRecord(combobox.valueField, combobox.getValue()));
  }, 

  setComboboxSelectedIndex: function (itemId, index){
    var combobox = this.getComponentExt(itemId);
    combobox.setValue(combobox.getStore().getAt(index).get(combobox.valueField));
  }, 

  hideComponents: function (components) {
    for (var i = components.length - 1; i >= 0; i--) {
      var cmp = this.getComponentExt(components[i]);
      if (cmp) cmp.hide();
    }
  },

  showComponents: function (components) {
    for (var i = components.length - 1; i >= 0; i--) {
      var cmp = this.getComponentExt(components[i])
      if (cmp) cmp.setVisible(true);
    }
  },

  disableComponents: function (components) {
    for (var i = components.length - 1; i >= 0; i--) {
      var cmp = this.getComponentExt(components[i])
      if (cmp) cmp.setDisabled(true);
    }
  },

  enableComponents: function (components) {
    for (var i = components.length - 1; i >= 0; i--) {
      var cmp = this.getComponentExt(components[i])
      if (cmp) cmp.setDisabled(false);
    }
  },

  getComponentExt: function (itemId) {
    return Ext.ComponentQuery.query('#' + itemId)[0];
  },

  getScalar: function (storeId, recId, field) {
    var rec = Ext.getStore(storeId).getById(recId);
    if (rec) return rec.get(field);
    return '';
  },

  getById: function (data, id) {
    var result = {};
    data.map(function (d) {
      if (d.id == id) result = d;
    });
    return result;
  },

  getByAttr: function (data, attr, val) {
    var result = {};
    data.map(function (d) {
      if (d[attr] == val) result = d;
    });
    return result;
  },

  getIndexByAttr: function (data, attr, val) {
    return data.map(function (d) {
      return d[attr]
    }).indexOf(val);
  },

  inArrayId: function (data, id) {
    return data.map(function (d) {
      return d.id;
    }).indexOf(id) >= 0;
  },

  getDefaultValue: function (data) {
    var result = '';
    data.map(function (d) {
      if (d.isDefault) result = d.id;
    });
    return result;
  },

  transformPoints: function (points, from, to) {
    return points.map(function (point) {
      return ol.proj.transform(point, from, to);
    });
  },

  splitCommaToArray: function (n) {
    if (n && n.indexOf('|') >= 0) {
      n = n.split('|');
      if (n.length > 0) n = n.map(function (x) {
        return App.service.Helper.splitCommaToFloat(x);
      });
    }
    return n;
  },

  splitCommaToFloat: function (n) {
    if (n && n.indexOf(',') >= 0) {
      n = n.split(',');
      n = n.map(function (x) {
        return parseFloat(x);
      });
    }
    return n;    
  },

  getCropName: function(){
    var cropName = App.service.Helper.getById(__Crop, App.service.Watcher.get('Crop'))[__Global.lang + 'Name'];
    return cropName;
  },
  
  clearZoomCombos: function(){
    this.setComponentsValue([{ id: 'zoom-cb-country', value: null }]);
  },
  
  openDocument: function (filename, target){
    var link = document.createElement("a");    
    link.style = "visibility:hidden";
    link.href = filename;
    link.target = target;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  openGlossaryFrame: function(frame){
    //important: http://scriptasylum.com/tutorials/frameredirect/frameredirect.html
    /*insert in head section of index.html of Glossary on Server (here: glossary_wuemoca_vers2_test.htm):
    var fname="content";     //MAIN CONTENT AREA FRAME **NAME**
    window.onload=function(){
      var d=document.location.search;
      var h=document.location.hash; //anchor
      if(d!='')top.frames[fname].document.location.href=d.substring(d.lastIndexOf('?')+1,d.length) + h;
    }
    */
    var link = document.createElement("a");    
    link.style = "visibility:hidden";
    link.href = __Global.urls.GlossaryBase + frame;
    link.target = 'glossary';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);    
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
* the indicator values, stored in the chart store in JSON format, are written to HTML table with MS Excel content type
*/
  JSONToHTMLConvertor: function (year) { 
    var self = this;
    var userPolygon = App.service.Chart.userPolygon;
    var JSONData = App.service.Chart.data;
    if (JSONData.length > 0){

      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
      
      if (!userPolygon){ 
        var aggregation = App.service.Watcher.get('Aggregation');
        var aggregation_id = aggregation + '_id';
        var object_id = arrData[0][aggregation_id];
      }  
      else{
        var polygon = App.service.Polygon.getSelectedPolygons()[0];
      }  

      var indicator_fields = self.getExportFields(userPolygon);   

      //change order of arrData with selection of fields
      //http://jsfiddle.net/drndW/    
      var sortedData = JSON.parse(JSON.stringify( arrData, indicator_fields , 4));
 
      //Generate a file name
      var fileName = '';
      var polygonName = '';
      //var totalArea = 0;
      if (userPolygon){
        polygonName = polygon.info.name.replace(/ /g,'_'); 
        if (!!polygon.info.location && polygon.info.location != ''){
          polygonName += '_' + polygon.info.location.replace(/ /g,'_'); 
        }
        fileName += polygonName;
        //totalArea = polygon.totalArea;        
      }
      else{
        fileName += aggregation + '_' + object_id;
      }
      if (year != ''){
        fileName += '_' + year;
      }
      //this will remove the blank-spaces from the title and replace it with an underscore
      fileName = fileName.replace(/ |,/g,'_');   

      //http://jsfiddle.net/insin/cmewv/  https://gist.github.com/insin/1031969
      var uri  = 'data:application/vnd.ms-excel;base64,';
      template  = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
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
      '</head><body><table>{table}</table></body></html>';
 
      var ctx = { worksheet: fileName, table: self.indicator_table(sortedData, userPolygon, year, polygonName) };

      //this trick will generate a temp <a /> tag
      var link = document.createElement("a");    
      link.href = uri + self.base64(self.format(template, ctx));
      
      //set the visibility hidden so it will not effect on your web-layout
      link.style = "visibility:hidden";
      link.download = fileName + ".xls";
      
      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    }
  },

  indicator_table: function (data, userPolygon, year, polygonName) {
    var fieldCount = 0;
    var result = { head: '', body: '' };
   
    result.head += '<tr>';
    if (userPolygon){
      fieldCount++;
      result.head += '<th>polygon_name</th>';
    }
    //This loop will extract the label from 1st index of on array
    for (var index in data[0]) {
      fieldCount++;
      result.head += '<th>' + index + '</th>';
    }
    result.head += '</tr>';

    //1st loop is to extract each row
    for (var i = 0; i < data.length; i++) {
      if (year == '' || year.indexOf(data[i]['year']) != -1){
        result.body += '<tr>';
        if (userPolygon){
          result.body += '<td>' + polygonName + '</td>';   
        }
        //2nd loop will extract each column
        for (var index in data[i]) {
          if (isNaN(data[i][index]) || data[i][index] == null || index == 'year' || index.indexOf('_id') != -1){
            if (data[i][index] != null){
              result.body += '<td>' + data[i][index] + '</td>';
            }
            else{
              result.body += '<td></td>';
            }
          }
          else if (index == 'area_ha'){
            result.body += '<td style=\'mso-number-format:"#,##0"\'>' + data[i][index] + '</td>'; 
          }
          else{

            var format = '0';
            var mlu_name = '';
            __Indicator.map(function (indicator) {
              if (indicator.id == 'mlu'){
                mlu_name = indicator[__Global.lang + 'CropNames'][data[i][index] - 1];
              }
              if (index.indexOf(indicator.id) >= 0 && indicator.decimals != undefined){
                format = '#,##0';
                if (indicator.decimals > 0){
                  format += '.';
                  for (var count = 1; count <= indicator.decimals; count++){
                    format += '0';
                  }
                } 
              }
            }); 
            if (userPolygon){
              if (index.indexOf('wf') >= 0){
                format = '#,##0.00';
              }
            }           
            if (index != 'mlu'){      
              //workaround for problem with three decimals and German or Russian delimiter  
              result.body += '<td style=\'mso-number-format:"' + format + '"\'>' + parseFloat(data[i][index]).toFixed(4) + '</td>';      
            }   
            else{
              result.body += '<td>' + mlu_name + '</td>';
            } 
          }
        }
        result.body += '</tr>';
      }
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

    __Indicator.map(function (indicator) {

      if (indicator.chart != 'Multiannual' || (userPolygon && indicator.exportUserPolygon == true)){
        result.body += '<tr>';     
        result.body += '<td>' + indicator.field + '</td>'; 
        result.body += '<td></td>';       
        result.body += '<td>' + indicator[__Global.lang + 'Name'] + ' (' + indicator[__Global.lang + 'Unit'] + ')</td>';
        for (var i = 4; i <= fieldCount; i++){
          result.body += '<td></td>';        
        }   
        result.body += '</tr>';          
      }
    });
    if (userPolygon){
      __Indicator_userPolygon.map(function (indicator) {

          result.body += '<tr>';     
          result.body += '<td>' + indicator.field + '</td>'; 
          result.body += '<td></td>';       
          result.body += '<td>' + indicator[__Global.lang + 'Name'] + ' (' + indicator[__Global.lang + 'Unit'] + ')</td>';
          for (var i = 4; i <= fieldCount; i++){
            result.body += '<td></td>';        
          }   
          result.body += '</tr>';          
      });         
    }

    result.body += '<tr></tr>'; 
    result.body += '<tr>';     
    result.body += '<th>' + i18n.exp.cropAcronym + '</th>'; 
    result.body += '<th></th>';       
    result.body += '<th>' + i18n.exp.cropName + '</th>';   
    result.body += '</tr>';   

    __Crop.map(function (crop) {
      result.body += '<tr>';     
      result.body += '<td>' + crop.id + '</td>'; 
      result.body += '<td></td>';       
      result.body += '<td>' + crop[__Global.lang + 'Name'] + '</td>';   
      result.body += '</tr>';         
    }); 
 
    return '<thead>' + result.head + '</thead><tbody>' + result.body + '</tbody>';
  },  

  getExportFields: function (userPolygon) {
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
    indicator_fields.push('area_ha'); 
    indicator_fields.push('year');
    __Indicator.map(function (indicator) {
      if ((indicator.chart != 'Multiannual' || (userPolygon && indicator.exportUserPolygon == true))
        && ((indicator.aggregation == 'all' || indicator.aggregation.indexOf(aggregation) >= 0) || userPolygon)){
        var field = indicator.field;
        if (!!indicator.crops){
          if (indicator.crops == 'all'){
            __Crop.map(function(crop){
              var fieldcopy = field;
              indicator_fields.push(fieldcopy.replace('{crop}', crop.id));
            });
          }
          else if (typeof indicator.crops == 'object'){
            indicator.crops.map(function(crop){
              var fieldcopy = field;
              indicator_fields.push(fieldcopy.replace('{crop}', crop));
            });
          }
        }
        else{
          indicator_fields.push(field);
        }
      }        
    });
    if (userPolygon){
      indicator_fields.push('wf');
      for (var month = 3; month <= 10; month++) {
        indicator_fields.push('etf_m' + month);
        indicator_fields.push('vir_m' + month);
        indicator_fields.push('wf_m' + month);
        for (var decade = 1; decade <= 3; decade++){
            indicator_fields.push('etf_m' + month + '_' + decade);
            indicator_fields.push('vir_m' + month + '_' + decade);
            indicator_fields.push('wf_m' + month + '_' + decade);
        }
      }
    }
    return indicator_fields;
  }

});