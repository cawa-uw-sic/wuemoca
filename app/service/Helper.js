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

  getCropName: function(){
    var indicator = App.service.Watcher.getIndicator();
    var cropName = '';
    if (!!indicator.crops){
      var idx = indicator.crops.indexOf(App.service.Watcher.get('Crop'));
      cropName = indicator[__Global.Lang + 'Legend'][idx];
    }
    return cropName;
  },

  openGlossaryFrame: function(frame){
    //important: http://scriptasylum.com/tutorials/frameredirect/frameredirect.html
    /*insert in head section of index.html of Glossary on Server (here: glossary_wuemoca_vers2.htm):
      <script language="javascript">
      var fname="content";     //MAIN CONTENT AREA FRAME **NAME**

      window.onload=function(){
      var d=document.location.search;
      if(d!='')top.frames[fname].document.location.href=d.substring(d.lastIndexOf('?')+1,d.length);
      }
      </script>
    */
    var link = document.createElement("a");    
    link.style = "visibility:hidden";
    link.href = __Global.urls.GlossaryBase + frame;
    link.target = 'glossary';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);    
  },

  JSONToCSVConvertor: function () {
    //http://jsfiddle.net/JXrwM/5298/
    var userPolygon = App.service.Chart.userPolygon;
    var JSONData = App.service.Chart.data;
    if (JSONData.length > 0){
      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
      
      var CSV = '';    
      var row = '';

      if (!userPolygon){ 
        var aggregation = App.service.Watcher.get('Aggregation');
        var aggregation_id = aggregation + '_id';
        var object_id = arrData[0][aggregation_id];
      }  
      else{
        var polygon = App.service.Polygon.all[App.service.Polygon.getSelectedIndex()];
        row += 'area_ha;';
      }  

      var indicator_fields = this.getExportFields(userPolygon);   

      //change order of arrData with selection of fields
      //http://jsfiddle.net/drndW/    
      var sortedData = JSON.parse(JSON.stringify( arrData, indicator_fields , 4));
 
      //This loop will extract the label from 1st index of on array
      for (var index in sortedData[0]) {
        //Now convert each value to string and semicolon-separated
        row += index + ';';
      }

      row = row.slice(0, -1);
      
      //append Label row with line break
      CSV += row + '\r\n';
    
      //1st loop is to extract each row
      for (var i = 0; i < sortedData.length; i++) {
        var row = "";
        if (userPolygon){
          row += '"' + polygon.totalArea + '";';
        }
        //2nd loop will extract each column and convert it in string semicolon-separated
        for (var index in sortedData[i]) {
          row += '"' + sortedData[i][index] + '";';

        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
      }

      if (CSV == '') {        
        alert("Invalid data");
        return;
      }  
      //replace decimal points with commas (for German and Russian Excel programs) 
      CSV = CSV.replace(/\./g, ",");

      //add column name explanation
      var crops = [];
      var cropNames = [];  
      CSV += '\nIndicator acronym;;Indicator name\r\n';
      __Indicator.map(function (indicator) {
        if (indicator.id == 'uiri'){
          crops = indicator.crops;
          cropNames = indicator[__Global.Lang + 'Legend'];
        }        
        if (indicator.chart != 'Multiannual'){
          CSV += indicator.field + ';;' + indicator[__Global.Lang + 'Name'] + ' (' + indicator[__Global.Lang + 'Unit'] + ')\r\n';
        }
      });

      CSV += '\nCrop acronym;;Crop name\r\n';
      crops.map(function (crop, idx) {
        CSV += crop + ';;' + cropNames[idx] + '\r\n';
      });      

      //Generate a file name
      var fileName = 'WUEMoCA_indicators_';
      if (userPolygon){
        fileName += polygon.info.name + '_' + polygon.info.location;
      }
      else{
        fileName += object_id + '_' + aggregation;
      }
      //this will remove the blank-spaces from the title and replace it with an underscore
      fileName = fileName.replace(/ /g,"_");   
      
      //Initialize file format you want csv or xls
      var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
      
      // Now the little tricky part.
      // you can use either>> window.open(uri);
      // but this will not work in some browsers
      // or you will not get the correct file extension    
      
      //this trick will generate a temp <a /> tag
      var link = document.createElement("a");    
      link.href = uri;
      
      //set the visibility hidden so it will not effect on your web-layout
      link.style = "visibility:hidden";
      link.download = fileName + ".csv";
      
      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    else{
      alert('First press ' + i18n.polygon.calculate + '!');
    }
  },

  getExportFields: function (userPolygon) {
    var indicator_fields = [];
    if (!userPolygon){ 
      var aggregation = App.service.Watcher.get('Aggregation');
      var aggregation_id = aggregation + '_id';
      indicator_fields.push(aggregation_id);
      indicator_fields.push(aggregation + '_' + __Global.Lang);
      indicator_fields.push('area_ha');
    }  
  
    indicator_fields.push('year');
    __Indicator.map(function (indicator) {
      if (indicator.chart != 'Multiannual'){
        var field = indicator.field;
        if (!!indicator.crops){
          indicator.crops.map(function(crop){
            var fieldcopy = field;
            indicator_fields.push(fieldcopy.replace('{crop}', crop));
          });
        }
        else{
          indicator_fields.push(field);
        }
      }        
    });
    return indicator_fields;
  }

});