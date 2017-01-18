window.locales = ['en', 'ru'];
window.localesText = {
  en: 'Switch to<br>English',
  ru: 'Переключиться<br>на Русский'
};
window.locale = localStorage.getItem('locale') || 'en';
window.nextLocale = function () {
  if (locales.indexOf(locale) == locales.length - 1) return locales[0];
  return locales[locales.indexOf(locale) + 1];
};

var i18n = {

  info : {
    title                   : 'Information',
    text                    : 'WUEMoCA is an online tool for regional assessments of water use efficiency in all extensive downstream irrigation systems of the transboundary Aral Sea Basin. In the first phase it provides information about crop yields of the major crops, i.e. cotton, rice, and wheat, based on free-of-charge accessible remote sensing (MODIS 250m) and meteorological data aggregated at different scales ranging from WUAs (Water User Associations), districts (rayons) to irrigation planning zones, and provinces (oblasts).'

  },

  header: {
    wuemoca_long            : 'Water Use Efficiency Monitor in Central Asia',
    cawa_homepage           : 'CAWa project homepage',
    introwindow             : 'Intro<br>Window',
    cawa_website            : 'http://www.cawa-project.net/portal/cms/CAWa',
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
    impressum               : 'Imprint',
    manual                  : 'User Manual',
    faq                     : 'Frequently asked questions',
    glossary                : 'Glossary',
    readmore: 'Read more about',
    uniwue                  : 'CAWa project at Department of Remote Sensing at University of Wuerzburg',
    sic: 'SIC ICWC'
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

  area: {
    label                   : 'Select Irrigated Area',
    empty                   : 'Aral Sea Basin'
  },

  filter: {
    title                   : 'Map Controls'
  },

  report: {

      generate_button              : 'Generate<br>Report',
            generate_window              : 'Generate Report',  
    year                    : 'Select year',
      selectCountry: 'Select country',
      selectOblast: 'Select province',
      selectBUIS: 'Select BISA',    

    btnSubmit               : 'Generate',
    typePattern             : 'Irrigation crop patterns',
    typeHarvest             : 'Gross harvest',
    typeYield               : 'Irrigation crop yields',

    titlePattern            : 'Irrigation crop patterns in {object}, growing season {year}',
    titleHarvest            : 'Gross harvest Irrigation fields in {object} {year}',
    titleYield              : 'Irrigation crop yields in {object} {year}',
    alert: 'Select province or BISA!',

      nameUisTH                : 'Site (ISA and district)',
      nameRayonTH                : 'Site (district)',     
      fir_bTH                : 'Irrigation area, gross',
      fir_nTH                : 'Irrigation area, net',
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
    country                 : 'Country',
    country_empty           : 'Aral Sea Basin',
    oblast                  : 'Province',
    oblast_empty            : 'Select province',
    rayon                   : 'District',
    rayon_empty             : 'Select district',
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
    _or: 'OR',
          reset:'reset<br>filter'
  },
mapSelection:{
   title       :'Maps',
          reset:'reset<br>selections'
},
  rayon: {
    label                   : 'District Filter (multiple choice)',
    empty                   : 'all Districts of irrigated area'
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
    label                   : 'Select aggregation level',
    grid                    : 'regular Raster',
    gridShort               : 'reg. Raster',
    segment                 : 'Elevation Zone',
    segmentShort            : 'Elev. Zone',
    rayon                   : 'District (rayon)',
    rayonShort              : 'District',
    rayon4name              : 'District ',
    oblast                  : 'Province (oblast)',
    oblastShort             : 'Province',
    subbasin                : 'River Subbasin',
    subbasinShort           : 'Subbasin',
    wua                     : 'WUA (Water User Association)',
    wuaShort                : 'WUA',
    buis                    : 'BISA (Basin Irrig. System Admin.)',
    buisShort               : 'BISA',
    uis                     : 'ISA (Irrigation System Admin.)',
    uisShort                : 'ISA',
    command                 : 'Channel Command Area',
    commandShort            : 'Comm. Area',
    map                     : 'Map'
  },
  indicator: {
    label                   : 'Select indicator',
    fir_n                    : 'Irrigated land area (net)',
    firf                    : 'Irrigated crop acreage',
    uir                    : 'Irrigated land use (per crop)',
    pirf                    : 'Farm gross output actual',
    y                   : 'Yield',
    fp                  : 'Unused irrigated land',
    mlu                : 'Major land use',
    cd               : 'Crop rotation',
    flf               : 'Fallow land frequency',
    filter                  : 'Activate filter for indicator list',
    leftPanel: 'Select indicator on the left side.',
    _of: 'of'
  },

  crop: {
    label                   : 'Select crop type:',
    cotton                  : 'Cotton',
    rice                    : 'Rice',
    wheat                   : 'Wheat',
    fallow                  : 'Fallow',
    'double'                : 'Double Season',//for majority needed
    other                   : 'Other crop',
    veg                     : 'Vegetable',
    orchard                 : 'Orchard/Vineyard',
    maize                   : 'Maize',
    garden                  : 'Urban Garden',
    sun                     : 'Sunflower',
    sum                     : 'All crops'
  },
  yield_classes: {
    verylow                 : 'very low',
    low                     : 'low',
    medium                  : 'medium',
    high                    : 'high',
    veryhigh                : 'very high'
  },

  layer: {
    maxIrrigDescr           : 'The maximum extent of irrigated land as it could be observed with satellite images from 2001 to 2012',
    overallDescr            : 'Remote Sensing products based on free-of-charge accessible data (MODIS 250m).',
    yieldDescr              : function (crop_index, aggreg_index) {
      if (crop_index == 'wheat'){
        class1 = wheat_class1;
        class2 = wheat_class2;
        class3 = wheat_class3;
        class4 = wheat_class4;
        class5 = wheat_class5;
        class6 = wheat_class6;
        class7 = wheat_class7;
      }
      else if (crop_index == 'cotton'){
        class1 = cotton_class1;
        class2 = cotton_class2;
        class3 = cotton_class3;
        class4 = cotton_class4;
        class5 = cotton_class5;
        class6 = cotton_class6;
        class7 = cotton_class7;
      } else {
        return '';
      }
      return '<br>The map shows the yield of ' + i18n.crop[crop_index] + ' (tons per hectare) classified in seven classes:<br>- (' + class6 + ' - ' + class7 + ' t/ha) high<br>- (' + class5 + ' - ' + class6 + ' t/ha)<br>- (' + class4 + ' - ' + class5 + ' t/ha)<br>- (' + class3 + ' - ' + class4 + ' t/ha) medium<br>- (' + class2 + ' - ' + class3 + ' t/ha)<br>- (' + class1 + ' - ' + class2 + ' t/ha)<br>- (0.01 - ' + class1 + ' t/ha) low<br>in the respective unit (' + i18n.aggreg[aggreg_index + 'Short'] + ').';
    },
    landuseDescr            : function (crop_index, aggreg_index) {
      return '<br>The map shows the percentage share of ' + i18n.crop[crop_index] + ' on the irrigated land (incl. temporarily fallow land) in the respective unit (' + i18n.aggreg[aggreg_index + 'Short'] + '). Permanent unused land is not considered.';
    },
    frequencyDescr          : function (min_year, max_year, crop_index, aggreg_index) {
      return '<br>The map shows the mean number of years within ' + min_year + ' and ' + max_year + ' in which ' + i18n.crop[crop_index] + ' (temporarily unused) occurs in the respective unit (' + i18n.aggreg[aggreg_index + 'Short'] + '). Permanent unused land is not considered.';
    }
  },

  settings: {
    legend: 'Legend',
    title                   : 'Map Legend',
    opacity                 : 'set opacity',
    layerInfo               : 'get layer info',
    layerPng                : 'this layer as .png',
    extent                  : 'Maximum irrigation extent',
    fir_n_nocrops            : 'Irrigation area in ha',
    firf_cotton             : 'Cotton in ha',
    firf_wheat              : 'Wheat in ha',
    firf_rice               : 'Rice in ha',
    firf_other              : 'Other crop in ha',
    firf_orchard            : 'Orchard/Vineyard in ha',
    firf_garden             : 'Urban garden in ha',
    firf_maize              : 'Maize in ha',
    firf_veg                : 'Vegetable in ha',
    firf_sun                : 'Sunflower in ha',
    firf_sum                : 'Sum of crops in ha',
    uir_sum                : 'Net used land in %',
    uir_wheat              : 'Wheat in %',
    uir_rice               : 'Rice in %',
    uir_cotton             : 'Cotton in %',
    uir_other              : 'Other Crop in %',
    uir_orchard            : 'Orchard/Vineyard in %',
    uir_garden             : 'Urban Garden in %',
    uir_maize              : 'Maize in %',
    uir_veg                : 'Vegetable in %',
    uir_sun                : 'Sunflower in %',
    pirf_wheat              : 'Wheat in t',
    pirf_cotton             : 'Cotton in t',
    y_wheat             : 'Wheat in t/ha',
    y_cotton            : 'Cotton in t/ha',
    fp_nocrops          : 'Fallow in %',
    flf_nocrops       : 'Years of fallow',
    mlu_nocrops        : 'Predominant crop type',
    cd_nocrops       : 'Number of crop types'
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
    backbtn                 : 'back (year)',
    forwardbtn              : 'forward (year)',
    allYear                 : 'all available years',
    measure                 : 't/ha',
    _in                     : ' in ',
    raster                  : 'Raster cell',
    shareCrops              : 'share (%)',
    y                   : 'yield (t/ha)',
    multiannualHeader1          : 'Multiannual analysis',
    multiannualHeader2          : '(aggregated at 7.5km x 7.5km grid cells)',
    majorLandUse            : 'Major land use',
    cropRotation            : 'Crop rotation',
    numCrops                : 'Number of crop types',
    flf               : 'Fallow land frequency',
    yearsFallow             : 'Years of fallow',
          noChart    : 'No diagram available for'
  },

  exp: {
    title                   : 'Export',
    opts                    : 'Export selection options',
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
          asSHP: 'as SHP',
          filtered: 'filtered',
          tooltipSHP1: 'A ',
          tooltipSHP2: 'Shapefile (zipped) with all indicator values of all years will be created'
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

   polygon: {
    showPolygon             : 'My Polygons',
    notPressed              : 'Polygon drawing mode',
    pressed                 : 'Exit polygon drawing mode',
    exportPressed           : 'Report mode',
    chartPressed            : 'Chart mode',
    removeAll               : 'Remove all polygons',
    removeSel               : 'Remove selected polygon',

    activate                : 'Draw Polygon',
    deactivate              : 'Stop drawing',
    upload                  : 'Upload Polygon',
    edit                    : 'Edit Name',
    calculate               : 'Calculate<br>Indicators',
          progressTitle : 'Calculate Indicators',
          progressMsg: 'Aggregate to polygons...',
          success : 'Indicators calculated successfully!',
          failure: 'Indicator calculation failed!',    
          alreadyCalculated: 'Indicators already calculated!',      
    exportExcel: 'Export to EXCEL',
    remove                  : 'Delete Polygon',
    tooltip: 'Selected polygon',
    pressCalculate: 'First press Calculate Indicators!',
    shift: 'Select a single polygon or multiple polygons with SHIFT key',
    uploadAlert: 'Select a zipped Polygon Shapefile with coordinate system WGS 84 (EPSG:4326)'
  },

  exportUI: {
    title                   : 'Polygon edit',
    inputName               : 'Name',
    inputLocation           : 'Location',
    totalArea: 'Total area',
    inputCrop               : 'Select crop',
    inputPeriod             : 'Select period',
    inputYear               : 'Select year',
    inputIndicator            : 'Select map type',
    inputOutput             : 'Select output',
    btnCancel               : 'Cancel',
    btnSubmit               : 'Save'
  },

  exportTemplate: {
    landuseTable            : 'Landuse Table',
    landuseChart            : 'Landuse Chart',
    yieldTable              : 'Yield Table',
    yieldChart              : 'Yield Chart',
    name                    : 'Title: Document showing the information about the selected area',
    location                : 'Located in',
    sizeof                  : 'Size of',
    inha                    : 'in ha',
    area                    : 'Agricultural/irrigated area within',
    ds                      : 'Data source',
    dsDescr                 : 'e.g. “Remote Sensing products based on free-of-charge accessible data (MODIS 250m) classification, yield estimation,… The report shows the land use of Wheat, Cotton, Rice and Fallow, its percentage share of the irrigated (used) land (incl. temporarily fallow land) in the respective unit (polygon name). Permanent unused land is not considered.”',
    footer                  : 'Footer',
    footerContent           : '© 2015 Department of Remote Sensing, Würzburg University, Germany'
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
  alert: {
    ambiguous               : 'The clicked point is ambiguous, please click one unit only (maybe zoom in).'
  }
};


switch (locale){
  case 'ru':
    i18n.header = {
      wuemoca_long          : 'Мониторинг эффективности водопользования в Центральной Азии',
      cawa_homepage         : 'Домашняя страница проекта CAWa',
      cawa_website          : 'http://www.cawa-project.net/ru/portal/cms/CAWa',
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
	impressum               : 'выходные данные',
	manual                  : 'Руководство пользователя',
	faq                     : 'Часто задаваемые вопросы',
	glossary                : 'Глоссарий',
      readmore: 'Подробнее о',
      uniwue                : 'Проект CAWa кафедра дистанционного зондирования в Университете Вюрцбурга',
    sic: 'НИЦ МКВК'
    };

    i18n.pilot = {
      text                  : 'Фильтр пилотной зоны (UZB)',
      tooltip               : 'Выбор пилотной зоны'
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

    i18n.info = {
      title                 : 'Информация',
      text                  : 'WUEMoCA это онлайн инструмент для региональных оценок эффективности водопользования во всех обширных ниже оросительных систем в трансграничном бассейне Аральского моря. На первом этапе она обеспечивает информацию о урожайности в основных сельскохозяйственных культур, т.е. хлопка, риса и пшеницы, на основе свободного заряда доступны ДЗЗ (MODIS 250) и метеорологических данных, агрегированных в различных масштабах, начиная от АВП (водопользователей ассоциации), районов (районы) в зонах орошения планирования и провинций (областей).'

    };

    i18n.area = {
      label                 : 'Выберите площадь орошаемых земель',
      empty                 : 'Бассейн Аральского моря'
    };

    i18n.filter = {
      title                 : 'Поиск по карте'
    };

    i18n.report = {
      generate_button              : 'Получить<br>отчет',
            generate_window              : 'Получить отчет',
      year                  : 'Выберите год',
      selectCountry: 'Выберите Страна',
      selectOblast: 'Выберите область',
      selectBUIS: 'Выберите БУИС',
      btnSubmit             : 'Вывести',
      typePattern           : 'Размещение с/х культур',
      typeHarvest           : 'Валовый сбор',
      typeYield             : 'Урожайность',
      titlePattern          : 'Размещение с/х культур на орошаемых землях за вегетацию по {object} {year}',
      titleHarvest          : 'Валовый сбор по с/х культур на орошаемых землях по {object} {year}',
      titleYield            : 'Урожайность по с/х культур на орошаемых землях по {object} {year}',
      alert: 'Select oblast or BUIS!',
      nameUisTH                : 'Объекты (УИС и районы)',
      nameRayonTH                : 'Объекты (районы)',
      fir_bTH                : 'Орошаемая площадь, брутто',
      fir_nTH                : 'Орошаемая площадь, нетто',
      industrialTH           : 'Технические культуры',
      totalTH               : 'Всего',
      cottonTH              : 'в т.ч Хлопок',
      grainTH               : 'Зерновые',
      wheatTH               : 'в т.ч Пшеница',
      vegTH                 : 'Овощи и бахча',
      fodderTH              : 'Кормовые',
      perennialTH           : 'Многолетные насаждения',
      orchardTH             : 'Сады',
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
      title                 : 'Площадь фильтра (опционально)',
      country               : 'Страна',
      country_empty:'Бассейн Аральского моря',
      oblast                : 'Область',
      oblast_empty:'Выберите область',
      rayon                 : 'Район',
      rayon_empty:'Выберите район',
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
      reset:'сброс<br>фильтра'


    };
i18n.mapSelection ={
   title       :'карты',
      reset:'сброс<br>выбранных'
};

    i18n.rayon = {
      label                 : 'Районные фильтр (множественный выбор)',
      empty                 : 'все районы орошаемых земель'
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
      label                 : 'Выберите уровень агрегации',
      grid                  : 'Регулярный растр',
      gridShort             : 'Рег. растр',
      segment               : 'Высота зоны',
      segmentShort          : 'Выс. зоны',
      rayon                 : 'Район',
      rayonShort            : 'Район',
      rayon4name            : ' ',
      oblast                : 'Область',
      oblastShort           : 'Область',
      subbasin              : 'Река подбассейна',
      subbasinShort         : 'Подбассейны',
      wua                   : 'АВП (Ассоциация водопользователей)',
      wuaShort              : 'АВП',
      buis                  : 'БУИС (бассейн Управление ирригационной системы)',
      buisShort             : 'БУИС',
      uis                   : 'УИС (Управление ирригационной системы)',
      uisShort              : 'УИС',
      command               : 'Командная площадь',
      commandShort          : 'Ком. площ.',
      map                   : 'карту'
    };
    i18n.indicator = {
      label                 : 'Выберите тип карты',
      fir_n                  : 'Площади орошаемых земель (нетто)',
      firf                  : 'Посевные площади на орошаемых землях',
      uir                  : 'использования орошаемых земель на культуру',
      pirf                  : 'Валовая продукция фактический',
      y                 : 'Урожайность',
      fp                : 'Неиспользованный орошаемые земли',
      mlu              : 'Основные землепользования',
      cd             : 'разнообразие сельскохозяйственных культур',
      flf             : 'Частота неисп.земель',
      filter                : 'Активировать фильтр для списка индикаторов',
          _of: 'of',
              leftPanel: 'Выберите индикатор на левой стороне.'
    };

    i18n.crop = {
      label                 : 'Выберите класс культуры:',
      cotton                : 'Хлопок',
      rice                  : 'Рис',
      wheat                 : 'Пшеница',
      fallow                : 'Неиспользуемые земли',
      'double'              : 'Double Season',
      other                 : 'Другие культуры',
      veg                   : 'овощной',
      orchard               : 'фруктовый сад/виноградник',
      maize                 : 'кукуруза',
      garden                : 'Городской сад',
      sun                   : 'подсолнух',
      sum                   : 'Все зерновые культуры'
    };
    i18n.yield_classes = {
      verylow               : 'очень низкая',
      low                   : 'низкая',
      medium                : 'средняя',
      high                  : 'высокая',
      veryhigh              : 'очень высокая'
    };
    i18n.layer = {
      maxIrrigDescr         : 'Максимальная протяженность орошаемых земель, наблюдаемая на спутниковых снимках с 2001 по 2012',
      overallDescr          : 'Продукт дистанционного зондирования, основанный на free-of-charge доступных данных(MODIS 250m)',
      yieldDescr            : function (crop_index, aggreg_index) {
        if (crop_index == 'wheat'){
          class1 = wheat_class1;
          class2 = wheat_class2;
          class3 = wheat_class3;
          class4 = wheat_class4;
          class5 = wheat_class5;
          class6 = wheat_class6;
          class7 = wheat_class7;
        }
        else if (crop_index == 'cotton'){
          class1 = cotton_class1;
          class2 = cotton_class2;
          class3 = cotton_class3;
          class4 = cotton_class4;
          class5 = cotton_class5;
          class6 = cotton_class6;
          class7 = cotton_class7;
        } else {
          return '';
        }

        return '<br>Карта показывает урожайность ' + i18n.crop[crop_index] + '  (тонн на гектар) классифицированную в семь классов:<br>- высокая (' + class6 + ' - ' + class7 + ' t/ha)<br>- (' + class5 + ' - ' + class6 + ' t/ha)<br>- (' + class4 + ' - ' + class5 + ' t/ha)<br>- средняя (' + class3 + ' - ' + class4 + ' t/ha)<br>- (' + class2 + ' - ' + class3 + ' t/ha)<br>- (' + class1 + ' - ' + class2 + ' t/ha)<br>- низкая (0.01 - ' + class1 + ' t/ha)<br>в соответствующей единицы измерения (' + i18n.aggreg[aggreg_index] + ').';
      },
      landuseDescr          : function (crop_index, aggreg_index) {
        return '<br> Карта показывает использование земельных участков "' + i18n.crop[crop_index] + '", ее процент орошаемого участка (временно включены неиспользуемые земли) в соответствующем блоке (' + i18n.aggreg[aggreg_index + 'Short'] +'). Постоянная неиспользуемых земель не рассматривается.';
      },
      frequencyDescr        : function (min_year, max_year, crop_index, aggreg_index) {
        return '<br>Карта показывает среднее количество лет в '+ min_year +' и '+ max_year + ', в котором ' + i18n.crop[crop_index] + ' происходит в соответствующий блок ('+ i18n.aggreg[aggreg_index + 'Short'] +'). Постоянная неиспользуемых земель не рассматривается.';
      }
    };

    i18n.settings = {
            legend: 'Легенда',
      title                 : 'Легенда карты',
      opacity               : 'настроить прозрачность',
      layerInfo             : 'получить информацию о слое',
      layerPng              : 'этот слой как .png',
      extent                : 'Макс. степень орошения',
  fir_n_nocrops        : 'Irrigation area in га',
  firf_cotton       : 'хлопок в га',
  firf_wheat        : 'пшеница в га',
  firf_rice       : 'рис в га',
  firf_other        : 'Other crop в га',
  firf_orchard        : 'фруктовый сад/Виноградник в га',
  firf_garden     : 'Urban garden в га',
    firf_maize              : 'Maize in ha',
    firf_veg                : 'Vegetable in ha',
    firf_sun                : 'Sunflower in ha',  
  firf_sum        : 'Sum of crops в га',
  uir_sum        : 'нетто б земля в %',
    uir_wheat               : 'пшеница в %',
    uir_rice                : 'рис в %',
    uir_cotton              : 'хлопок в %',
  uir_other            : 'Other Crop в %',
  uir_orchard              : 'фруктовый сад/Виноградник в %',
  uir_garden               : 'Urban Garden в %',
      uir_maize              : 'Maize in %',
    uir_veg                : 'Vegetable in %',
    uir_sun                : 'Sunflower in %',
  uir_sum        : 'Sum of crops in %',
    pirf_wheat                 : 'пшеница в т',
  pirf_cotton                  : 'хлопок в т',
    y_wheat                 : 'Урожайность пшеницы в т/га',
  y_cotton                  : 'хлопок в т/га',
    fp_nocrops           : 'Площадь неисп. земель в %',
    flf_nocrops              : 'Years of fallow',
  mlu_nocrops               : 'Преобладающий тип урожая',
  cd_nocrops               : 'Количество типов культур'
    };

    i18n.map = {
      title                 : 'Обзор карты',
      onSatellite            : 'включить<br>вид сверху',
      offSatellite          :'выключить<br>вид сверху',
      omap                  : 'Показать Open Street Map'
    };

    i18n.chart = {
      title                 : 'График',
      png                   : 'График как PNG',
      backbtn               : 'назад (год)',
      forwardbtn            : 'вперед (год)',
      allYear               : 'все доступные года',
      _in                   : ' в ',
      raster                : 'Растровые',
      shareCrops            : 'Доля культур (%)',
      y                 : 'урожай (т/га)',
      multiannualHeader1          : 'Многолетний анализ',
      multiannualHeader2          : '(одна ячейка = 7,5км x 7,5км)',     
      majorLandUse          : 'Основная культура',
      cropRotation          : 'Севооборот',
      numCrops              : 'Кол-во типов культур',
      flf             : 'Частота неисп.земель',
      yearsFallow           : 'Годы неисп.земель',
      noChart    : 'Нет диаграмма для'
    };

    i18n.exp = {
      title                 : 'Экспорт',
      opts                  : 'Выбор опций экспорта',
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
      selectIndicator         : 'Выберите тип карты',
      singleWUA             : 'один АВП',
      allWUAsRayon          : 'все АВП района',
      allWUAsOblast         : 'все АВП области',
      selectedWUAs          : 'выбранные АВП',
      singleRayon           : 'single rayon',
      allRayonsOblast       : 'all rayons of oblast',

      selectOblasts         : 'Select Province (oblast)',
      singleOblast          : 'single Province (oblast)',
      allOblastsCountry     : 'all Provinces of Country',
      allOblastsCA : 'all Provinces of CA',
                download: 'Скачать',
          asSHP: 'как SHP',
          filtered: 'фильтруют',
          tooltipSHP1: '',
          
          tooltipSHP2: 'промелькнутое Shapefile с будут созданы все значения показателей всех лет'
    };

    i18n.timeSlider = {
      title                 : 'Выбранный год: ',
      startAnimation        : 'Начать временную анимацию',
      stopAnimation         : 'Остановить временную анимацию'
    };

    i18n.popup = {
      measure               : 'т/га',
      avgYear               : 'лет (в среднем)<br>в пределах',
      rasterOblast          : 'Растровые',
      h                     : 'высота',
      m                     : 'м'
    };

    i18n.polygon = {
          showPolygon             : 'Мои Полигоны',
      notPressed            : 'Режим рисования полигонов',
      pressed               : 'Выйти из режима рисования полигонов',
      exportPressed         : 'Режим экспорта',
      chartPressed          : 'Режим графика',
      removeAll             : 'Удалить все полигоны',
      removeSel             : 'Удалить выбранный полигон',

      activate              : 'Нарисовать полигон',
      deactivate            : 'Прекратить рисование',
      upload                : 'Загрузить полигон',
      edit                  : 'Редактировать',
      calculate             : 'расчет<br>индикатора',
      progressTitle : 'расчет индикатора',
                progressMsg: 'Агрегат для полигонов...',
                failure: 'Расчет индикатора не удалось!',
                success : 'Индикаторы рассчитываются успешно!', 
                alreadyCalculated: 'Индикаторы уже подсчитали!',              
          exportExcel: 'Экспорт в Excel',
      remove                : 'Удалить',
    tooltip: 'Выбранный полигон',
    pressCalculate: 'сначала нажмите расчет индикатора!',
    shift: 'Выберите один или несколько многоугольник многоугольники с нажатой клавишей SHIFT',
    uploadAlert: 'Выберите промелькнутое Polygon Shapefile с системой координат WGS 84 (EPSG:4326)'
    };

    i18n.exportUI = {
      title                 : 'Редактирование полигона',
      inputName             : 'Наименование',
      inputLocation         : 'Расположение',
      totalArea: 'Total area',      
      inputCrop             : 'Выберите культуру(ы)',
      inputPeriod           : 'Выберите период',
      inputYear             : 'Выберите года',
      inputIndicator          : 'Выберите тип карты',
      inputOutput           : 'Выберите вывод отчета',
      btnCancel             : 'Отмена',
      btnSubmit             : 'Сохранить'
    };

    i18n.exportTemplate = {
      landuseTable          : 'Таблица землепользования',
      landuseChart          : 'График землепользования',
      yieldTable            : 'Таблица урожайности',
      yieldChart            : 'График урожайности',
      name                  : 'Название: документ, показывающий информацию о выбранной области',
      location              : 'Находится в',
      sizeof                : 'Размер',
      inha                  : 'в га',
      area                  : 'Сельскохозяйственные / площадь орошаемых земель в',
      ds                    : 'Источник данных',
      dsDescr               : 'например "Дистанционное зондирование продукты, основанные на свободных от заряда доступных данных (MODIS 250) классификация, оценка доходности, ... Отчет показывает использование земельный участок Пшеница, хлопок, рис и пар, ее доля орошаемых (используется) Земельные участки (вкл . временно находящиеся под паром земля) в соответствующий блок (имя многоугольника). Постоянная неиспользуемые земли не считается ".',
      footer                : 'Hижний колонтитул',
      footerContent         : '© 2015 Отдел дистанционного зондирования, Вюрцбургский университет, Германия'
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
  i18n.alert = {
    ambiguous               : 'Выбранная точка является неоднозначной, пожалуйста, нажмите только на одну единицу (может быть увеличение)'
  };

  break;
}