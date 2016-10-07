Ext.define('App.service.Tooltip', {

  singleton: true,

  isBusy: false,

  tooltip: Ext.create('App.view.tooltip.Index'),

  display: function (e) {
    if (this.isBusy || App.service.Polygon.activated) return;
    this.isBusy = true;
    this.doRequest(e);
  },

  doRequest: function (e) {
    var self = this;
    Ext.data.JsonP.request({
      url: App.service.Map.getUrl(e, !!App.service.Watcher.getIndicator().years),
      callbackName: 'parseHoverResponse',
      params: {format_options: 'callback:Ext.data.JsonP.parseHoverResponse'},
      success: function (results) {
        self.showTooltip(e, results.features);
        self.createTimer();
      }
    });
  },

  createTimer: function () {
    var self = this;
    setTimeout(function() {
      self.isBusy = false;
    }, 300);
  },

  showTooltip: function (e, features) {
    this.tooltip.hide();
    if (features.length > 0) {
      var html = this.getFeatureHTML(features[0].properties);
      //this.tooltip.update(html.title + '<br>' + html.content);
      //this.tooltip.showAt([e.originalEvent.pageX + 10, e.originalEvent.pageY + 10]);
      App.service.Status.set('<b>' + html.title + ' - ' + html.content + '</b>');
    }
  },

  getFeatureHTML: function (properties) {

    var indicator = App.service.Watcher.getIndicator();
    var aggregation = App.service.Watcher.getAggregation();

    var title = (properties[aggregation.id + '_' + __Global.Lang] || '') + ' ' + aggregation[__Global.Lang + 'NameShort'];

    var content =  App.service.Map.getLegendTitle(false);
    var yField = indicator.field;
    if (!!indicator.crops) {
      yField = yField.replace('{crop}', App.service.Watcher.get('Crop'));
      //content = i18n.crop[ App.service.Watcher.get('Crop') ];
    }

    content += ': ' + parseFloat(properties[yField]).toFixed(2) + ' ' + ( indicator[ __Global.Lang + 'Unit' ] || '' );

    return {
      title   : title,
      content : content
    }

  }


});