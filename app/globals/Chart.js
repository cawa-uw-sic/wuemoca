var __Chart = {};

/**
* gauge chart
*/
__Chart.Gauge = {
  /**
  * @method getAxes
  * create numeric gauge axis
  * @param {Number} max
  * maximum chart value multiplied by 10 (workaround for numeric axis label bug)
  * @param {Number} steps
  * majorTickSteps  
  * @return {Ext.chart.axis.Numeric}
  */
  getAxes: function (max, steps) {
    return [{
      type: 'numeric',
      position: 'gauge',
      minimum: 0,
      //workaround for numeric axis label bug (multiply by 10)
      maximum: max * 10,
      majorTickSteps: steps,
      /**
      * @method getAxesRenderer
      * return label devided by 10 (workaround for numeric axis label bug)
      * @param axis
      * @param {Number} label
      * @param layoutContext
      * @return {Number}
      */      
      renderer: function (axis, label, layoutContext) {
        label = label.toFixed();
        //workaround for numeric axis label bug (divide by 10)
        return label / 10;
      }
    }];
  },
  /**
  * @method getSeries
  * create gauge series with donut and needle
  * @param {String} field
  * angleField, field with value
  * @return {Ext.chart.series.Gauge}
  */
  getSeries: function (field) {
    return [{
      type: 'gauge',
      angleField: field,
      donut: 60,
      needle: true
      //colors: colors
    }];
  },
  /**
  * @method getGradient
  * return color gradient 0-50-100
  * @param {String} color1
  * 0 color
  * @param {String} color2
  * 50 color
  * @param {String} color3
  * 100 color
  * @param {String} ind_id
  * indicator id
  * @return {Object[]}
  */
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
};


/*__Chart.HBar = {

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
};*/

/**
* vertical bar chart
*/
__Chart.VBar = {
  /**
  * @method getAxes
  * create numeric and category axes
  * @param {Number} x
  * field for x-axis
  * @param {Number} y
  * field for y-axis
  * @param {String} measure
  * unit for y-axis
  * @param {Number} maximum
  * maximum of y-axis
  * @param {Number} decimals
  * number of decimals  for y-axis 
  * @return {Ext.chart.axis.Numeric | Ext.chart.axis.Category}
  */
  getAxes: function (x, y, measure, maximum, decimals) {
    return [{
      type: 'numeric',
      position: 'left',
      fields: y,
      minimum: 0,
      maximum: maximum,
      title: false,
      grid: true,
      renderer: function (axis, value) {
        return parseFloat(value).toFixed(decimals) + ' ' + measure;
      }
    }, {
      type: 'category',
      position: 'bottom',
      fields: [ x ],
      title: '',
      label: {
        font: {
          fontSize: '9px'              
        }
      },
      style: {
          textPadding: -10
      }
    }];
  },
  /**
  * @method getSeries
  * create bar series
  * @param {Number} x
  * field for x-axis
  * @param {Number} y
  * field for y-axis
  * @param {String} measure
  * unit for tooltip
  * @param {String} color
  * color code for bar filling
  * @param {Number} decimals
  * number of decimals for tooltip
  * @return {Ext.chart.series.Bar}
  */
  getSeries: function (x, y, measure, color, decimals) {
    return [{
      type: 'bar',
      axis: 'left',
      xField: x,
      yField: [ y ],
      style: {
         fill: color
      },      
      tooltip: {
        trackMouse: true,
        renderer: function(storeItem, item) {
          return this.getTooltip().update(
            parseFloat(item.get(y)).toFixed(decimals) + ' ' + measure
          );
        }
      }/*,
      renderer: function(sprite, attr, record, index, store) {
        return Ext.apply(attr, {
          fill: color
        });
      }*/
    }];
  }
};
/**
* stacked bar chart
*/
__Chart.StackedVBar = {

  getAxes: function (x, yFields, measure) {
    return [{
      type: 'numeric',
      position: 'left',
      fields: yFields,
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
      title: '',
      label: {
        font: {
          fontSize: '9px'               
        }
      },
      style: {
          textPadding: -10
      }   
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
      }
    }];
  }
};
/**
* line chart
*/
__Chart.Line = {

  getAxes: function (x, y, measure, maximum, decimals) {
    return [{
      type: 'numeric',
      position: 'left',
      fields: y,
      minimum: 0,
      maximum: maximum,
      title: false,
      grid: true,
      renderer: function (axis, value) {
        return parseFloat(value).toFixed(decimals) + ' ' + measure;
      }
    }, {
      type: 'category',
      position: 'bottom',
      fields: [ x ],
      title: '',
      label: {
        font: {
          fontSize: '9px'              
        }
      },
      style: {
        textPadding: -10
      }
    }];
  },

  getSeries: function (x, y, measure, color, decimals) {
    return [{
      type: 'line',
      axis: 'left',
      xField: x,
      yField: [ y ],
      style: {
         stroke: color,
         lineWidth: 2
      },
      marker: {
         type: 'circle',
         radius: 4,
         lineWidth: 2,
         fill: 'white'
      }, 
      label: {
        field: y,
        display: 'over',
        font: '12px Helvetica',
        renderer: function (text, sprite, config, rendererData, index) {
          return parseFloat(text).toFixed(decimals) + ' ' + measure;
        }
      }/*,     
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
      }*/
    }];
  }
};