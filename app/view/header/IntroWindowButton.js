Ext.define('App.view.header.IntroWindowButton', {
	extend: 'Ext.button.Button',

	xtype: 'app-introwindow-button',

	itemId: 'introwindow-button',

	id: 'introwindow-button',

	iconCls: 'x-fa fa-youtube-play',

	text: 'Instruction<br>videos',
	//height: 50,

	handler: 'onIntroWindowBtn'

});
