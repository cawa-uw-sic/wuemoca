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
    App.service.Helper.openDocument(__Global.urls.Imprint, 'imprint', null);
  },
  /**
  * @method onIndicatorOverview
  * open glossary URL on FAQ page
  */
  onIndicatorOverview: function () {
    App.service.Helper.openDocument(__Global.urls.AcronymPDF, 'acronympdf', null);
  },
  /**
  * @method onGlossary
  * open glossary URL
  */
  onGlossary: function () {
    //important: http://scriptasylum.com/tutorials/frameredirect/frameredirect.html
    App.service.Helper.openDocument(
      __Global.urls.GlossaryBase + __Global.urls.Intro, 
      'glossary',
      null
    );
  },
  /**
  * @method onManual
  * open manual document
  */
  onUserGuide: function () {
    App.service.Helper.openDocument(__Global.urls.UserGuide, 'userguide', null);
  },

  /**
  * @method onVideoHeader
  * open video URL
  */
  onVideoHeader: function () {
    App.service.Helper.openDocument(__Global.urls.VideoHeader, 'videoheader', null);
    //App.service.Helper.getComponentExt('header-introwindow').hide();
  }

});
