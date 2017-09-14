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
  getAxes: function (min, max, steps, title) {
    return [{
      type: 'numeric',
      title: {
        text: title
      },
      position: 'gauge',
      //workaround for numeric axis label bug (multiply by 10)
      minimum: min * 10,
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
    }];
  },
  getSprites: function (text){
    return [{
      type: 'text',
      text: text,
      fontSize: 15,
      x: 40, // the sprite x position
      y: 170  // the sprite y position      
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
  getAxes: function (x, y, thousand, title, maximum, decimals, currentYear) {
  /* getAxes: function (x, y, measure, maximum, decimals, yield_classes) {
    var limits = [];
    if (typeof yield_classes == 'object'){
      //yield_classes.map(function(yield_class){
        limits.push({
          value: yield_classes[0],
          line: {
            strokeStyle: 'black',
            lineWidth: 2,
            lineDash: [6, 3],
            title: {
              text: 'low',
              fontSize: 15,
              fontWeight : 'bold',
              strokeStyle : 'white',
              lineWidth: 0.5
            }
          }
        });        
        limits.push({
          value: yield_classes[3],
          line: {
            strokeStyle: 'black',
            lineWidth: 2,
            lineDash: [6, 3],
            title: {
              text: 'medium',
              fontSize: 15,
              fontWeight : 'bold',
              strokeStyle : 'white',
              lineWidth: 0.5
            }
          }
        });
        limits.push({
          value: yield_classes[6],
          line: {
            strokeStyle: 'black',
            lineWidth: 2,
            lineDash: [6, 3],
            title: {
              text: 'high',
              fontSize: 15,
              fontWeight : 'bold',
              strokeStyle : 'white',
              lineWidth: 0.5
            }
          }
        });        
      //});
    }*/
    return [{
      type: 'numeric',
      position: 'left',
      fields: y,
      minimum: 0,
      maximum: maximum,
      title: {
        fontSize: 12,
        text: title
      },
      grid: true,
      //limits: limits,      
      renderer: function (axis, value) {
        var label = '';
        if (thousand){
          label = (parseFloat(value)/1000).toFixed(decimals);
        }
        else{
          label = parseFloat(value).toFixed(decimals);
        }
        return label;
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
      },
      renderer: function (axis, value, layoutContext, lastLabel) {
        if (value == currentYear){
          this._label.attr.canvasAttributes.fillStyle = 'red';
        }
        else{
          this._label.attr.canvasAttributes.fillStyle = 'black';
        }
        return value;
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
      } ,   
      tooltip: {
        trackMouse: true,
        renderer: function(storeItem, item) {
          var value = parseFloat(item.get(y));
          return this.getTooltip().update(
            value.toLocaleString(__Global.lang, {maximumFractionDigits: decimals}) + ' ' + measure
          );
        }
      }
     /*listeners:{
        itemmousemove: function (series, item, event) {
          return false;
          //event.stopPropagation();
          console.log('itemmousemove', item.category, item.field);
        }
      }*//*,
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

  getAxes: function (x, yFields, thousand, title, ind_type, limit, maximum, decimals, currentYear) {
    return [{
      type: 'numeric',
      position: 'left',
      fields: yFields,
      minimum: 0,
      maximum: maximum,
      title: {
        fontSize: 12,
        text: title
      },
      grid: true,
      limits: [{
        value: limit,
        line: {
          strokeStyle: 'black',
          lineWidth: 2,
          lineDash: [6, 3],
          title: {
            text: i18n.report.firnTH,
            fontSize: 15,
            fontWeight : 'bold',
            strokeStyle : 'white',
            lineWidth: 0.5
          }
        }
      }],
      renderer: function (axis, value) {
        var label = '';
        if (thousand){
          label = (parseFloat(value)/1000).toFixed(decimals);
        }
        else{
          label = parseFloat(value).toFixed(decimals);
        }
        return label;
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
      },
      renderer: function (axis, value, layoutContext, lastLabel) {
        if (value == currentYear){
          this._label.attr.canvasAttributes.fillStyle = 'red';
        }
        else{
          this._label.attr.canvasAttributes.fillStyle = 'black';
        }
        return value;
      }  
    }];
  },

  getSeries: function (names, x, yFields, measure, decimals) {
    var series = [];
    series.push({
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
            parseFloat(record.get(item.field)).toLocaleString(
            __Global.lang, {maximumFractionDigits: decimals}
          ) + ' ' + measure);
        }
      }
    });
    /*if (y != ''){
      series.push({ 
        type: 'line',
        title: name,
        xField: x,
        yField: y,
        showInLegend: false,
        style: {
          lineWidth: 2,
          lineDash: [8,2] 
        },
        marker: {
          type: 'circle',
          radius: 3,
          lineWidth: 1.5 
        },
        label:{
          field: y,
          display: 'under',
          fontWeight: 'bold',
          shadowColor: "white",
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          shadowBlur: 3,
          renderer: function(text, sprite, config, rendererData, index){
            return (index == parseInt(rendererData.store.data.length/2)) ? name + ': ' + text + ' ' + measure : '';
          }
        }        
      });     
    }*/

    return series;
  }
};
/**
* line chart
*/
__Chart.Line = {

  getAxes: function (x, y, thousand, maximum, decimals, currentYear) {
    var limits = [];
    if (y == 'vet' || y.indexOf('vc_') != -1){
      limits.push({
        value: 1,
        line: {
          strokeStyle: '#41b6c4', 
          lineWidth: 2,
          lineDash: [6, 3]
          /*title: {
            text: '',
            fontSize: 15,
            fontWeight : 'bold',
            strokeStyle : 'white',
            lineWidth: 0.5
          }*/
        }
      });    
    }  
    else if (y == 'vir'){
      limits.push({
        value: 1,
        line: {
          strokeStyle: '#7fcdbb', 
          lineWidth: 2,
          lineDash: [6, 3]
          /*title: {
            text: '',
            fontSize: 15,
            fontWeight : 'bold',
            strokeStyle : 'white',
            lineWidth: 0.5
          }*/
        }
      });       
      
    }  
    return [{
      type: 'numeric',
      position: 'left',
      fields: y,
      minimum: 0,
      maximum: maximum,
      title: false,
      grid: true,
      limits: limits,
      renderer: function (axis, value) {
        var label = '';
        if (thousand){
          label = (parseFloat(value)/1000).toFixed(decimals);
        }
        else{
          label = parseFloat(value).toFixed(decimals);
        }
        return label;
      }
    }, {
      type: 'category',
      position: 'bottom',
      fields: [ x ],
      title: '',
      grid: true,
      label: {
        font: {
          fontSize: '9px'              
        }
      },
      style: {
        textPadding: -10
      },
      renderer: function (axis, value, layoutContext, lastLabel) {
        if (value == currentYear){
          this._label.attr.canvasAttributes.fillStyle = 'red';
        }
        else{
          this._label.attr.canvasAttributes.fillStyle = 'black';
        }
        return value;
      }  
    }];
  },

  getSeries: function (x, y, measure, color, decimals, display) {
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
        display: display,
        font: '12px Helvetica',
        renderer: function(text, sprite, config, rendererData, index){
          if (y == 'firn'){
            return (index == parseInt(rendererData.store.data.length/2)) ? 
            parseFloat(text).toLocaleString(__Global.lang, {maximumFractionDigits: decimals}) + 
            ' ' + measure : '';
          }
          else{
            return parseFloat(text).toFixed(decimals) + ' ' + measure;
          }
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