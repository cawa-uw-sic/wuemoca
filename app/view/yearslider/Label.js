Ext.define('App.view.yearslider.Label', {
  extend: 'Ext.form.Label',

  xtype: 'app-yearslider-label',

  itemId: 'yearslider-label',

  id: 'slider-label',

  html: '<div class="justify">' +
			'<a>' + __Global.year.Min + '</a>&nbsp;' + 
			'<a>' + 'Year slider' + '</a>&nbsp;' + 			
			'<a>' + __Global.year.Max + '</a>' +
  		'</div>'

});