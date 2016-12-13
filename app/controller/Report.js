Ext.define('App.controller.Report', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.report',

  onFormSubmit: function (el, form, val) {
    var vals = el.up().up().getValues();
    if (!vals.oblast && !vals.buis && !vals.year) return alert(i18n.report.alert);
    App.service.Report.doRequest(vals);
    App.service.Report.window.close();
  },

  onCountry: function (cb, val) {
    App.service.Helper.resetStores(['reportoblast', 'reportbuis']);
    App.service.Helper.resetComboboxes(['report-cb-oblast', 'report-cb-buis']);
    App.service.Helper.hideComponents(['report-cb-oblast', 'report-cb-buis']);

    if (val && val != '0') {
      App.service.Helper.showComponents(['report-cb-oblast']);
      Ext.getStore('reportoblast').load({params: {country: val}});
      if (val == 'UZB') {
        App.service.Helper.showComponents(['report-cb-buis']);
        Ext.getStore('reportbuis').load({params: {country: val}});
      }
    }
  },

  onOblast: function (cb, val) {
    if (val && val != '0') {
      App.service.Helper.resetComboboxes(['report-cb-buis']);
    }
  },

  onBuis: function (cb, val) {
    if (val && val != '0') {
      App.service.Helper.resetComboboxes(['report-cb-oblast']);
    }
  }

});