Ext.define('App.service.Polygon', {

  requires: [
    'App.util.Window'
  ],

  singleton: true,
  all: __LocalDB.get('Polygons', []),

  source: false,
  layer: false,

  drawControl: false,
  modifyControl: false,
  selectControl: false,

  activated: false,

  selected: false,
  isBusy: false,

  windowEdit: Ext.create('App.util.Window', { title: i18n.exportUI.title, items: [{ xtype: 'app-polygon-form' }] }),

  initialize: function () {

    var self = this;

    self.source = new ol.source.Vector();
    self.layer = new ol.layer.Vector({
      source: self.source,
      style: self.getDefaultColor
    });

    self.layer.setMap(App.service.Map.instance);

    self.drawControl = new ol.interaction.Draw({ type: ('Polygon') });

    self.selectControl = new ol.interaction.Select({
      layers: [self.layer],
      style: self.getSelectColor
    });

    App.service.Map.instance.addInteraction(self.drawControl);
    App.service.Map.instance.addInteraction(self.selectControl);
    this.deactivate();

    self.selectControl.on('select', function (e) {
      self.whenUnselect(e);
      if (e.selected.length < 1) return false;
      self.whenSelect(e);
    });


    self.drawControl.on('drawend', function (e) {
      self.registerPolygon(e.feature.getGeometry());
      self.rerenderFeatures();
      self.deactivate();
      App.service.Helper.hideComponents(['polygon-btn-deactivate']);
      App.service.Helper.showComponents(['polygon-btn-activate']);      
    });

    self.rerenderFeatures();
  },

  activate: function () {
    this.drawControl.setActive(true);
    this.selectControl.setActive(false);
    this.activated = true;
  },

  deactivate: function () {
    this.drawControl.setActive(false);
    this.selectControl.setActive(true);
    this.activated = false;
  },

  getDefaultColor: function (feature) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: '#41b6c4'
      }),
      stroke: new ol.style.Stroke({
        color: '#2b8cbe'
      }),
      text: new ol.style.Text({
        text: feature.getProperties().name
      })
    });
  },

  getSelectColor: function (feature) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: '#fff'
      }),
      stroke: new ol.style.Stroke({
        color: '#4d004b'
      }),
      text: new ol.style.Text({
        text: feature.getProperties().name
      })
    });
  },

  updateWindowEdit: function () {
    var polygon = this.all[this.getSelectedIndex()];
    App.service.Helper.setComponentsValue([
       { id: 'exportui-name',       value: polygon.info.name     || '' }
      ,{ id: 'exportui-location',   value: polygon.info.location || '' }
      ,{ id: 'exportui-area',   value: polygon.totalArea + ' ha' || '' }    
    ]);
  },

  whenUnselect: function (e) {
    App.service.Helper.disableComponents(['polygon-btn-edit', 'polygon-btn-calculate', 'polygon-btn-remove', 'polygon-btn-show', 'polygon-btn-excel']);
    //if (!this.windowEdit.isHidden()) this.windowEdit.close();
  },

  whenSelect: function (e) {
    App.service.Helper.enableComponents(['polygon-btn-edit', 'polygon-btn-calculate', 'polygon-btn-remove', 'polygon-btn-show', 'polygon-btn-excel']);
    this.selected = e.selected[0];
    if (!this.windowEdit.isHidden()) this.updateWindowEdit();
  },

  registerPolygon: function (geometry) {
    var polygon = {
      uid: 'polygon-' + new Date().getTime(),
      info: { name: '', location: '' },
      totalArea: this.calculateTotalArea(geometry),
      data: [],
      geometry: geometry.getCoordinates()[0]
    };

    this.all.push(polygon);
    this.saveAll();
    return polygon;
  },

  createFeature: function (polygon) {
    var feature = new ol.Feature(new ol.geom.Polygon([polygon.geometry]));
    feature.set('uid',  polygon.uid);
    feature.set('data', polygon.data);
    feature.set('name', polygon.info.name);
    return feature;
  },

  removeSelectedPolygon: function () {
    this.all.splice(this.getSelectedIndex(), 1);
    this.saveAll();
    this.source.removeFeature(this.selected);
    this.selectControl.getFeatures().clear();
    this.whenUnselect();
    this.selected = false;
  },

  save: function (info) {

    this.all[this.getSelectedIndex()].info = info;
    this.rerenderFeatures();
    this.saveAll();
  },

  saveAll: function () {
    __LocalDB.set('Polygons', this.all);
  },

  rerenderFeatures: function () {
    var self = this;
    var source = self.layer.getSource();
    source.clear();
    self.all.map(function (polygon) {
      source.addFeature(self.createFeature(polygon));
    });
  },

  getSelectedIndex: function () {
    return this.all.map(function (d) {
      return d.uid;
    }).indexOf(this.selected.get('uid'));
  },

  calculate: function () {
    var polygon = this.all[this.getSelectedIndex()];
    if (polygon.data.length == 0){
      var transformedGeometry = this.prepareRequestGeometry(polygon.geometry);
      this.doRequest(transformedGeometry);
    }
    else{
      alert('Values already calculated - press Show Values!');
    }
  },

  doRequest: function (geometry) {
    var self = this;
    self.isBusy = true;
    Ext.getBody().setStyle('cursor','progress');

    Ext.data.JsonP.request({
      url : __Global.api.Polygon + 'geometry=' + geometry,
      callbackName: 'PolygonResponse',
      params: {format_options: 'callback:Ext.data.JsonP.PolygonResponse'},
      success: function (results) {
        self.isBusy = false;
         Ext.getBody().setStyle('cursor','auto');
       
       /* //temporary html table to show results
        var table = '<table border="1"><tbody><tr>';
        for (var i = 0; i < Object.keys(results[0]).length; i++) {
          th = "<th>" + Object.keys(results[0])[i] + "</th>";
          table += th;
        }
        table += '</tr>';
        for (var r = 0; r < results.length; r++) {
          table += '<tr>';
          for (var i = 0; i < Object.values(results[r]).length; i++) {
              td = "<td>" + Object.values(results[r])[i].toString() + "</td>"; 
              table += td;              
          }
          table += '</tr>';          
        }
        table += '</tbody></table>'; 
        try{
          window.open("", "Calculation", "width=300,height=300").document.write(table);
        }
        catch(err) {
          alert('Deactivate Popup Blocker and calculate again.');
        }*/
  
        self.all[self.getSelectedIndex()].data = results;
        self.saveAll();
      }
    });
  },
  
  /*showValues: function(){
    var calcValues = this.all[this.getSelectedIndex()].data;
    if (calcValues.length > 0){
       //temporary html table to show values
      var table = '<table border="1"><tbody><tr>';
      for (var i = 0; i < Object.keys(calcValues[0]).length; i++) {
        th = "<th>" + Object.keys(calcValues[0])[i] + "</th>";
        table += th;
      }
      table += '</tr>';
      for (var r = 0; r < calcValues.length; r++) {
        table += '<tr>';
        for (var i = 0; i < Object.values(calcValues[r]).length; i++) {
            td = "<td>" + Object.values(calcValues[r])[i].toString() + "</td>"; 
            table += td;              
        }
        table += '</tr>';          
      }
      table += '</tbody></table>'; 
      window.open("", "Calculation", "width=300,height=300").document.write(table);
    }  
    else{
      alert('First press Calculate Values!');
    }
  },*/

  calculateTotalArea: function (polygon){
    var wgs84Sphere = new ol.Sphere(6378137);
    var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
    __Global.projection.Mercator, __Global.projection.Geographic));
    var coordinates = geom.getLinearRing(0).getCoordinates();
    var area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
    return (area/10000).toFixed();
  },

  prepareRequestGeometry: function (geometry) {
    var result = [];
    App.service.Helper.transformPoints(
      geometry,
      __Global.projection.Mercator,
      __Global.projection.Geographic
    ).map(function (g) {
      result.push(g.join(' '));
    });
    return result.join(',');
  },

  interpolateColor: function(color1, color2, color3, minimum, median, maximum, value){
    var red1 = (color1 & 0xff0000) >> 16;
    var green1 = (color1 & 0x00ff00) >> 8;
    var blue1 = (color1 & 0x0000ff) >> 0;

    var red2 = (color2 & 0xff0000) >> 16;
    var green2 = (color2 & 0x00ff00) >> 8;
    var blue2 = (color2 & 0x0000ff) >> 0;

    var red3 = (color3 & 0xff0000) >> 16;
    var green3 = (color3 & 0x00ff00) >> 8;
    var blue3 = (color3 & 0x0000ff) >> 0;

    if (value < median){
      redResult = this.interpolate(red1, red2, value, minimum, median);
      greenResult = this.interpolate(green1, green2, value, minimum, median);
      blueResult = this.interpolate(blue1, blue2, value, minimum, median);
    }
    else if (value == median){
      redResult = red2;
      greenResult = green2;
      blueResult = blue2;
    }
    else if (value > median){
      redResult = this.interpolate(red2, red3, value, median, maximum);
      greenResult = this.interpolate(green2, green3, value, median, maximum);
      blueResult = this.interpolate(blue2, blue3, value, median, maximum);
    }
    //RGB to Hex: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    return ((1 << 24) + (redResult << 16) + (greenResult << 8) + blueResult).toString(16).slice(1,7);
  },

  interpolate: function(color_a, color_b, idx, min, max){
    if (color_a < color_b) {
      return ((color_b - color_a) * (idx / (max-min))) + color_a;
    } 
    else {
      return ((color_a - color_b) * (1 - (idx / (max-min)))) + color_b;
    }
  },

  JSONToCSVConvertor: function () {
    //http://jsfiddle.net/JXrwM/5298/
    var polygon = this.all[this.getSelectedIndex()];
    var JSONData = polygon.data;
    if (JSONData.length > 0){
      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
      
      var CSV = '';    

          var row = "";
          
          //This loop will extract the label from 1st index of on array
          for (var index in arrData[0]) {
              
              //Now convert each value to string and semicolon comma-seprated
              row += index + ';';
          }

          row = row.slice(0, -1);
          
          //append Label row with line break
          CSV += row + '\r\n';
      
      //1st loop is to extract each row
      for (var i = 0; i < arrData.length; i++) {
          var row = "";
          
          //2nd loop will extract each column and convert it in string comma-seprated
          for (var index in arrData[i]) {
              row += '"' + arrData[i][index] + '";';
          }

          row.slice(0, row.length - 1);
          
          //add a line break after each row
          CSV += row + '\r\n';
      }

      if (CSV == '') {        
          alert("Invalid data");
          return;
      }   
      CSV = CSV.replace(/\./g, ",");
      //Generate a file name

      var fileName = 'WUEMoCA_indicators_' + polygon.info.name + '_' + polygon.info.location;
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
      alert('First press Calculate Values!');
    }
}

});