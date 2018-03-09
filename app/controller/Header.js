/**
* header controller
*/
Ext.define('App.controller.Header', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.header',

  requires: [
    //'App.view.header.DetailWindow',
    //'App.view.header.IntroWindow'
  ],
  init: function () {
    //this.DetailWindow = Ext.create('App.view.header.DetailWindow');
    //this.IntroWindow = Ext.create('App.view.header.IntroWindow');
  },
  /**
  * @method onLocale
  * switch language
  */
  onLocale: function () {
    localStorage.setItem('locale', nextLocale());
    location.reload();
  },
  /**
  * @method onImprint
  * show imprint document
  */
  onImprint: function () {
    App.service.Helper.openDocument(__Global.urls.Imprint, 'imprint');
  },
  /**
  * @method onFaq
  * open glossary URL on FAQ page
  */
  onFaq: function () {
    //important: http://scriptasylum.com/tutorials/frameredirect/frameredirect.html
    App.service.Helper.openDocument(__Global.urls.GlossaryBase + __Global.urls.Faq, 'glossary');
  },
  /**
  * @method onGlossary
  * open glossary URL
  */
  onGlossary: function () {
    //important: http://scriptasylum.com/tutorials/frameredirect/frameredirect.html
    App.service.Helper.openDocument(__Global.urls.GlossaryBase + __Global.urls.Intro, 'glossary');
  },
  /**
  * @method onManual
  * open manual document
  */
  onManual: function () {
    App.service.Helper.openDocument(__Global.urls.Manual, 'manual');
  },
  /**
  * @method onFeedback
  * open feedback URL
  */
  /*onFeedback: function () {
    App.service.Helper.openDocument(i18n.header.questionnaire_url, 'feedbackdoc');
  },*/
  /**
  * @method onDetail
  * show detail window
  */
  /*onDetail: function () {
    this.DetailWindow.show();
  },*/
  /**
  * @method onIntroWindowBtn
  * show intro window
  */
  /*onIntroWindowBtn: function () {
    this.IntroWindow.show();
  },*/

  /**
  * @method onVideoHeader
  * open video URL
  */
  onVideoHeader: function () {
    App.service.Helper.openDocument(__Global.urls.VideoHeader, 'videoheader');
    //App.service.Helper.getComponentExt('header-introwindow').hide();
  }

});
