Ext.define('App.controller.Header', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.header',

  requires: [
    'App.view.header.DetailWindow',
    'App.view.header.IntroWindow'
  ],

  init: function () {
    this.DetailWindow = Ext.create('App.view.header.DetailWindow');
    this.IntroWindow = Ext.create('App.view.header.IntroWindow');
  },

  onLocale: function () {
    localStorage.setItem('locale', nextLocale());
    location.reload();
  },

  onImpressum: function () {
    window.open(__Global.urls.Impressum, 'impressum');
  },

  onFaq: function () {
    //important: http://scriptasylum.com/tutorials/frameredirect/frameredirect.html
    App.service.Helper.openGlossaryFrame(__Global.urls.Faq);
  },

  onGlossary: function () {
    //important: http://scriptasylum.com/tutorials/frameredirect/frameredirect.html
   App.service.Helper.openGlossaryFrame(__Global.urls.Intro);
  },

  onManual: function () {
    window.open(__Global.urls.Manual, 'manual');
  },

  onFeedback: function () {
    window.open(i18n.header.questionnaire_url, 'feedbackdoc');
  },

  onDetail: function () {
    this.DetailWindow.show();
  },

  onIntroWindowBtn: function () {
    this.IntroWindow.show();
  },

  onReport: function () {
    App.service.Report.window.show();
  }

});
