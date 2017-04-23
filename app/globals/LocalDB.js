/**
* @class __LocalDB
* local DB stores user settings in the localStorage of the browser
*/
__LocalDB = {
/**
* @method get
* get the stored value
* @param attr
* attribute is the name of the stored value
* @param fallback
* default value in case no value is stored in the localStorage
*/
  get: function (attr, fallback) {
    if (attr.indexOf('.') >= 0) {
      attr = attr.split('.');
      var item = localStorage.getItem(attr[0]);
      if (!item) return fallback;
      var result = JSON.parse(item);
      return this.parseValues(result[attr[1]]) || fallback;
    }

    return this.parseValues(localStorage.getItem(attr)) || fallback;
  },
/**
* @method set
* set the value in the localStorage
* @param attr
* with which name the value is to be stored
* @param val
* value to be stored in the localStorage
*/
  set: function (attr, val) {
    if (attr.indexOf('undefined') < 0){
      if (typeof val == 'object') val = JSON.stringify(val);
      if (attr.indexOf('.') >= 0) {
        attr = attr.split('.');
        var result = this.get(attr[0], {});
        result[attr[1]] = val;
        return localStorage.setItem(attr[0], JSON.stringify(result));
      }
      return localStorage.setItem(attr, val);
    }
  },
/**
* @method parseValues
* parse the values in JSON format
* @param obj
* values to be parsed
*/
  parseValues: function (obj) {
    try {
      return JSON.parse(obj);
    } catch (e) {

    }
    return obj;
  },
/**
* @method updateLocalDB
* clean the localStorage from unused items and abbreviations
*/
  updateLocalDB: function(){
      //update localStorage
      for (var i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        if (key.indexOf('Polygons')   < 0 
         && key.indexOf('Selections') < 0 
         && key.indexOf('AreaFilter') < 0 
         && key.indexOf('locale')     < 0){
          localStorage.removeItem(key);
          i -= 1;
        }
      }
      var selections = localStorage.getItem('Selections');
      if (selections){
        var change = false;
        if (selections.indexOf('firn') >= 0){
          selections = selections.replace('firn','fir_n');
          change = true;
        } 
        if (selections.indexOf('uiri') >= 0){
          selections = selections.replace('uiri','uir');
          change = true;
        } 
        if (selections.indexOf('yield') >= 0){
          selections = selections.replace('yield','y');
          change = true;
        }
        if (selections.indexOf('fallow') >= 0){
          selections = selections.replace('fallow','fp');
          change = true;
        }
        if (selections.indexOf('majority') >= 0){
          selections = selections.replace('majority','mlu');
          change = true;
        } 
        if (selections.indexOf('rotation') >= 0){
          selections = selections.replace('rotation','cr');
          change = true;
        } 
        if (selections.indexOf('diversity') >= 0){
          selections = selections.replace('diversity','cd');
          change = true;
        } 
        if (selections.indexOf('frequency') >= 0){
          selections = selections.replace('frequency','flf');
          change = true;
        } 
        if (change){
          localStorage.setItem('Selections', selections);
        }
      }

      var polygons = localStorage.getItem('Polygons');
      if (polygons){
        var change = false;
        if (polygons.indexOf('firn') >= 0){
          polygons = polygons.replace(/firn/g,'fir_n');
          change = true;
        } 
        if (polygons.indexOf('uiri') >= 0){
          polygons = polygons.replace(/uiri/g,'uir');
          change = true;        
        } 
        if (polygons.indexOf('yield') >= 0){
          polygons = polygons.replace(/yield/g,'y');
          change = true;        
        }
        if (polygons.indexOf('fallow') >= 0){
          polygons = polygons.replace(/fallow/g,'fp');
          change = true;  
        }
        if (polygons.indexOf('majority') >= 0){
          polygons = polygons.replace(/majority/g,'mlu');
          change = true;  
        } 
        if (polygons.indexOf('rotation') >= 0){
          polygons = polygons.replace(/rotation/g,'cr');
          change = true;  
        } 
        if (polygons.indexOf('diversity') >= 0){
          polygons = polygons.replace(/diversity/g,'cd');
          change = true;  
        } 
        if (polygons.indexOf('frequency') >= 0){
          polygons = polygons.replace(/frequency/g,'flf');
          change = true;  
        } 
        if (change){
          localStorage.setItem('Polygons', polygons);  
        }   
      }
  }

};