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
  getAxes: function (x, y, bigdata, title, maximum, decimals, currentYear) {
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
      renderer: function (axis, value) {
        var label = '';
        if (bigdata == 'thousand'){
          label = (parseFloat(value)/1000).toFixed(decimals);
        }
        else if (bigdata == 'million'){
          label = (parseFloat(value)/1000000).toFixed(decimals);
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
    }];
  }
};
/**
* stacked bar chart
*/
__Chart.StackedVBar = {

  getAxes: function (x, yFields, bigdata, title, limit, maximum, decimals, currentYear) {
    var limits = [];
    if (limit > 0){
      limits.push({
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
      });
    }
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
      limits: limits,
      renderer: function (axis, value) {
        var label = '';
        if (bigdata == 'thousand'){
          label = (parseFloat(value)/1000).toFixed(decimals);
        }
        else if (bigdata == 'million'){
          label = (parseFloat(value)/1000000).toFixed(decimals);
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
    return series;
  }
};
/**
* line chart
*/
__Chart.Line = {

  getAxes: function (x, y, bigdata, title, maximum, decimals, currentYear) {
    var limits = [];
    if (y == 'vet' || y.indexOf('vc_') != -1){
      limits.push({
        value: 1,
        line: {
          strokeStyle: '#41b6c4', 
          lineWidth: 2,
          lineDash: [6, 3]
        }
      });    
    }
    
    if (y == 'vir'){
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
      grid: true,
      limits: limits,
      title: {
        fontSize: 12,
        text: title
      },      
      renderer: function (axis, value) {
        var label = '';
        if (bigdata == 'thousand'){
          label = (parseFloat(value)/1000).toFixed(decimals);
        }
        else if (bigdata == 'million'){
          label = (parseFloat(value)/1000000).toFixed(decimals);
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
            var label = '';
            var value = parseFloat(text);
            if (value > 0){
              if (value > 10){
                label = value.toFixed(0) + ' ' + measure;
              }
              else{
                label = value.toFixed(decimals) + ' ' + measure;
              }
            } 
            return label;
          }
        }
      }
    }];
  }
};

__Chart.Annual = {

  getBbar: function (indicator_id, userInput, cropPrice, userPolygon, aggregName, PreviewTooltip) {

    var cropPrices = cropPrice;
    var transferButton = !userPolygon;
    var WUEButton = (userPolygon && indicator_id == 'vir');
    var prodButton = (userPolygon && userInput && indicator_id != 'vir');  

    var bbarItems = [];
    
    if (cropPrices){
      bbarItems.push({ 
        xtype: 'button', 
        text: i18n.chart.showCropPrices, 
        handler: 'onCropPrices'
      });
    }
    bbarItems.push({xtype: 'tbfill'});
    if (transferButton){
      bbarItems.push({ 
        xtype: 'button', 
        text: i18n.chart.transfer + ' ' + aggregName + ' ' + i18n.chart.toMyPolygons, 
        iconCls: 'x-fa fa-mail-forward',
        handler: 'onTransfer'
      });
    }
    if (WUEButton){    
      bbarItems.push({ 
        xtype: 'button', 
        text:  i18n.polygon.calculateWUE2, 
        iconCls: 'x-fa fa-tint',
        ui: 'default',
        handler: 'onCalculateWUE'
      });  
    }
    if (prodButton){      
      bbarItems.push({ 
        xtype: 'button', 
        text:  i18n.polygon.calculateProd2, 
        iconCls: 'x-fa fa-tint',
        ui: 'default',        
        handler: 'onCalculateProd'
      }); 
    }
    bbarItems.push({ 
      xtype: 'button', 
      text: i18n.chart.png, 
      handler: 'onPreview', 
      tooltip: PreviewTooltip
    }); 
    var bbar = [{
      xtype: 'toolbar',
      dock: 'bottom',
      height: 27,
      style: {
        margin: '0px 0px 5px 0px'
      },
      defaults : {
        height : 22,
        style: { padding: '0px 7px' }
      },            
      items: bbarItems
    }];

    return bbar;
  }
};