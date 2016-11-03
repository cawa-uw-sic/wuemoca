var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

Ext.define('App.view.polygon.FormUpload', {
  extend: 'Ext.form.Panel',

  requires: [
    'App.controller.Polygon'
  ],

  xtype: 'app-polygon-formupload',

  controller: 'polygon',
  border: false,
  bodyPadding: 10,
  fieldDefaults: {
    labelAlign: 'top'
  },
  defaults: {
    layout: 'fit',
    flex: 1,
    border: false,
    margin: '0 0 10 0'
  },

  items: [{
      xtype: 'filefield',
      name: 'shapefile',
      fieldLabel: 'Shapefile',
      labelWidth: 50,
      msgTarget: 'side',
      allowBlank: false,
      anchor: '100%',
      buttonText: 'Select Shapefile...'
  }],

  buttons: [{
      text: 'Upload',
      handler: function() {
          var form = this.up('form').getForm();
          if(form.isValid()){
              form.submit({
                  //url: 'photo-upload.php',
                  waitMsg: 'Uploading your Shapefile...',
                  success: function(fp, o) {
                      Ext.Msg.alert('Success', 'Your Shapefile "' + o.result.file + '" has been uploaded.');
                  }
              });
          }
      }
  }]

});