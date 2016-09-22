Ext.define('App.view.header.Feedback', {
  extend: 'Ext.button.Button',

  xtype: 'app-header-feedback',

  tooltip: i18n.header.questionnaire,
  text: i18n.header.feedback,

  listeners: {
    click: 'onFeedback'
  }

});