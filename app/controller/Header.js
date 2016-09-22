Ext.define('App.controller.Header', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.header',

  requires: [
    'App.view.header.DetailWindow'
  ],

  init: function () {
    this.DetailWindow = Ext.create('App.view.header.DetailWindow');
  },

  onLocale: function () {
    localStorage.setItem('locale', nextLocale());
    location.reload();
  },

  onContact: function () {
    window.open(__Global.urls.Impressum, 'impressum');
  },

  onFAQ: function () {
    window.open(__Global.urls.Faq, 'faq');
  },

  onFeedback: function () {
    window.open(i18n.header.questionnaire_url, 'feedbackdoc');
  },

  onDetail: function () {
    this.DetailWindow.show();
  },

  onPilot: function (country, oblast, rayon, buis, uis, wua) {
    //clear zoom comboboxes
    App.service.Watcher.set('Country', null);
    App.service.Watcher.set('Oblast', null);
    App.service.Watcher.set('Rayon', null);
    App.service.Watcher.set('Buis', null);
    App.service.Watcher.set('Uis', null);
    App.service.Watcher.set('Wua', null);
    App.service.Helper.setComponentsValue([{ id: 'zoom-cb-country', selection: 'Country' }]);
    //set values
    App.service.Watcher.set('Country', country);
    App.service.Watcher.set('Oblast', oblast);
    App.service.Watcher.set('Rayon', rayon);
    App.service.Watcher.set('Buis', buis);
    App.service.Watcher.set('Uis', uis);
    App.service.Watcher.set('Wua', wua);

    App.service.Helper.setComponentsValue([{ id: 'zoom-cb-country', selection: 'Country' }]);
  }

});
