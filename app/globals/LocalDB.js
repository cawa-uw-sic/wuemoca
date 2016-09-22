var __LocalDB = {

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

  set: function (attr, val) {
    if (typeof val == 'object') val = JSON.stringify(val);
    if (attr.indexOf('.') >= 0) {
      attr = attr.split('.');
      var result = this.get(attr[0], '{}');
      result[attr[1]] = val;
      return localStorage.setItem(attr[0], JSON.stringify(result));
    }
    return localStorage.setItem(attr, val);
  },

  parseValues: function (obj) {
    try {
      return JSON.parse(obj);
    } catch (e) {

    }
    return obj;
  }

};