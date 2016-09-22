var __Chart = {};


__Chart.Gauge = {

  getAxes: function (max, steps) {
    return [{
      type: 'numeric',
      position: 'gauge',
      minimum: 0,
      maximum: max,
      majorTickSteps: steps,
      renderer: function (axis, label, layoutContext) {
        label = label.toFixed();
        if (max < 100) return label;
        return label / 100;
      }
    }];
  },

  getSeries: function (field, colors) {
    return [{
      type: 'gauge',
      angleField: field,
      donut: 80,
      needle: true,
      colors: colors
    }];
  }

};


__Chart.HBar = {

  getAxes: function (x, y) {
    return [{
      type: 'numeric',
      position: 'bottom',
      fields: [y],
      grid: true,
      minimum: 0
    }, {
      type: 'category',
      position: 'left',
      fields: [x]
    }];
  },

  getSeries: function (x, y, measure, colors) {
    return [{
      type: 'bar',
      axis: 'bottom',
      colors: colors,
      label: {
        display: 'insideEnd',
        field: y,
        orientation: 'horizontal',
        contrast: true,
        'text-anchor': 'start',
        font: "bold 15px Helvetica, sans-serif",
        renderer: function(v){
          return v.toFixed(0) + ' ' + measure;
        }
      },
      xField: x,
      yField: y,
      renderer: function(sprite, record, attr, index, store) {
        var colors = ['#e86d68', '#f5834b'];
        return Ext.apply(attr, {
            fill: colors[index]
        });
      }
    }];
  }

};

__Chart.VBar = {

  getAxes: function (x, y, measure) {
    return [{
      type: 'numeric',
      position: 'left',
      fields: y,
      minimum: 0,
      title: false,
      grid: true,
      renderer: function (axis, value) {
        return parseFloat(value).toFixed(0) + ' ' + measure;
      }
    }, {
      type: 'category',
      position: 'bottom',
      fields: [ x ],
      title: ''
    }];
  },

  getSeries: function (x, y, measure, color) {
    return [{
      type: 'bar',
      axis: 'left',
      xField: x,
      yField: [ y ],
      tooltip: {
        trackMouse: true,
        renderer: function(storeItem, item) {
          return this.getTooltip().update(
            parseFloat(item.get(y)).toFixed(1) + ' ' + measure
          );
        }
      },
      renderer: function(sprite, attr, record, index, store) {
        return Ext.apply(attr, {
          fill: color
        });
      }
    }];
  }

};