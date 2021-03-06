window.locales = ['en', 'ru'];
window.localesText = {
  en: 'English',
  ru: 'Русский'
};
window.locale = localStorage.getItem('locale') || 'en';
window.nextLocale = function () {
  if (locales.indexOf(locale) == locales.length - 1) return locales[0];
  return locales[locales.indexOf(locale) + 1];
};
var i18n = {
  prod: {
    btnSubmit: 'Calculate Productivity indicators',
    windowTitle: 'Productivity Form',
    tab1: 'Crop specific input',
    tab2: 'Crop unspecific input',
    fulldata: 'Please provide complete annual data sets for all occurring crops!',
    userinput: 'User input is required to calculate Productivity indicators.<br>Pre-filled values are taken from the WUEMoCA database.',
    calculateProd: 'Calculate Productivity',
    calculateProdSuccess: 'Productivity indicators calculated successfully!',
      delete_all: 'delete all',
      values: 'values'
  },

  yesno :{
    yes: 'Yes',
    no: 'No'
  },

  header: {
    wuemoca_long            : '<b>W</b>ater <b>U</b>se <b>E</b>fficiency <b>Mo</b>nitor in <b>C</b>entral <b>A</b>sia',
    cawa_homepage           : 'CAWa project homepage',
    introwindow             : 'Intro<br>Window',
    cawa_website            : 'http://www.cawa-project.net/',
    ffo_homepage            : 'Federal Foreign Office of Germany',
    ffo_website             : 'http://www.auswaertiges-amt.de/EN/Startseite_node.html',
    wuemoca_about           : 'About WUEMoCA',
    details                 : 'Details',
    questionnaire           : 'User questionnaire',
    questionnaire_url       : 'https://de.surveymonkey.com/r/RMVQ267',
    feedback                : 'Feedback',
    about                   : 'About',
	  help                    : 'Help and Info',
    contact                 : 'Contact',
    responsible             : 'persons responsible',
    imprint                 : 'Imprint and Data sources',
    manual                  : 'User Guide',
    faq                     : 'Frequently asked questions',
    glossary                : 'Glossary',
   // readmore: 'Click to read more about',
        readmore: '',
    uniwue                  : 'Department of Remote Sensing at Wuerzburg University',
    sic: 'SIC ICWC',
    sicurl: 'http://sic.icwc-aral.uz/index_e.htm',
    beta: 'BETA version',
    video_general: 'Instruction Video - General Information',
    cawa_report: 'Project report on WUEMoCA',
    cawa_report_tooltip: 'CAWa project phase III 2015-2017 work package 3',
    overview: 'Indicator overview'

  },

  pilot: {
      text                  : 'Pilot Area filter (UZB)',
    tooltip                 : 'Select Pilot Area'
  },
  fergana: {
    text                    : 'Fergana Province',
    tooltip                 : 'Zoom to Pilot Area Fergana Province'
  },
  khorezm: {
    text                    : 'Khorezm Province',
    tooltip                 : 'Zoom to Pilot Area Khorezm Province'
  },
  dargom: {
    text                    : 'Dargom ISA',
    tooltip                 : 'Zoom to Pilot Area Dargom ISA'
  },

  filter: {
    title                   : 'Map Controls'
  },

  report: {
    generate_button              : 'Generate Report',
    generate_window              : 'Generate Report',
    btnTooltip1:'Show a selection of indicators as report in statistics format',
    btnTooltip2:'description',              
    year                    : 'Select year',
    selectCountry: 'Select country',
    selectOblast: 'Select province',
    selectBUIS: 'Select BISA',

    btnSubmit               : 'Generate',
    cropPattern             : 'Irrigation crop patterns',
    grossHarvest             : 'Gross harvest',
    cropYield               : 'Irrigation crop yields',

    titlePattern            : 'Irrigation crop patterns in {object}, growing season {year}',
    titleHarvest            : 'Gross harvest Irrigation fields in {object} {year}',
    titleYield              : 'Irrigation crop yields in {object} {year}',
    alert: 'Select province or BISA!',

    nameUisTH                : 'Site (ISA and district)',
    nameRayonTH                : 'Site (district)',
    fir_bTH                : 'Irrigation area, gross',
    firnTH                : 'Net irrigated area',
    industrialTH           : 'Industrial crops',
    totalTH               : 'Total',
    cottonTH              : 'Cotton',
    grainTH               : 'Grain',
    wheatTH               : 'Wheat',
    vegTH                 : 'Vegetables and cucurbits',
    fodderTH              : 'Fodder crops',
    perennialTH           : 'Perennial crops',
    orchardTH             : 'Orchards',
    grapesTH              : 'Grapes',
    homesteadTH           : 'Homestead plots',
    otherTH               : 'Other',
    riceTH                : 'Rice',
    fallowTH              : 'Fallow land',
    haTH                  : 'ha',
    tnTH                  : 'tn',
    thaTH                 : 't/ha',

    footer1               : '*Cotton, oil crops, tobacco',
    footer2               : '**Wheat, corn'


  },

  adminFilters: {
    title                   : 'Area filter (optional)',
    title_userPolygon       : 'Zoom to area',
    country                 : 'Country',
    country_empty           : 'Aral Sea Basin',
    oblast                  : 'Province',
    oblast_empty            : 'Select province',
    rayon                   : 'District',
    rayon_empty             : 'Select district',
    rayonsearch                   : 'search for district',
    rayonsearch_empty             : 'type district name',    
    buis                    : 'BISA',
    buis_empty              : 'Select BISA',
    uis                     : 'ISA',
    uis_empty               : 'Select ISA',
    wua                     : 'or WUA',
    wua_empty               : 'type WUA name',
    oblastBtnText           : 'Province<br>map',
    rayonBtnText            : 'District<br>map',
    uisBtnText              : 'ISA<br>map',
    buisBtnText             : 'BISA<br>map',
    wuaBtnText              : 'WUA<br>map',
    oblastBtnTooltip        : 'Aggregations to Province',
    rayonBtnTooltip         : 'Aggregations to District',
    uisBtnTooltip           : 'Aggregations to ISA',
    buisBtnTooltip          : 'Aggregations to BISA',
    wuaBtnTooltip           : 'Aggregations to WUA',
    _or                     : 'OR',
    reset                   :'reset<br>filter',
    selected_indicator: 'The selected indicator',
          is_shown_as: 'is shown as',
                change_of_aggreg: 'Change of aggregation level',
                      zoom_to_selected: 'Zoom to selected',
                      is_not_available_as: 'is not available as'
  },

  mapSelection:{
    title       :'Maps',
    reset:'reset<br>selections',
    collapse: 'Collapse panel',
    expand: 'Expand panel'
  },

  unit: {
    label                   : 'Select unit type',
    admin                   : 'Administration',
    water                   : 'Water User Units',
    natural                 : 'Natural units',
    grid                    : 'regular Raster',
    polygon                 : 'User polygon'
  },

  aggreg: {
    label: function(aggreg_name){
      return aggreg_name + ' ' + i18n.aggreg.label2;
    },
    label1                   : 'Select',
    label2                   : 'aggregation level',
    map                     : function(aggreg_index){
      switch(aggreg_index){
        case 'oblast':
          return 'Province Map';
          break;
        case 'rayon':
          return 'District Map';
          break;
        case 'grid':
          return 'regular Raster Map';
          break;  
        case 'buis':
          return 'BISA Map';
          break;
        case 'uis':
          return 'ISA Map';
          break;
        case 'wua':
          return 'WUA Map';
          break; 
        case 'command':
          return 'Channel Command Area Map';
          break;          
      }
    }
  },

  indicator: {
    label                   : 'Select indicator',
    filter                  : 'Activate filter for indicator list',
    leftPanel: 'Select indicator on the left side.',
    _of: '-'
  },

  crop: {
    label                   : 'Select crop type:'
  },

  vc_classes: {
    less                 : 'little water',
    equal                     : 'balanced',
    more                  :  'much water'
  },

  yield_classes: {
    verylow                 : 'very low',
    low                     : 'low',
    medium                  : 'medium',
    high                    : 'high',
    veryhigh                : 'very high'
  },

  // //function example
  // layer: {
  //   yieldDescr              : function (crop_index, aggreg_index) {
  //     if (crop_index == 'wheat'){
  //       class1 = wheat_class1;
  //       class2 = wheat_class2;
  //       class3 = wheat_class3;
  //       class4 = wheat_class4;
  //       class5 = wheat_class5;
  //       class6 = wheat_class6;
  //       class7 = wheat_class7;
  //     }
  //     else if (crop_index == 'cotton'){
  //       class1 = cotton_class1;
  //       class2 = cotton_class2;
  //       class3 = cotton_class3;
  //       class4 = cotton_class4;
  //       class5 = cotton_class5;
  //       class6 = cotton_class6;
  //       class7 = cotton_class7;
  //     } else {
  //       return '';
  //     }
  //     return '<br>The map shows the yield of ' + i18n.crop[crop_index] + ' (tons per hectare) classified in seven classes:'
  //     <br>- (' + class6 + ' - ' + class7 + ' t/ha) high
  //     <br>- (' + class5 + ' - ' + class6 + ' t/ha)
  //     <br>- (' + class4 + ' - ' + class5 + ' t/ha)
  //     <br>- (' + class3 + ' - ' + class4 + ' t/ha) medium
  //     <br>- (' + class2 + ' - ' + class3 + ' t/ha)
  //     <br>- (' + class1 + ' - ' + class2 + ' t/ha)
  //     <br>- (0.01 - ' + class1 + ' t/ha) low
  //     <br>in the respective unit (' + i18n.aggreg[aggreg_index + 'Short'] + ').';'
  //   }
  // },

  settings: {
    legend                  : 'Legend',
    title                   : 'Map Legend',
    extent                  : 'Irrigated area',
    showLegend: 'Show legend',
    hideLegend: 'Hide legend'
  },

  map: {
    title                   : 'Overview Map',
    onSatellite              : 'Switch on<br>Aerial map',
    offSatellite              : 'Switch off<br>Aerial map',
    omap                    : 'Show Open Street Map'
  },

  chart: {
    title                   : 'Chart',
    png                     : 'Chart as PNG',
    allYear                 : 'all available years',
    _in                     : ' in ',
    no: '',
    thousand: 'thous. ',
    million: 'Mio. ',
    multiannualHeader1          : 'Multi-annual analysis',
    multiannualHeader2          : '(aggregated at 5km x 5km grid cells)',
    noChart    : 'No diagram available for',
    sumDoubleFallow: 'All crops incl. double usage, without fallow land',
    calculate_indicators: 'Calculate indicators',
    transfer: 'Transfer',
    toMyPolygons: "to 'User polygon Toolbox'",
    showCropPrices: 'Show crop prices',
    legendNotIncluded: 'Chart legend is not included',
    title_nodata: 'User input required',
    nodata: 'Please provide statistical data',
    nodata2: 'to calculate',         
    prevIndicator: 'Show previous annual indicator',
    nextIndicator: 'Show next annual indicator'
  },

  exp: {
    title                   : 'Export and Report',
    opts                    : 'Download options',
    tableCsv                : 'Table as CSV',
    tableExcel              : 'Export all indicators to Excel',
    indicatorAcronym: 'Indicator acronym',
    indicatorName: 'Indicator name',
    cropAcronym: 'Crop acronym',
    cropName: 'Crop name',
    reportPdf               : 'Report as PDF',
    selectWUAs              : 'Select WUA',
    selectRayons            : 'Select District (rayon)',
    selectOblasts           : 'Select Province (oblast)',
    selectCrop              : 'Select crop',
    selectIndicator           : 'Select indicator',
    singleWUA               : 'single WUA',
    allWUAsRayon            : 'all WUAs of District (rayon)',
    allWUAsOblast           : 'all WUAs of Province (oblast)',
    selectedWUAs            : 'selected WUAs',
    singleRayon             : 'single District (rayon)',
    singleOblast            : 'single Province (oblast)',
    allRayonsOblast         : 'all Districts of Province (oblast)',
    allOblastsCountry       : 'all Provinces of Country',
    allOblastsCA : 'all Provinces of CA',
    download: 'Download',
        download2: 'Download',
    asSHP: 'as SHP',
    filtered: 'filtered',
    tooltipSHP1: 'A ',
    tooltipSHP2: 'Shapefile (zipped) with all indicator values of all years will be created',
    map: 'map',
    table: 'table',
    mapOrTable : 'map or table',
    btnTooltip1: 'Download indicator map or table on',
    btnTooltip2: 'aggregation level. Select filter, format, year(s), and indicator(s).',

    selectFilter: 'Select filter',
    selectOutput: 'Select download format',
    download: 'Download',
    nofilter: 'Area filter not activated',
    noselection1: 'No',
    noselection2: 'selected (on the map)',
    selected: 'selected',
    conjunction: 's' + ' of ',
    all: 'all',
    plural: function(){
      return App.service.Watcher.getAggregation()['enNameShort'] + 's';
    },
    ASB: ' of ASB',
    acronym: 'Acronym<br>explanations',
          
    allpolygons: 'all polygons',
    noselectionPolygon: 'no polygon selected'
  },

  acronyms: {
    windowtitle:'Explanation of Acronyms as used in export tables',
    printtitle: 'WUEMoCA Acronym Explanations',
    acronym: 'Acronym',
    name: 'Name',
    crops: 'Crop information',
    additional : 'Additional parameters',
    croptypes : 'Crop types {crop}',
    allcroptypes : 'each crop',
    cwr: 'cotton, wheat, rice',
    indicators : 'Indicator group',
    description: 'Description',
    _and: 'and',
    RS:  'RS = based on remote sensing data',
    stats:  'stats. = based on statistical data',
    ET:  'ET = based on evapotranspiration'
  },

  timeSlider: {
    title                   : 'Selected year: ',
    startAnimation          : 'Start time animation',
    stopAnimation           : 'Stop time animation'
  },

  popup: {
    measure                 : 't/ha',
    avgYear                 : 'years (averagely)<br>within',
    rasterOblast            : 'Raster cell in Province (oblast)',
    h                       : 'height',
    m                       : 'm'
  },

  wue: {
    windowTitle             : 'Water Intake Form (insert values in Mio. m³)',
    btnSubmit               : 'Calculate<br>Irrigation Efficiency',
    calculateVir: 'Calculate Irrigation Efficiency',
    calculateVirSuccess: 'Irrigation Efficiency calculated successfully!<br>Download selected polygon to get monthly and ' +
                          'decadal results.' ,
    aggregateETact: 'Aggregate monthly and decadal ET<sub>act</sub> for ',
    btnImport1               : 'Import',
    btnImport2               : 'Excel file',
    tooltipImport               : 'Browse for Excel file with water intake values',
    btnImportTemplates      : 'Excel templates for import',
    tooltipImportTemplates: 'Select an Excel template for water intake values, and store it locally on your computer',
    byDecade                : 'by decade',
    byMonth                 : 'monthly',
    byYear                  : 'yearly',
    year                    : 'Year',
    decade                  : 'Decade',
    month                   : 'Month',
    resetForm: 'Clear water intake form<br>(delete all yearly, monthly and decadal values)',
    calculateSums: 'Calculate monthly and yearly sums<br>(original values are overwritten)'
    //pressWUE: 'Press "Calculate WUE" and insert Water intake'
  },

   polygon: {
    showPolygon             : 'User polygon<br>Toolbox',
    showPolygonLong             : 'User polygon Toolbox',    
    showPolygons: "Open 'User polygon Toolbox'",
    hidePolygons:    "Exit 'Toolbox'", 
    userPolygons: 'User polygons',
    notPressed              : 'Polygon drawing mode',
    pressed                 : 'Exit polygon drawing mode',
    exportPressed           : 'Report mode',
    chartPressed            : 'Chart mode',
    removeAll               : 'Remove all polygons',
    removeSel               : 'Remove selected polygon',

    activate                : 'Draw Polygon',
    deactivate              : 'Stop drawing',
    upload                  : 'Upload Shapefile',
    calculateWUE            : 'Calculate<br>Irrigation efficiency',
    calculateWUE2            : 'Calculate Irrigation efficiency',
    calculateWUElong            : 'Calculate Irrigation efficiency by inserting Water intake',
    download                  : 'Download<br>Polygon(s)',
    calculateProd            : 'Calculate<br>Productivity',
    calculateProd2            : 'Calculate Productivity',
    calculateProdlong            : 'Calculate productivity indicators',
    calculateLoss         : 'Calculate<br>Yield Loss',
    calculateLosslong     : 'Calculate Yield Loss',

    edit                    : 'Edit Name',
    calculate               : 'Calculate<br>Indicators',
    progressTitle : 'Calculate Indicators',
    progressMsg1: 'Aggregate values to',
    progressMsg2single: 'polygon...',
    progressMsg2multi: 'polygons...',
    success : 'Indicators calculated successfully!',
    failure: 'Indicator calculation failed',
    largearea: ' due to large area',
    alreadyCalculated: 'Indicators already calculated!',
    partlyCalculated: 'Indicator calculation failed or is invalid for some polygons.',
    calculation_message: 'Do you want to calculate indicators for the selected polygon?',
    exportExcel: 'Export to EXCEL',
    tooltip: 'Selected polygon',
    pressCalculate: 'First press Calculate Indicators!',
    shift: 'Select a single polygon or multiple polygons with SHIFT key',
    uploadAlert: 'Select a zipped Polygon Shapefile with coordinate system WGS 84.\nIndicators are calculated automatically ' +
                'after uploading.',
    list: 'Polygon list',
    doubleclick:'Doubleclick for zoom',
    name:'Name',
    tools:'Tools',
    showChart: 'Show diagram',
    remove:'Remove',
    sortAscText: 'Sort Ascending',
    sortDescText: 'Sort Descending',
    sortClearText: 'Clear Sort',
    selectgeodata: 'Select geodata format',
    drawTooltip: 'Draw a polygon within the irrigated area.<br>Indicators are calculated automatically after drawing.',
    smallerThan30ha_single: 'Attention: Irrigated area is smaller than 30 ha, results might not be valid!',
    smallerThan30ha_multi: 'Attention: Irrigated area of some polygons is smaller than 30 ha, results might not be valid!',
    outside: 'Polygons outside the irrigated area cannot be processed.',
    import_button_1: 'Import',
    import_button_2: 'map unit',
    import_tooltip: "Transfer the selected map unit to 'User Polygon Toolbox' in order to calculate indicators",
    removed_single: 'has been removed.',
    removed_multi: 'have been removed.',
    exist_already: 'Name does already exist',
    transfer_anyway: 'is already in the Polygon list.<br>Transfer it anyway?'
  },

  exportUI: {
    title                   : 'Polygon edit',
    inputName               : 'Name',
    inputLocation           : 'Location/Description',
    totalArea: 'Total area',
    inputCrop               : 'Select crop',
    inputPeriod             : 'Select period',
    inputYear               : 'Select year',
    inputIndicator            : 'Select map type',
    inputOutput             : 'Select output',
    btnCancel               : 'Cancel',
    btnSubmit               : 'Save'
  },

  period: {
    current                 : 'Current year',
    last                    : 'Last year',
    list                    : 'List of years',
    all                     : 'All available years'
  },

  output: {
    table                   : 'Table',
    chart                   : 'Chart'
  },

  location_placeholder:{
    text                    : 'Enter a location (Province, District or city)'
  },
  filter_checkbox : {
    label                   : 'show only'
  },

  month: {
    m1:                      'Jan',
    m2:                      'Feb',
    m3:                      'Mar',
    m4:                      'Apr',
    m5:                      'May',
    m6:                      'Jun',
    m7:                      'Jul',
    m8:                      'Aug',
    m9:                      'Sep',
    m10:                     'Oct',
    m11:                     'Nov',
    m12:                     'Dec'
  },
  decade: {
    1:                      'First decade of month',
    2:                      'Second decade of month',
    3:                      'Third decade of month'
  },

  loss: {
    title: 'Yield loss calculation',
    btnSubmit: 'Calculate Yield loss',
    indicator: 'Indicator',
    tab1: 'Input Data',
    tab2: 'Results',
    unit: 'Unit',
    formula: 'Formula',
    log: 'Log',
    alias: 'Variable',
    status: 'Saving user input, calculating ETa and other data...',
    fromServerTitle: 'Warning',
    fromServerText: 'Please fill in other indicators.<br/>ETa calculated on the WUEMoCA server, user input is not provided.',
    exportXls: 'Export',
    importXls: 'Import'
  }
};

switch (locale){
  case 'ru':
    i18n.prod = {
      btnSubmit: 'Расчитать продуктивность',
      windowTitle: 'Форма продуктивности',
      tab1: 'Ввод параметров по с/х культуам',
      tab2: 'Ввод других параметров',
      fulldata: 'Просьба представить полные годовые данные для всех встречающихся культур!',
      userinput: 'Пользовательский ввод необходим для расчета продуктивность.<br>Предварительно заполненные значения берутся из базы данных WUEMoCA.',
      calculateProd: 'Рассчитать продуктивность',
      calculateProdSuccess: 'Расчет продуктивность успешно!',
      delete_all: 'удалить все значения',
      values: ''
    };

    i18n.yesno = {
      yes: 'да',
      no: 'нет'
    };

    i18n.header = {
      wuemoca_long          : 'Мониторинг эффективности водопользования в Центральной Азии',
      cawa_homepage         : 'Домашняя страница проекта CAWa',
      cawa_website          : 'http://www.cawa-project.net/ru/',
      introwindow: 'Страница<br>Приветствия',
      ffo_homepage           : 'Федеральное министерство иностранных дел Германии',
      ffo_website            : 'http://www.auswaertiges-amt.de/EN/Startseite_node.html',
      wuemoca_about         : 'О WUEMoCA',
      details               : 'Детали',
      questionnaire         : 'Анкета для пользователя',
      questionnaire_url     : 'https://de.surveymonkey.com/r/39HV63P',
      feedback              : 'Обратная связь',
      about                 : 'Информация',
      contact               : 'Контакты',
      responsible           : 'ответственные лица',
      faq                   : 'Часто задаваемые вопросы',
	    help                    : 'Помощь и информация',
	    imprint               : 'Выходные данные и Источники данных',
	    manual                  : 'Руководство пользователя',
	    faq                     : 'Часто задаваемые вопросы',
	    glossary                : 'Глоссарий',
      //readmore: 'Нажмите, чтобы узнать подробнее',
            readmore: '',
      uniwue                : 'Проект CAWa кафедра дистанционного зондирования в Университете Вюрцбурга',
      sic: 'НИЦ МКВК',
      sicurl: 'http://sic.icwc-aral.uz/index.htm',
      beta: 'Бета-версия',
      video_general: 'Видеоинструкция - Общая информация',
    cawa_report: 'Отчет по проекту WUEMoCA',
    cawa_report_tooltip: 'Фаза III проекта CAWa (2015-2017 гг.) рабочие пакеты 3',
    overview: 'Обзор показателей'
    };

    i18n.pilot = {
      text                  : 'Фильтр пилотных объектов (УЗБ)',
      tooltip               : 'Выбор пилотного объекта'
    };

    i18n.fergana = {
      text                  : 'Ферганская область',
      tooltip               : 'Масштабировать до Ферганской области'
    };
    i18n.khorezm = {
      text                  : 'Хорезмская область',
      tooltip               : 'Масштабировать до Хорезмская области'
    };
    i18n.dargom = {
      text                  : 'Даргом УИС',
      tooltip               : 'Масштабировать до Даргом УИС'
    };

    i18n.filter = {
      title                 : 'Управление картой'
    };

    i18n.report = {
      generate_button              : 'Получить отчет',
      generate_window              : 'Получить отчет',
            btnTooltip1:'Показать выбор показателей в виде отчета в формате статистики',
            btnTooltip2:'Внимание: WUEMoCA не предоставляет точно такие же показатели,<br>которые обычно включаются в статистику,<br>поэтому не все поля заполнены.',   
      year                  : 'Выбрать год',
      selectCountry: 'Выбрать страну',
      selectOblast: 'Выбрать область',
      selectBUIS: 'Выбрать БУИС',
      btnSubmit             : 'Вывести',
      cropPattern           : 'Размещение с/х культур',
      grossHarvest           : 'Валовый сбор',
      cropYield             : 'Урожайность',
      titlePattern          : 'Размещение с/х культур на орошаемых землях за вегетацию по {object} {year}',
      titleHarvest          : 'Валовый сбор по с/х культур на орошаемых землях по {object} {year}',
      titleYield            : 'Урожайность по с/х культур на орошаемых землях по {object} {year}',
      alert: 'Select oblast or BUIS!',
      nameUisTH                : 'Объекты (УИС и районы)',
      nameRayonTH                : 'Объекты (районы)',
      fir_bTH                : 'Орошаемая площадь, брутто',
      firnTH                : 'Орошаемая площадь, нетто',
      industrialTH           : 'Технические культуры',
      totalTH               : 'Всего',
      cottonTH              : 'в т.ч Хлопок',
      grainTH               : 'Зерновые',
      wheatTH               : 'в т.ч Пшеница',
      vegTH                 : 'Овощи и бахча',
      fodderTH              : 'Кормовые',
      perennialTH           : 'Многолетные насаждения',
      orchardTH             : 'фрукты',
      grapesTH              : 'Винограды',
      homesteadTH           : 'Приусадебные',
      otherTH               : 'Прочие',
      riceTH                : 'Рис',
      fallowTH              : 'Неиспол.земли',
      haTH                  : 'га',
      tnTH                  : 'тонна',
      thaTH                 : 'т/га',
      footer1               : '*Хлопок, масленистые, табак',
      footer2               : '**Пшеница, кукуруза на зерно'

    };


    i18n.adminFilters = {
      title                 : 'Выбрать территорию<br>(необязательно)',
      title_userPolygon                   : 'Масштабировать до территории',
      country               : 'Страна',
      country_empty:'Бассейн Аральского моря',
      oblast                : 'Область',
      oblast_empty:'Выберите область',
      rayon                 : 'Район',
      rayon_empty:'Выберите район',
    rayonsearch                   : 'поиск района',
    rayonsearch_empty             : 'введите имя район',        
      buis                  : 'БУИС',
      buis_empty:'Выберите БУИС',
      uis                   : 'УИС',
      uis_empty:'Выберите УИС',
      wua                     : 'или АВП',
      wua_empty:'введите имя АВП',
      oblastBtnText         : 'Показатьy<br>обл.карту',
      rayonBtnText          : 'Показать<br>р-н карту',
      uisBtnText            : 'Показать<br>УИС карту',
      buisBtnText           : 'Показать<br>БУИС карту',
      wuaBtnText            : 'Показать<br>АВП карту',
      oblastBtnTooltip      : 'Агрегировать до области',
      rayonBtnTooltip       : 'Агрегировать до района',
      uisBtnTooltip         : 'Агрегировать до УИСа',
      buisBtnTooltip        : 'Агрегировать до БУИСа',
      wuaBtnTooltip         : 'Агрегировать до АВП',
    _or: 'ИЛИ',
      reset:'сброс<br>фильтра',
      selected_indicator: 'Выбранный индикатор',
      is_shown_as: 'отображается как',
      change_of_aggreg: 'Изменение уровня агрегации',
      zoom_to_selected: 'Масштабировать до выбранного',
    is_not_available_as: 'не доступен как'


    };
i18n.mapSelection ={
   title       :'Слои',
      reset:'сброс<br>настроек',
          collapse: 'Свернуть',
    expand: 'Развернуть'
};

    i18n.unit = {
      label                 : 'Выберите тип единиц',
      admin                 : 'Админиcтративные объекты',
      water                 : 'Объекты водопользователей',
      natural               : 'Еcтеcтвенные объекты',
      grid                  : 'Регулярный растр',
      polygon               : 'Полигон пользователя'
    };

    i18n.aggreg = {
    label: function(aggreg_name){
      return i18n.aggreg.label2 + ' ' + aggreg_name;
    },      
    label1                   : 'Выбрать',
    label2                   : 'Уровень агрегирования',      
    map                     : function(aggreg_index){
      switch(aggreg_index){
        case 'oblast':
          return 'Карта области';
          break;
        case 'rayon':
          return 'Карта района';
          break;
        case 'grid':
          return 'Карта регулярного растра';
          break;  
        case 'buis':
          return 'Карта БУИС';
          break;
        case 'uis':
          return 'Карта УИС';
          break;
        case 'wua':
          return 'Карта АВП';
          break; 
        case 'command':
          return 'Карта подкомандной зоны канала';
          break;          
      }
    }
    };
    i18n.indicator = {
      label                 : 'Выбрать показатель',
      filter                : 'Активировать фильтр для списка индикаторов',
          _of: ',',
              leftPanel: 'Выберите индикатор на левой стороне.'
    };

    i18n.crop = {
      label                 : 'Выбрать с/х культуру:'
    };
    i18n.yield_classes = {
      verylow               : 'очень низкая',
      low                   : 'низкая',
      medium                : 'средняя',
      high                  : 'высокая',
      veryhigh              : 'очень высокая'
    };
      i18n.vc_classes = {
            less                 : 'меньше воды',
    equal                     : 'сбалансированный',
    more                  :  'много воды'

  };

    i18n.settings = {
      legend                : 'Условные обозначения',
    title                   : 'Слои карт',
    extent                  : 'Орошаемая площадь',
    showLegend: 'Показать легенду',
    hideLegend: 'Скрыть легенду'
      //title                 : 'Условные обозначения карты',
      //extent                : 'Максимальная площадь орошения'
    };

    i18n.map = {
      title                 : 'Обзорная карта',
      onSatellite            : 'Переключиться<br>на спутниковую карту',
      offSatellite          :'Переключиться<br>на обычную карту',
      omap                  : 'Показать Open Street Map'
    };

    i18n.chart = {
      title                 : 'График',
      png                   : 'График как PNG',
      allYear               : 'все доступные года',
      _in                   : ' в ',
      no: '',
      thousand: 'тысяча ',
      million: 'млн ',
      multiannualHeader1          : 'Многолетний анализ',
      multiannualHeader2          : '(одна ячейка = 5км x 5км)',
      noChart    : 'Нет диаграмма для',
      sumDoubleFallow: 'Все культуры включают второй сезон, без неиспользуемых земель',
      calculate_indicators: 'Рассчитать показатели',
      transfer: 'Перенос',
      toMyPolygons: "в 'Инструмент полигона'",
      showCropPrices: 'Показать цены на урожай',
      legendNotIncluded: 'Легенда диаграммы не включена',
      title_nodata: 'Требуется ввод пользователя',
      nodata: 'Просьба представить статистические данные',
      nodata2: 'для расчета',
      prevIndicator: 'Показать предыдущий годовой индикатор',
      nextIndicator: 'Показать следующий годовой индикатор'
    };

    i18n.exp = {
      title                 : 'Экспорт и отчет',
      opts                  : 'Варианты скачивания',
      tableCsv              : 'Таблица как CSV',
      tableExcel              : 'Таблица как EXCEL',
    indicatorAcronym: 'индикатор акроним',
    indicatorName: 'Индикатор',
    cropAcronym: 'культурой акроним',
    cropName: 'культура',
      reportPdf             : 'Отчет как .pdf',
      selectWUAs            : 'Выберите АВП',
      selectRayons          : 'Select rayon',
      selectCrop            : 'Выберите культуру',
      selectIndicator         : 'Выбрать показатель',
      singleWUA             : 'один АВП',
      allWUAsRayon          : 'все АВП района',
      allWUAsOblast         : 'все АВП области',
      selectedWUAs          : 'выбранные АВП',
      singleRayon           : 'single rayon',
      allRayonsOblast       : 'all rayons of oblast',

      selectOblasts         : 'Выберите область',
      singleOblast          : 'единая область',
      allOblastsCountry     : 'все области страны',
      allOblastsCA : 'все области центральной азии',
                download: 'Скачать',
                        download2: 'Скачать карту или таблицу',
          asSHP: 'как SHP',
          filtered: 'фильтруют',
          tooltipSHP1: '',

          tooltipSHP2: 'промелькнутое Shapefile с будут созданы все значения показателей всех лет',
          map: 'карту',
          table: 'таблица',
          mapOrTable : '',
          btnTooltip1: 'Скачать карту или таблицу показателей по уровню агрегирования',
          btnTooltip2: '. Выберите фильтр, формат, год (ы) и индикатор (ы).',
          selectFilter: 'Выбрать фильтр',
          selectOutput: 'Выберите формат вывод',
          download: 'Скачать',
          nofilter: 'Фильтр территории не активирован',
          noselection1: 'нет',
          noselection2: 'выбран (на карте)',
          selected: 'выбранные',
          conjunction: ' ',
                    all: 'все',
                    plural: function(){
                            switch(App.service.Watcher.getAggregation()['id']){
                              case 'oblast':
                                return 'области';
                                break;
                              case 'rayon':
                                return 'районы';
                                break;
                              case 'grid':
                                return 'регулярные растры';
                                break;  
                              case 'buis':
                                return 'БУИС';
                                break;
                              case 'uis':
                                return 'УИС';
                                break;
                              case 'wua':
                                return 'АВП';
                                break; 
                              case 'command':
                                return 'подкомандной зоны канала';
                                break;          
                            }
                    },
                              ASB: ' БАМ',
                    acronym: 'Пояснение<br>обозначений',

              allpolygons: 'все полигоны',
              noselectionPolygon: 'полигон не выбран'

    };
    i18n.acronyms = {
      windowtitle:'Расшифровка сокращений из экспортных таблиц',
      printtitle: 'WUEMoCA Расшифровка сокращений',
      acronym: 'Акроним',
      name: 'название',
      crops: 'Информация по культурам',
      additional : 'Дополнительные параметры',
      croptypes : 'культура {crop}',
      allcroptypes : 'По отдельной культуре',
      cwr: 'хлопок, рис, пшеница',
      indicators : 'Группа показателей',
      description: 'Описание',
      _and: 'и',
      RS:  'ДЗ = основывается на данных дистанционного зондирования',
      stats:  'статс. = по статистическим данным',
      ET:  'ЭТ = основанный на эвапотранспирации'

    };

    i18n.timeSlider = {
      title                 : 'Выбранный год: ',
      startAnimation        : 'Начать анимацию во времени',
      stopAnimation         : 'Остановить анимацию во времени'
    };

    i18n.popup = {
      measure               : 'т/га',
      avgYear               : 'лет (в среднем)<br>в пределах',
      rasterOblast          : 'Растровые',
      h                     : 'высота',
      m                     : 'м'
    };

    i18n.wue = {
      windowTitle             : 'Форма ввода водоподачи (Вставить значения в млн куб.м)',
      btnSubmit               : 'Рассчитать<br>эффективность орошения',
      calculateVir     : 'Рассчитать эффективность орошения',
      calculateVirSuccess     : 'Эффективность орошения рассчитана успешно!<br>Загрузите выбранный полигон, чтобы получить результаты за месяц и декаду.' ,
      aggregateETact          : 'Совокупный месячный и десятилетний ЭТ<sub>факт</sub> за ',
      btnImport1              : 'Импорт',
      btnImport2              : 'Файл Excel',
      tooltipImport           : 'Найдите файл Excel со значениями водозабора',
      btnImportTemplates      : 'Шаблоны для импорта',
      tooltipImportTemplates  : 'Выберите шаблон Excel, чтобы импортировать значения и сохранить его локально на вашем компьютере',
      byDecade                : 'по декаде',
      byMonth                 : 'по месяцам',
      byYear                  : 'по годам',
      year                    : 'Год',
      decade                  : 'Декада',
      month                   : 'Месяц',
          resetForm: 'Форма для приема чистой воды<br>(удалите все годовые, месячные и десятилетние значения)',
    calculateSums: 'Рассчитать месячные и годовые суммы<br>(исходные значения перезаписываются)'
      //pressWUE                : 'Press "Calculate WUE" and insert Water intake'
    },

    i18n.polygon = {
          showPolygon             : 'Инструмент<br>полигона пользователя',
                    showPolygonLong             : 'Инструмент полигона пользователя',
          showPolygons: "Открыть 'Инструмент полигона пользователя'",
      hidePolygons:    "Выход из 'Инструментарий'",
            userPolygons: 'Полигоны пользователя',
      notPressed            : 'Режим рисования полигонов',
      pressed               : 'Выйти из режима рисования полигонов',
      exportPressed         : 'Режим экспорта',
      chartPressed          : 'Режим графика',
      removeAll             : 'Удалить все полигоны',
      removeSel             : 'Удалить выбранный полигон',

      activate              : 'Нарисовать<br>полигон',
      deactivate            : 'Прекратить<br>рисование',
      upload                : 'Загрузить<br>Shapefile',
      calculateWUE          : 'Рассчитать эффек-<br>тивность орошения',
      calculateWUE2          : 'Рассчитать эффективность орошения',
calculateWUElong          : 'Рассчитать Индекс<br>эффективность орошения',
              download                  : 'Скачать<br>полигон(ы)',
      calculateProd         : 'Рассчитать<br>продуктивность',
      calculateProd2        : 'Рассчитать продуктивность',
      calculateProdlong     : 'Рассчитать продуктивность',
      calculateLoss         : 'Рассчитать<br>потерь урожайности',
      calculateLosslong     : 'Рассчитать потерь урожайности',
      edit                  : 'Редактировать',
      calculate             : 'Рассчитать<br>индикатора',
      progressTitle : 'Рассчитать индикатора',
          progressMsg1: 'Суммарные значения до',
          progressMsg2single: 'полигона...',
          progressMsg2multi: 'полигонов...',
                progressMsg: 'Агрегат для полигонов...',
                failure: 'Расчет индикатора не удалось',
                largearea: ' из-за большой площади',
                success : 'Индикаторы рассчитываются успешно!',
                alreadyCalculated: 'Индикаторы уже подсчитали!',
                partlyCalculated: 'Расчет индикатора не удалось для некоторых полигонов.',
                          calculation_message: 'Вы хотите рассчитать индикаторы для выбранного полигона?',
          exportExcel: 'Экспорт в Excel',
      remove                : 'Удалить',
    tooltip: 'Выбранный полигон',
    pressCalculate: 'сначала нажмите расчет индикатора!',
    shift: 'Выберите один или несколько многоугольник многоугольники с нажатой клавишей SHIFT',
    uploadAlert: 'Выберите промелькнутое Polygon Shapefile с системой координат WGS 84.\nIndicators are calculated ' +
                'automatically after uploading.',
    list: 'Список полигонов',
    doubleclick:'Двойной щелчок для увеличения',
    name:'Название',
    tools:'Инструменты',
    showChart: 'Показать диаграмма',
    sortAscText: 'Сортировать по возрастанию',
    sortDescText: 'Сортировка по убыванию',
    sortClearText: 'Очистить Сортировать',
    selectgeodata: 'Выберите формат геоданных',
    drawTooltip: 'Нарисуйте многоугольник на орошаемой территории. Показатели рассчитываются автоматически после нанесения.',
        smallerThan30ha_single: 'Внимание: площадь орошаемых земель меньше 30 га, результаты могут быть недействительными!',
        smallerThan30ha_multi: 'Внимание: площадь орошения некоторых полигонов меньше 30 га, результаты могут быть недействительными!',
        outside: 'Полигоны за пределами орошаемой площади не могут быть обработаны.',
        import_button_1: 'Импортировать',
        import_button_2: 'map unit',
        import_tooltip: "Перенесите выбранный блок карты в «полигоны Инструментарий», чтобы рассчитать дальнейшие показатели.",
        removed_single: 'был удален.',
        removed_multi: 'были удалены.',
    exist_already: 'Объект с таким именем уже существует',
    transfer_anyway: 'уже существует в списке полигонов.<br>Все равно продолжить?'
    };

    i18n.exportUI = {
      title                 : 'Редактирование полигона',
      inputName             : 'Наименование',
      inputLocation         : 'Расположение/Описание',
      totalArea: 'Total area',
      inputCrop             : 'Выберите культуру(ы)',
      inputPeriod           : 'Выберите период',
      inputYear             : 'Выбрать год',
      inputIndicator          : 'Выбрать показатель',
      inputOutput           : 'Выберите вывод отчета',
      btnCancel             : 'Отмена',
      btnSubmit             : 'Сохранить'
    };

    i18n.period = {
      current               : 'Текущий год',
      last                  : 'Прошлый год',
      list                  : 'Выбрать из списка',
      all                   : 'Все доступные'
    };

    i18n.output = {
      table                 : 'Таблица',
      chart                 : 'График'
    };

  i18n.location_placeholder = {
    text                    : 'Введите расположение (обл., р-н, город)'
  };
  i18n.filter_checkbox = {
    label                   : 'показывать только'
  };

  i18n.month = {
    m1:                      'Янв',
    m2:                      'Фев',
    m3:                      'Мар',
    m4:                      'Апр',
    m5:                      'Май',
    m6:                      'Июн',
    m7:                      'Июл',
    m8:                      'Авг',
    m9:                      'Сен',
    m10:                     'Окт',
    m11:                     'Ноя',
    m12:                     'Дек'
  };

  i18n.decade = {
    1:                      'Первая декада месяца',
    2:                      'Вторая декада месяца',
    3:                      'Третья декада месяца'
  };

  i18n.loss = {
    title: 'Расчет потери урожайности',
    btnSubmit: 'Расчитать потери урожайности',
    indicator: 'Индикатор',
    tab1: 'Входные данные',
    tab2: 'Результаты',
    unit: 'Ед.изм.',
    formula: 'Формула',
    log: 'Ход выполнения',
    alias: 'Переменная',
    status: 'Идет сохранение пользовательского ввода, расчет ETa и других данных...',
    fromServerTitle: 'Предупреждение',
    fromServerText: 'Пожалуйста заполните другие показатели.<br/>ETa рассчитывается на сервере WUEMoCA, пользовательский ввод не предусмотрен.',
    exportXls: 'Экспорт',
    importXls: 'Импорт'
  }
  break;
}
