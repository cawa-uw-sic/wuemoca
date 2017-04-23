/**
* report controller
*/
Ext.define('App.controller.Report', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.report',

  onFormSubmit: function (el, form, val) {
    var vals = el.up().up().getValues();
    if ((!vals.oblast && !vals.buis) || !vals.year) return Ext.Msg.alert('', i18n.report.alert);
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
    App.service.Helper.getComponentExt('report-btn-submit').setDisabled(true);
    App.service.Helper.getComponentExt('report-btn-submit').setText(i18n.report.btnSubmit);   
  },

  onOblast: function (cb, val) {
    if (val && val != '0') {
      App.service.Helper.resetComboboxes(['report-cb-buis']);
      var vals = cb.up().up().getValues();
      if ((!!vals.oblast || !!vals.buis) && !!vals.year) {
        App.service.Helper.getComponentExt('report-btn-submit').setDisabled(false);
        App.service.Helper.getComponentExt('report-btn-submit').setText(i18n.report.generate_window + ': ' + cb.rawValue + ' ' + i18n.adminFilters.oblast);  
      }
      else{
        App.service.Helper.getComponentExt('report-btn-submit').setDisabled(true);      
        App.service.Helper.getComponentExt('report-btn-submit').setText(i18n.report.btnSubmit);     
      }     
    }
  },

  onBuis: function (cb, val) {
    if (val && val != '0') {
      App.service.Helper.resetComboboxes(['report-cb-oblast']);
      var vals = cb.up().up().getValues();
      if ((!!vals.oblast || !!vals.buis) && !!vals.year) {
        App.service.Helper.getComponentExt('report-btn-submit').setDisabled(false);
        App.service.Helper.getComponentExt('report-btn-submit').setText(i18n.report.generate_window + ': ' + cb.rawValue + ' ' + i18n.adminFilters.buis);  
      }  
      else{
        App.service.Helper.getComponentExt('report-btn-submit').setDisabled(true);   
        App.service.Helper.getComponentExt('report-btn-submit').setText(i18n.report.btnSubmit);       
      }                     
    }
  }

});