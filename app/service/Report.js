Ext.define('App.service.Report', {

  singleton: true,

  isBusy: false,

  requires: [
    'App.util.Window'
  ],

  window    : Ext.create('App.util.Window', { 
    title: i18n.report.generate_window, 
    items: [{ xtype: 'app-report-form' }], 
    listeners: { 
      show: 'onReportWindow' },
    modal: true
  }),

  uri       : 'data:application/vnd.ms-excel;base64,',
  template  : '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
  base64    : function (s)    { return window.btoa(unescape(encodeURIComponent(s))) },
  format    : function (s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) },


  getYearData: function () {
    var data = [];
    var minMax = App.service.Yearslider.getMinMax();
    for (var i = minMax.min; i <= minMax.max; i++) {
      data.push({id: i, name: i});
    }    
    return data;
  },

  doRequest: function (params) {
    var self = this;
    if (self.isBusy) return false;

    var table = params.oblast ? 'rayon' : 'uis';
    var parent = params.oblast || params.buis;

    var oblast = params.oblast;
    var title1 = App.service.Helper.getComponentExt( oblast ? 'report-cb-oblast' : 'report-cb-buis' ).getSelection().get('name');
    var title2 = oblast ? i18n.adminFilters.oblast : i18n.adminFilters.buis;
    var year = params.year;

    Ext.data.JsonP.request({
      url :  __Global.api.Report + 'table=' + table + '&parent=' + parent + '&year=' + year,
      callbackName: 'ReportResponse',
      params: {format_options: 'callback:Ext.data.JsonP.ReportResponse'},
      success: function (results) {
        self.isBusy = false;
        var worksheetname = title1.replace(/ /g,"_") + '_' + params.type + '_' + year;
        if (worksheetname.length > 31){
          worksheetname = params.type + '_' + year;
        }
        var ctx = { worksheet: worksheetname, table: self[params.type](results, title1 + ' ' + title2, year, oblast) };

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");    
        link.href = self.uri + self.base64(self.format(self.template, ctx));
        
        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        //link.download = "WUEMoCA Report.xls";
        link.download = title1.replace(/ /g,"_") + '_' + title2 + '_' + params.type + '_' + year + '.xls';
        
        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

       // window.location.href = self.uri + self.base64(self.format(self.template, ctx));
      }
    });   
  },

  cropPattern: function (data, title, year, oblast) {
    var result = { head: '', body: '' };

    var topTitle = i18n.report.titlePattern.replace('{object}', title);
        topTitle = topTitle.replace('{year}', year);
    var nameTH = oblast ? i18n.report.nameRayonTH : i18n.report.nameUisTH;
    
    result.head = '<tr><th colspan="15">' + topTitle + '</th></tr>';
    result.head += '<tr>';
    result.head += '<th rowspan="3" style="width:200px">' + nameTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.fir_bTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.firnTH + '</th>';
    result.head += '<th colspan="2">' + i18n.report.industrialTH + '</th>';
    result.head += '<th colspan="2">' + i18n.report.grainTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.vegTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.fodderTH + '</th>';
    result.head += '<th colspan="2">' + i18n.report.perennialTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.homesteadTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.otherTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.riceTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.fallowTH + '</th>';
    result.head += '</tr>';

    result.head += '<tr>';
    result.head += '<th style="width:80px">' + i18n.report.totalTH + '*</th>';
    result.head += '<th style="width:80px">' + i18n.report.cottonTH + '</th>';
    result.head += '<th style="width:80px">' + i18n.report.totalTH + '**</th>';
    result.head += '<th style="width:80px">' + i18n.report.wheatTH + '</th>';
    result.head += '<th style="width:80px">' + i18n.report.orchardTH + '</th>';
    result.head += '<th style="width:80px">' + i18n.report.grapesTH + '</th>';
    result.head += '</tr>';

    result.head += '<tr>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '</tr>';

    data.map(function (rec) {
      var name = rec['rayon_' + __Global.lang] || rec['uis_' + __Global.lang];
      var totalGrain = parseFloat(rec.firf_wheat) + parseFloat(rec.firf_maize);
      result.body += '<tr>';
      result.body += '<td>' + name + '</td>';
      result.body += '<td></td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.firn).toFixed(1) + '</td>';
      result.body += '<td></td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.firf_cotton).toFixed(1) + '</td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + totalGrain.toFixed(1) + '</td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.firf_wheat).toFixed(1) + '</td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.firf_veg).toFixed(1) + '</td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.firf_alfa).toFixed(1) + '</td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.firf_orchard).toFixed(1) + '</td>';
      result.body += '<td></td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.firf_garden).toFixed(1) + '</td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.firf_other).toFixed(1) + '</td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.firf_rice).toFixed(1) + '</td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.fallow_ha).toFixed(1) + '</td>';
      result.body += '</tr>';
    });

    result.body += this.getFooter();

    return '<thead>' + result.head + '</thead><tbody>' + result.body + '</tbody>';
  },

  grossHarvest: function (data, title, year, oblast) {
    var result = { head: '', body: '' };

    var topTitle = i18n.report.titleHarvest.replace('{object}', title);
        topTitle = topTitle.replace('{year}', year);
    var nameTH = oblast ? i18n.report.nameRayonTH : i18n.report.nameUisTH;

    result.head = '<tr><th colspan="14">' + topTitle + '</th></tr>';
    result.head += '<tr>';
    result.head += '<th rowspan="3" style="width:200px">' + nameTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.fir_bTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.firnTH + '</th>';
    result.head += '<th colspan="2">' + i18n.report.industrialTH + '</th>';
    result.head += '<th colspan="2">' + i18n.report.grainTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.vegTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.fodderTH + '</th>';
    result.head += '<th colspan="2">' + i18n.report.perennialTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.homesteadTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.otherTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.riceTH + '</th>';
    result.head += '</tr>';

    result.head += '<tr>';
    result.head += '<th style="width:80px">' + i18n.report.totalTH + '*</th>';
    result.head += '<th style="width:80px">' + i18n.report.cottonTH + '</th>';
    result.head += '<th style="width:80px">' + i18n.report.totalTH + '**</th>';
    result.head += '<th style="width:80px">' + i18n.report.wheatTH + '</th>';
    result.head += '<th style="width:80px">' + i18n.report.orchardTH + '</th>';
    result.head += '<th style="width:80px">' + i18n.report.grapesTH + '</th>';
    result.head += '</tr>';

    result.head += '<tr>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.tnTH + '</th>';
    result.head += '<th>' + i18n.report.tnTH + '</th>';
    result.head += '<th>' + i18n.report.tnTH + '</th>';
    result.head += '<th>' + i18n.report.tnTH + '</th>';
    result.head += '<th>' + i18n.report.tnTH + '</th>';
    result.head += '<th>' + i18n.report.tnTH + '</th>';
    result.head += '<th>' + i18n.report.tnTH + '</th>';
    result.head += '<th>' + i18n.report.tnTH + '</th>';
    result.head += '<th>' + i18n.report.tnTH + '</th>';
    result.head += '<th>' + i18n.report.tnTH + '</th>';
    result.head += '<th>' + i18n.report.tnTH + '</th>';
    result.head += '</tr>';

    data.map(function (rec) {
      var name = rec['rayon_' + __Global.lang] || rec['uis_' + __Global.lang];

      result.body += '<tr>';
      result.body += '<td>' + name + '</td>';
      result.body += '<td></td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.firn).toFixed(1) + '</td>';
      result.body += '<td></td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.pirf_cotton).toFixed(1) + '</td>';
      result.body += '<td></td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.pirf_wheat).toFixed(1) + '</td>';
      result.body += '<td></td>';
      result.body += '<td></td>';
      result.body += '<td></td>';
      result.body += '<td></td>';
      result.body += '<td></td>';
      result.body += '<td></td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.pirf_rice).toFixed(1) + '</td>';      
      result.body += '</tr>';
    });

    result.body += this.getFooter();

    return '<thead>' + result.head + '</thead><tbody>' + result.body + '</tbody>';
  },

  cropYield: function (data, title, year, oblast) {
    var result = { head: '', body: '' };

    var topTitle = i18n.report.titleYield.replace('{object}', title);
        topTitle = topTitle.replace('{year}', year);

    var nameTH = oblast ? i18n.report.nameRayonTH : i18n.report.nameUisTH;
    
    result.head = '<tr><th colspan="14">' + topTitle + '</th></tr>';
    result.head += '<tr>';
    result.head += '<th rowspan="3" style="width:200px">' + nameTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.fir_bTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.firnTH + '</th>';
    result.head += '<th colspan="2">' + i18n.report.industrialTH + '</th>';
    result.head += '<th colspan="2">' + i18n.report.grainTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.vegTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.fodderTH + '</th>';
    result.head += '<th colspan="2">' + i18n.report.perennialTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.homesteadTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.otherTH + '</th>';
    result.head += '<th rowspan="2" style="width:80px">' + i18n.report.riceTH + '</th>';    
    result.head += '</tr>';

    result.head += '<tr>';
    result.head += '<th style="width:80px">' + i18n.report.totalTH + '*</th>';
    result.head += '<th style="width:80px">' + i18n.report.cottonTH + '</th>';
    result.head += '<th style="width:80px">' + i18n.report.totalTH + '**</th>';
    result.head += '<th style="width:80px">' + i18n.report.wheatTH + '</th>';
    result.head += '<th style="width:80px">' + i18n.report.orchardTH + '</th>';
    result.head += '<th style="width:80px">' + i18n.report.grapesTH + '</th>';
    result.head += '</tr>';

    result.head += '<tr>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.haTH + '</th>';
    result.head += '<th>' + i18n.report.thaTH + '</th>';
    result.head += '<th>' + i18n.report.thaTH + '</th>';
    result.head += '<th>' + i18n.report.thaTH + '</th>';
    result.head += '<th>' + i18n.report.thaTH + '</th>';
    result.head += '<th>' + i18n.report.thaTH + '</th>';
    result.head += '<th>' + i18n.report.thaTH + '</th>';
    result.head += '<th>' + i18n.report.thaTH + '</th>';
    result.head += '<th>' + i18n.report.thaTH + '</th>';
    result.head += '<th>' + i18n.report.thaTH + '</th>';
    result.head += '<th>' + i18n.report.thaTH + '</th>';
    result.head += '<th>' + i18n.report.thaTH + '</th>';    
    result.head += '</tr>';

    data.map(function (rec) {
      var name = rec['rayon_' + __Global.lang] || rec['uis_' + __Global.lang];

      result.body += '<tr>';
      result.body += '<td>' + name + '</td>';
      result.body += '<td></td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.firn).toFixed(1) + '</td>';
      result.body += '<td></td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.y_cotton).toFixed(1) + '</td>';
      result.body += '<td></td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.y_wheat).toFixed(1) + '</td>';
      result.body += '<td></td>';
      result.body += '<td></td>';
      result.body += '<td></td>';
      result.body += '<td></td>';
      result.body += '<td></td>';
      result.body += '<td></td>';
      result.body += '<td style=\'mso-number-format:"#,##0.0"\'>' + parseFloat(rec.y_rice).toFixed(1) + '</td>';      
      result.body += '</tr>';
    });

    result.body += this.getFooter();

    return '<thead>' + result.head + '</thead><tbody>' + result.body + '</tbody>';
  },

  getFooter: function () {
    result = '';

    result += '<tr>';
    result += '<td style="font-weight:bold;">' + i18n.report.footer1 + '</td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '</tr>';

    result += '<tr>';
    result += '<td style="font-weight:bold;">' + i18n.report.footer2 + '</td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '<td></td>';
    result += '</tr>';

    return result;
  }

});