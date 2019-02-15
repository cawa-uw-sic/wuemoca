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
    var cropName = App.service.Watcher.getCrop()[__Global.lang + 'Name'];
    return cropName;
  },

  clearZoomCombos: function(){
    this.setComponentsValue([{ id: 'zoom-cb-country', value: null }]);
  },

  openDocument: function (href, target, download){
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.href = href;
    if (download != null){
      link.download = download;
    }
    if (target != null){
      link.target = target;
    }
    //this part will append the anchor tag and remove it after automatic click
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

  getIndicators_Crops: function(userPolygon){
    var indicator_fields = [];
    var aggregation = '';
    if (!userPolygon){
      aggregation = App.service.Watcher.get('Aggregation');
    }
    var count = 0;
    __Indicator.map(function (indicator) {
      var crop_spec = (!!indicator.crops_userDB && userPolygon) ? indicator.crops_userDB : indicator.crops;
      if (
        ((userPolygon && indicator.userDB) || (!userPolygon && indicator.serverDB))
        && indicator.chart != 'Multiannual'
        && (userPolygon || indicator.aggregation == 'all' || indicator.aggregation.indexOf(aggregation) >= 0)
        ) {
        if (!!crop_spec){
          if (typeof crop_spec == 'object'){
            crop_spec.map(function(crop){
              count++;
              crop_name = !isNaN(crop) ? App.service.Helper.getByAttr(__Crop, 'idx', parseInt(crop)).id : crop;
              indicator_fields.push({id: count, ind: indicator.id, crop: crop_name});
            });
          }
          else{
            __Crop.map(function(crop){
              //crop_spec can be 'all', 'sum' or 'avg'
              if (crop.idx == 0 && crop.id != crop_spec) return false;
              count++;
              indicator_fields.push({id: count, ind: indicator.id, crop: crop.id});
            });
          }
        }
        else{
          count++;
          indicator_fields.push({id: count, ind: indicator.id, crop: ''});
        }
      }
    });
    return indicator_fields;
  },

  toggleInfo: function(info){
    var infotext = document.getElementById(info + 'Text');
    var img_anchor = document.getElementById(info);
    var expanded = (infotext.style.maxHeight == infotext.scrollHeight + "px");
    infotext.style.maxHeight = (expanded) ? '15px' : infotext.scrollHeight + "px";
    img_anchor.innerHTML = (expanded) ?
      '<img src="' + Ext.getResourcePath('images/elbow-collapsed.gif', null, '') + '">' :
      '<img src="' + Ext.getResourcePath('images/elbow-expanded.gif', null, '') + '">';
  },

  arrayMax: function (array) {
    return array.reduce(function(a, b) {
      return Math.max(a, b);
    });
  },

  arrayMin: function (array) {
    return array.reduce(function(a, b) {
      return Math.min(a, b);
    });
  }

});