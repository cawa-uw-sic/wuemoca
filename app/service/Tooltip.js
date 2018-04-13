Ext.define('App.service.Tooltip', {

  singleton: true,

  isBusy: false,

  //tooltip: Ext.create('App.view.tooltip.Index'),

  display: function (e) {
    var map = App.service.Map.instance;  
    if (
      e.dragging || 
      this.isBusy || 
      //App.service.Polygon.activated || 
      !App.service.Watcher.get('Indicator') //|| 
      //!App.util.Layer.current.getVisible()
    ) 
    { 
/*      if (!App.service.Watcher.get('Indicator') || !App.util.Layer.current.getVisible()){

        App.service.Status.set('&#160;');
        map.getTargetElement().style.cursor = '';           
      }*/
      return;
    }
    if (App.service.Watcher.get('UserPolygon') == 'show' && !App.service.Polygon.activated){
      var pixel = map.getEventPixel(e.originalEvent);
      var hit = map.hasFeatureAtPixel(pixel);
      
      map.getTarget().style.cursor = hit ? 'pointer' : '';      
    }
    else if (App.util.Layer.current && App.util.Layer.current.getVisible()){
      this.isBusy = true;
      this.doRequest(e);
    }
    else{
      App.service.Status.set('&#160;');
      map.getTargetElement().style.cursor = '';       
    }
  },

  doRequest: function (e) {
    var self = this;
    var map = App.service.Map.instance;
    var url = App.service.Map.getUrl(e.coordinate, !!App.service.Watcher.getIndicator().years, false);
    if (url){
      Ext.data.JsonP.request({
        url: url,
        callbackName: 'parseHoverResponse',
        params: {format_options: 'callback:Ext.data.JsonP.parseHoverResponse'},
        success: function (results) {
          if (results.features.length > 0){
            self.showTooltip(e, results.features);
            //show mouse pointer if features are captured
            map.getTargetElement().style.cursor = 'pointer';
          }
          else{
            App.service.Status.set('&#160;');
            map.getTargetElement().style.cursor = '';
          }
        },
        callback: function (results){
          // set delay to avoid too much traffic
          self.createTimer();          
        },
        failure: function (results) {
          App.service.Status.set('&#160;');
          map.getTargetElement().style.cursor = '';
        }
      });
    }
    else{
       map.getTargetElement().style.cursor = '';
       App.service.Status.set('&#160;');
       self.createTimer();
    }
  },

  //timer to avoid overload of Ext.data.JsonP.requests
  createTimer: function () {
    var self = this;
    setTimeout(function() {
      self.isBusy = false;
    }, 300);
  },

  showTooltip: function (e, features) {
    //this.tooltip.hide();
    if (features.length > 0) {
      var html = this.getFeatureHTML(features[0].properties);
      App.service.Status.set('<b>' + html.title + ' - ' + html.content + '</b>');
    }
  },

  getFeatureHTML: function (properties) {

    var indicator = App.service.Watcher.getIndicator();
    var aggregation = App.service.Watcher.getAggregation();

    var title = (properties[aggregation.id + '_' + __Global.lang] || '') + ' ' + aggregation[__Global.lang + 'NameShort'];

    var content =  App.service.Map.getLegendTitle(false, 'no');
    var yField = indicator.field;
    if (!!indicator.crops) {
      yField = yField.replace('{crop}', App.service.Watcher.get('Crop'));
    }

    if (indicator.id == 'mlu'){
      content += ': ' + indicator[__Global.lang + 'CropNames'][properties[yField] - 1];
    }
    else{
      content += ': ' + parseFloat(properties[yField]).toLocaleString(
        __Global.lang, 
        {maximumFractionDigits: indicator.decimals}
      );
      if (indicator.id == 'firn' || (indicator.chart != 'Multiannual' && indicator.enUnit != 'Index')) {
        content += ' ' + indicator[ __Global.lang + 'Unit' ];
      }
    }
    if (!!indicator.years){
      content += i18n.chart._in + App.service.Watcher.get('Year');
    }

    return {
      title   : title,
      content : content
    }

  }


});