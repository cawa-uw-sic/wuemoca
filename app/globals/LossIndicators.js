/**
* @class __Indicator
* list of indicators with id, used as input data for calculate yield loses
*/
var __LossInputIndicators = [
  {
    id: 'eta',
    enName: 'ETa (calculated on the server)',
    ruName: 'Фактическая эвапотранспирация (рассчитывается на сервере)',
    enUnit: 'mm',
    ruUnit: 'мм',
    fromServer: true
  },
  {
    id: 'dayno',
    enName: 'The number of the day in the year on which it is calculated ETo',
    ruName: 'Номер дня в году на который расчитывается ETo',
    enUnit: 'day',
    ruUnit: 'день'
  },
  {
    id: 'days',
    enName: 'Days in decade',
    ruName: 'Количество дней в декаде',
    enUnit: 'day',
    ruUnit: 'день'
  },
  {
    id: 'altitude',
    enName: 'Altitude',
    ruName: 'Высота над уровнем моря',
    enUnit: 'm',
    ruUnit: 'м'
  },
  {
    id: 'latitude',
    enName: 'Latitude',
    ruName: 'Широта',
    enUnit: '°',
    ruUnit: '°'
  },
  {
    id: 'tmax',
    enName: 'Maximum air temperature',
    ruName: 'Максимальная температура воздуха',
    enUnit: '°С',
    ruUnit: '°С'
  },
  {
    id: 'tmin',
    enName: 'Minimum air temperature',
    ruName: 'Минимальная температура воздуха',
    enUnit: '°С',
    ruUnit: '°С'
  },
  {
    id: 'tave',
    enName: 'Average air temperature',
    ruName: 'Средняя температура воздуха',
    enUnit: '°С',
    ruUnit: '°С'
  },
  {
    id: 'humid',
    enName: 'Relative humidity',
    ruName: 'Относительная влажность',
    enUnit: '%',
    ruUnit: '%'
  },
  {
    id: 'sunshu',
    enName: 'Duration of sunshine',
    ruName: 'Длительность солнечного сияния',
    enUnit: 'hour',
    ruUnit: 'час'
  },
  {
    id: 'winspe',
    enName: 'Wind speed at a height of 2m',
    ruName: 'Скорость ветра на высоте 2м',
    enUnit: 'm/s',
    ruUnit: 'м/с'
  },
  {
    id: 'kc',
    enName: 'Crop ratio',
    ruName: 'Коэффицент с/х культуры',
    enUnit: 'k',
    ruUnit: 'k'
  },
  {
    id: 'ymax',
    enName: 'Maximum Yield',
    ruName: 'Максимальная урожайность',
    enUnit: 't/ha',
    ruUnit: 'т/га'
  },
  {
    id: 'k',
    enName: 'Stress ratio',
    ruName: 'Коэффициент стресса',
    enUnit: 'k',
    ruUnit: 'k'
  }
];

var __LossCalcIndicators = [
  {
    id: 'pressure',
    enName: 'Atmosphere pressure',
    ruName: 'Атмосферное давление',
    enUnit: 'кПа',
    ruUnit: 'кПа',
    formula: '101.3 * Math.pow((293 - 0.0065 * {altitude}) / 293, 5.26)'
  },
  {
    id: 'radians',
    enName: 'Latitude in radians',
    ruName: 'Широта в радианах',
    enUnit: 'рад',
    ruUnit: 'рад',
    formula: '3.141593 / 180 * {latitude}'
  },
  {
    id: 'tmean',
    enName: 'tmean',
    ruName: 'Средняя температура воздуха',
    enUnit: '°С',
    ruUnit: '°С',
    formula: '({tmax} + {tmin}) / 2'
  },
  {
    id: 'dlt',
    enName: 'dlt',
    ruName: 'Градиент кривой давления пара насыщения',
    enUnit: 'кПа/°С',
    ruUnit: 'кПа/°С',
    formula: '4098 * (0.6108 * Math.exp((17.27 * {tmean}) / ({tmean} + 237.3))) / Math.pow({tmean} + 237.3, 2)'
  },
  {
    id: 'gamma',
    enName: 'gamma',
    ruName: 'Психрометрическая постоянная',
    enUnit: 'кПа/°С',
    ruUnit: 'кПа/°С',
    formula: '0.662 * Math.pow(10,-3) * {pressure}'
  },
  {
    id: 'e0min',
    enName: 'e0min',
    ruName: 'Давление пара насыщения при Тmin',
    enUnit: 'кПа',
    ruUnit: 'кПа',
    formula: '0.6108 * Math.exp((17.27 * {tmin}) / ({tmin} + 237.3))'
  },
  {
    id: 'e0max',
    enName: 'e0max',
    ruName: 'Давление пара насыщения при Тmax',
    enUnit: 'кПа',
    ruUnit: 'кПа',
    formula: '0.6108 * Math.exp((17.27 * {tmax}) / ({tmax} + 237.3))'
  },
  {
    id: 'es',
    enName: 'es',
    ruName: 'Давление пара насыщения среднее',
    enUnit: 'кПа',
    ruUnit: 'кПа',
    formula: '({e0min} + {e0max}) / 2'
  },
  {
    id: 'ea',
    enName: 'ea',
    ruName: 'Давление пара фактическое',
    enUnit: 'кПа',
    ruUnit: 'кПа',
    formula: '({humid} / 100) * {es}'
  },
  {
    id: 'esa',
    enName: 'esa',
    ruName: 'Дефицит давления пара насыщения',
    enUnit: 'кПа',
    ruUnit: 'кПа',
    formula: '{es} - {ea}'
  },
  {
    id: 'mdlt',
    enName: 'mdlt',
    ruName: 'Солнечное наклонение',
    enUnit: 'рад',
    ruUnit: 'рад',
    formula: '0.409 * Math.sin((2 * 3.141593 * {dayno} / 365) - 1.39)'
  },
  {
    id: 'x',
    enName: 'x',
    ruName: 'x',
    enUnit: '',
    ruUnit: '',
    formula: '((-Math.tan({radians})) * Math.tan({mdlt}))'
  },
  {
    id: 'omega',
    enName: 'omega',
    ruName: 'Угол на закате',
    enUnit: 'рад',
    ruUnit: 'рад',
    formula: 'Math.acos({x})'
  },
  {
    id: 'dr',
    enName: 'dr',
    ruName: 'Обратное относительное растояние Земля - Солнце',
    enUnit: '',
    ruUnit: '',
    formula: '1 + 0.033 * Math.cos(2 * 3.141593 / 365 * {dayno})'
  },
  {
    id: 'ra',
    enName: 'ra',
    ruName: 'Внеземная солнечная радиация',
    enUnit: 'МДж/м2 сут',
    ruUnit: 'МДж/м2 сут',
    formula: '1440 / 3.141593 * 0.082 * {dr} * ({omega} * Math.sin({radians}) * Math.sin({mdlt}) + Math.cos({radians}) * Math.cos({mdlt}) * Math.sin({omega}))'
  },
  {
    id: 'n',
    enName: 'n',
    ruName: 'Максимально возможная продолжительность солнечного сияния',
    enUnit: 'час / сут',
    ruUnit: 'час / сут',
    formula: '24 / 3.141593 * {omega}'
  },
  {
    id: 'rs',
    enName: 'rs',
    ruName: 'Солнечная радиация достигающая поверхности земли',
    enUnit: 'МДж/м2 сут',
    ruUnit: 'МДж/м2 сут',
    formula: '(0.25 + 0.5 * {sunshu} / {n}) * {ra}'
  },
  {
    id: 'rso',
    enName: 'rso',
    ruName: 'Солнечная радиация достигающая поверхности земли в ясную погоду',
    enUnit: 'МДж/м2 сут',
    ruUnit: 'МДж/м2 сут',
    formula: '(0.75 + 2 * Math.pow(10, -5) * 582) * {ra}'
  },
  {
    id: 'rns',
    enName: 'rns',
    ruName: 'Чистая коротковолновая солнечная радиация',
    enUnit: 'МДж/м2 сут',
    ruUnit: 'МДж/м2 сут',
    formula: '(1 - 0.23) * {rs}'
  },
  {
    id: 'rnl',
    enName: 'rnl',
    ruName: 'Чистая длиноволновая земная радиация',
    enUnit: 'МДж/м2 сут',
    ruUnit: 'МДж/м2 сут',
    formula: '(4.903 * Math.pow(10, -9)) * (Math.pow({tmax} + 273.16, 4) + Math.pow({tmin} + 273.16, 4)) / 2 * (0.34 - 0.14 * Math.sqrt({ea})) * (1.35 * {rs} / {rso} - 0.35)'
  },
  {
    id: 'rn',
    enName: 'rn',
    ruName: 'Чистая радиация на поверхности растений',
    enUnit: 'МДж/м2 сут',
    ruUnit: 'МДж/м2 сут',
    formula: '{rns} - {rnl}'
  },
  {
    id: 'u2',
    enName: 'u2',
    ruName: 'Приведение ветра к высоте флюгера 2 м',
    enUnit: '',
    ruUnit: '',
    formula: '({winspe} * 4.87) / (Math.log10(67.8 * 2 - 5.42))'
  },
  {
    id: 'et0',
    enName: 'ETo',
    ruName: 'Эталонная эвапотранспирация',
    enUnit: 'мм/сут',
    ruUnit: 'мм/сут',
    formula: '(0.408 * {dlt} * {rn} + {gamma} * (900 / ({tmean} + 273)) * {u2} * {esa}) / ({dlt} + {gamma} * (1 + 0.34 * {u2}))'
  },
  {
    id: 'etc',
    enName: 'ETc',
    ruName: 'Эвапотранспирация с/х культур',
    enUnit: 'мм',
    ruUnit: 'мм',
    formula: '{kc} * {et0} * {days}'
  },
  {
    id: 'etrs',
    enName: 'etrs',
    ruName: 'etrs',
    enUnit: '',
    ruUnit: '',
    formula: '1 - {k} * (1 - ([eta]/[etc]))'
  },
  {
    id: 'yd',
    enName: 'Yield d',
    ruName: 'Урожайность d',
    enUnit: '',
    ruUnit: '',
    formula: '{ymax} * {etrs}'
  },
  {
    id: 'yx',
    enName: 'Yield loss',
    ruName: 'Потери урожайности',
    enUnit: 't/ha',
    ruUnit: 'т/га',
    formula: '{ymax} - {yd}'
  }
];