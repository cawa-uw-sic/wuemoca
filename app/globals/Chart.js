var __Chart = {};


__Chart.Gauge = {

  getAxes: function (max, steps) {
    return [{
      type: 'numeric',
      position: 'gauge',
      minimum: 0,
      //workaround for numeric axis label bug (multiply by 10)
      maximum: max * 10,
      majorTickSteps: steps,
      renderer: function (axis, label, layoutContext) {
        label = label.toFixed();
        //workaround for numeric axis label bug (divide by 10)
        return label / 10;
      }
    }];
  },

  getSeries: function (field) {
    return [{
      type: 'gauge',
      angleField: field,
      donut: 60,
      needle: true
      //colors: colors
    }];
  },

  getGradient: function (color1, color2, color3, ind_id){
    return [{
        id: 'gradient-' + ind_id,
        stops: {
            0: {
                color: color1
            },
            50: {
                color: color2
            },                         
            100: {
                color: color3
            }
        }
    }];
  }
}


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

  getAxes: function (x, y, measure, maximum) {
    return [{
      type: 'numeric',
      position: 'left',
      fields: y,
      minimum: 0,
      maximum: maximum,
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
      //visibleRange: [0.5,1]
    }];
  },

  getSeries: function (x, y, measure, color, decimals) {
    return [{
      type: 'bar',
      axis: 'left',
      xField: x,
      yField: [ y ],
      tooltip: {
        trackMouse: true,
        renderer: function(storeItem, item) {
          return this.getTooltip().update(
            parseFloat(item.get(y)).toFixed(decimals) + ' ' + measure
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

__Chart.StackedVBar = {

  getAxes: function (x, yFields, measure) {
    return [{
      type: 'numeric',
      position: 'left',
      fields: yFields,
      minimum: 0,
      //maximum: maximum,
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
      //visibleRange: [0.5,1]
    }];
  },

  getSeries: function (names, x, yFields, measure, decimals) {
    return [{
      type: 'bar',
      axis: 'left',
      title: names,
      xField: x,
      yField: yFields,
      stacked: true,
      tooltip: {
        trackMouse: true,
        renderer: function (tooltip, record, item) {
            var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                crop = item.series.getTitle()[fieldIndex];

            tooltip.setHtml(crop + ': ' +
                parseFloat(record.get(item.field)).toFixed(decimals) + ' ' + measure);
        }

        /*function(storeItem, item) {
          return this.getTooltip().update(
            parseFloat(item.get(y)).toFixed(1) + ' ' + measure
          );
        }*/
      }
     /* renderer: function(sprite, attr, record, index, store) {
        return Ext.apply(attr, {
          fill: color
        });
      }*/
    }];
  }

};