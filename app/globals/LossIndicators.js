var __LossInputIndicators = [{
    id: "eta",
    enName: "Actual Evapotranspiration (calculated on the server)",
    ruName: "Фактическая эвапотранспирация (рассчитывается на сервере)",
    enUnit: "mm",
    ruUnit: "мм",
    fromServer: true
}, {
    id: "dayno",
    enName: "The day of the year on which it is calculated ETo",
    ruName: "Номер дня в году на который расчитывается ETo",
    enUnit: "day",
    ruUnit: "день"
}, {
    id: "days",
    enName: "Days in decade",
    ruName: "Количество дней в декаде",
    enUnit: "day",
    ruUnit: "день"
}, {
    id: "altitude",
    enName: "Altitude",
    ruName: "Высота над уровнем моря",
    enUnit: "m",
    ruUnit: "м"
}, {
    id: "latitude",
    enName: "Latitude",
    ruName: "Широта",
    enUnit: "°",
    ruUnit: "°"
}, {
    id: "tmax",
    enName: "Maximum air temperature",
    ruName: "Максимальная температура воздуха",
    enUnit: "°С",
    ruUnit: "°С"
}, {
    id: "tmin",
    enName: "Minimum air temperature",
    ruName: "Минимальная температура воздуха",
    enUnit: "°С",
    ruUnit: "°С"
}, {
    id: "tave",
    enName: "Average air temperature",
    ruName: "Средняя температура воздуха",
    enUnit: "°С",
    ruUnit: "°С"
}, {
    id: "humid",
    enName: "Relative humidity",
    ruName: "Относительная влажность",
    enUnit: "%",
    ruUnit: "%"
}, {
    id: "sunshu",
    enName: "Duration of sunshine",
    ruName: "Длительность солнечного сияния",
    enUnit: "hours",
    ruUnit: "час"
}, {
    id: "winspe",
    enName: "Wind speed at a height of 2m",
    ruName: "Скорость ветра на высоте 2м",
    enUnit: "m/s",
    ruUnit: "м/с"
}, {
    id: "kc",
    enName: "Crop ratio",
    ruName: "Коэффицент с/х культуры",
    enUnit: "k",
    ruUnit: "k"
}, {
    id: "ymax",
    enName: "Maximum Yield",
    ruName: "Максимальная урожайность",
    enUnit: "t/ha",
    ruUnit: "т/га"
}, {
    id: "k",
    enName: "Stress ratio",
    ruName: "Коэффициент стресса",
    enUnit: "k",
    ruUnit: "k"
}, {
    id: "c",
    enName: "Price",
    ruName: "Цена",
    enUnit: "$/t",
    ruUnit: "$/т"
}, {
    id: "f",
    enName: "Irrigated area",
    ruName: "Орошаемая площадь",
    enUnit: "ha",
    ruUnit: "га"
}, {
    id: "kw",
    enName: "Water koef",
    ruName: "Коэффициент водообеспеченности",
    enUnit: "k",
    ruUnit: "k"
}];

var __LossCalcIndicators = [{
    id: "pressure",
    enName: "Atmosphere pressure",
    ruName: "Атмосферное давление",
    enUnit: "kPa",
    ruUnit: "кПа",
    formula: "101.3 * Math.pow((293 - 0.0065 * {altitude}) / 293, 5.26)"
}, {
    id: "radians",
    enName: "Latitude in radians",
    ruName: "Широта в радианах",
    enUnit: "rad",
    ruUnit: "рад",
    formula: "3.141593 / 180 * {latitude}"
}, {
    id: "tmean",
    enName: "Average air temperature",
    ruName: "Средняя температура воздуха",
    enUnit: "°С",
    ruUnit: "°С",
    formula: "({tmax} + {tmin}) / 2"
}, {
    id: "dlt",
    enName: "Gradient vapor pressure curve",
    ruName: "Градиент кривой давления пара насыщения",
    enUnit: "kPa/°С",
    ruUnit: "кПа/°С",
    formula: "4098 * (0.6108 * Math.exp((17.27 * {tmean}) / ({tmean} + 237.3))) / Math.pow({tmean} + 237.3, 2)"
}, {
    id: "gamma",
    enName: "Psychrometric constant",
    ruName: "Психрометрическая постоянная",
    enUnit: "kPa/°С",
    ruUnit: "кПа/°С",
    formula: "0.662 * Math.pow(10,-3) * {pressure}"
}, {
    id: "e0min",
    enName: "Saturation vapor pressure at Tmin",
    ruName: "Давление пара насыщения при Тmin",
    enUnit: "kPa",
    ruUnit: "кПа",
    formula: "0.6108 * Math.exp((17.27 * {tmin}) / ({tmin} + 237.3))"
}, {
    id: "e0max",
    enName: "Saturation vapor pressure at Tmax",
    ruName: "Давление пара насыщения при Тmax",
    enUnit: "kPa",
    ruUnit: "кПа",
    formula: "0.6108 * Math.exp((17.27 * {tmax}) / ({tmax} + 237.3))"
}, {
    id: "es",
    enName: "Vapor pressure average",
    ruName: "Давление пара насыщения среднее",
    enUnit: "kPa",
    ruUnit: "кПа",
    formula: "({e0min} + {e0max}) / 2"
}, {
    id: "ea",
    enName: "Actual vapor pressure",
    ruName: "Давление пара фактическое",
    enUnit: "kPa",
    ruUnit: "кПа",
    formula: "({humid} / 100) * {es}"
}, {
    id: "esa",
    enName: "Lack of vapor pressure saturation",
    ruName: "Дефицит давления пара насыщения",
    enUnit: "kPa",
    ruUnit: "кПа",
    formula: "{es} - {ea}"
}, {
    id: "mdlt",
    enName: "mdlt",
    ruName: "Солнечное наклонение",
    enUnit: "rad",
    ruUnit: "рад",
    formula: "0.409 * Math.sin((2 * 3.141593 * {dayno} / 365) - 1.39)"
}, {
    id: "x",
    enName: "x",
    ruName: "x",
    enUnit: "",
    ruUnit: "",
    formula: "((-Math.tan({radians})) * Math.tan({mdlt}))"
}, {
    id: "omega",
    enName: "Sunset angle",
    ruName: "Угол на закате",
    enUnit: "rad",
    ruUnit: "рад",
    formula: "Math.acos({x})"
}, {
    id: "dr",
    enName: "Reverse relative distance Earth - Sun",
    ruName: "Обратное относительное растояние Земля - Солнце",
    enUnit: "",
    ruUnit: "",
    formula: "1 + 0.033 * Math.cos(2 * 3.141593 / 365 * {dayno})"
}, {
    id: "ra",
    enName: "Extraterrestrial Solar Radiation",
    ruName: "Внеземная солнечная радиация",
    enUnit: "MJ/m² day",
    ruUnit: "МДж/м2 сут",
    formula: "1440 / 3.141593 * 0.082 * {dr} * ({omega} * Math.sin({radians}) * Math.sin({mdlt}) + Math.cos({radians}) * Math.cos({mdlt}) * Math.sin({omega}))"
}, {
    id: "n",
    enName: "Maximum sunshine duration",
    ruName: "Максимально возможная продолжительность солнечного сияния",
    enUnit: "hours/day",
    ruUnit: "час / сут",
    formula: "24 / 3.141593 * {omega}"
}, {
    id: "rs",
    enName: "Solar radiation reaching the earth's surface",
    ruName: "Солнечная радиация достигающая поверхности земли",
    enUnit: "MJ/m² day",
    ruUnit: "МДж/м2 сут",
    formula: "(0.25 + 0.5 * {sunshu} / {n}) * {ra}"
}, {
    id: "rso",
    enName: "Solar radiation reaching the earth's surface in clear weather",
    ruName: "Солнечная радиация достигающая поверхности земли в ясную погоду",
    enUnit: "MJ/m² day",
    ruUnit: "МДж/м2 сут",
    formula: "(0.75 + 2 * Math.pow(10, -5) * 582) * {ra}"
}, {
    id: "rns",
    enName: "Pure shortwave solar radiation",
    ruName: "Чистая коротковолновая солнечная радиация",
    enUnit: "MJ/m² day",
    ruUnit: "МДж/м2 сут",
    formula: "(1 - 0.23) * {rs}"
}, {
    id: "rnl",
    enName: "Pure longwave terrestrial radiation",
    ruName: "Чистая длиноволновая земная радиация",
    enUnit: "MJ/m² day",
    ruUnit: "МДж/м2 сут",
    formula: "(4.903 * Math.pow(10, -9)) * (Math.pow({tmax} + 273.16, 4) + Math.pow({tmin} + 273.16, 4)) / 2 * (0.34 - 0.14 * Math.sqrt({ea})) * (1.35 * {rs} / {rso} - 0.35)"
}, {
    id: "rn",
    enName: "Pure radiation on the surface of plants",
    ruName: "Чистая радиация на поверхности растений",
    enUnit: "MJ/m² day",
    ruUnit: "МДж/м2 сут",
    formula: "{rns} - {rnl}"
}, {
    id: "d_1",
    enName: "d_1",
    ruName: "Переменная d_1",
    enUnit: "",
    ruUnit: "",
    formula: "0.408 * {dlt} * {esa}"
}, {
    id: "f_1",
    enName: "f_1",
    ruName: "Переменная f_1",
    enUnit: "",
    ruUnit: "",
    formula: "{gamma} * 900 * {winspe}  * {esa} / ({tave} + 273)"
}, {
    id: "k_1",
    enName: "k_1",
    ruName: "Переменная k_1",
    enUnit: "",
    ruUnit: "",
    formula: "{dlt} + {gamma} * (1 + 0.34 * {winspe})"
}, {
    id: "et0",
    enName: "Reference Evapotranspiration",
    ruName: "Эталонная эвапотранспирация",
    enUnit: "mm",
    ruUnit: "мм",
    formula: "(({d_1} + {f_1}) / {k_1}) * {days}"
}, {
    id: "etc",
    enName: "Evapotranspiration per crop",
    ruName: "Эвапотранспирация с/х культур",
    enUnit: "mm",
    ruUnit: "мм",
    formula: "{kc} * {et0}"
}, {
    id: "etc_a",
    enName: "Actual Evapotranspiration per crop",
    ruName: "Эвапотранспирация факт || с/х культур",
    enUnit: "mm",
    ruUnit: "мм",
    formula: "({eta} || {etc})"
}, {
    id: "eta_sum",
    enName: "eta_sum",
    ruName: "eta_sum",
    enUnit: "mm",
    ruUnit: "мм",
    formula: "[eta]"
}, {
    id: "et0_sum",
    enName: "et0_sum",
    ruName: "et0_sum",
    enUnit: "mm",
    ruUnit: "мм",
    formula: "[et0]"
}, {
    id: "etc_sum",
    enName: "etc_sum",
    ruName: "etc_sum",
    enUnit: "mm",
    ruUnit: "мм",
    formula: "[etc]"
}, {
    id: "etc_a_sum",
    enName: "etc_a_sum",
    ruName: "etc_a_sum",
    enUnit: "mm",
    ruUnit: "мм",
    formula: "[etc_a]"
}, {
    id: "etrs",
    enName: "etrs",
    ruName: "etrs",
    enUnit: "",
    ruUnit: "",
    formula: "1 - {k} * (1 - ({eta_sum}/{etc_sum}))"
}, {
    id: "yd",
    enName: "Yield d",
    ruName: "Урожайность d",
    enUnit: "",
    ruUnit: "",
    formula: "{ymax} * {etrs}"
}, {
    id: "yx",
    enName: "Yield loss",
    ruName: "Потери урожайности",
    enUnit: "t/ha",
    ruUnit: "т/га",
    formula: "{ymax} - {yd}"
}, {
    id: "etfrs",
    enName: "Forecast ET",
    ruName: "Прогнозируемая эвапотранспирация",
    enUnit: "mm",
    ruUnit: "мм",
    formula: "{etc_sum} * {kw}"
}, {
    id: "etfrs_a",
    enName: "Adjusted forecast ET",
    ruName: "Откорректированная прогнозируемая эвапотранспирация",
    enUnit: "mm",
    ruUnit: "мм",
    formula: "{etc_a_sum} * {kw}"
}, {
    id: "kpr",
    enName: "The reduction ratio of the projected yield (Y / Ymax)",
    ruName: "Коэффициент снижения прогнозируемой урожайности ( Y / Ymax )",
    enUnit: "k",
    ruUnit: "k",
    formula: "1 - {k} * (1 - {etfrs} / {etc_sum})"
}, {
    id: "kpr_a",
    enName: "The reduction ratio of the actual yield (Y / Ymax)",
    ruName: "Коэффициент снижения фактической урожайности ( Y / Ymax )",
    enUnit: "k",
    ruUnit: "k",
    formula: "1 - {k} * (1 - {eta_sum} / {etc_sum})"
}, {
    id: "lpr",
    enName: "Expected yield loss",
    ruName: "Ожидаемая потеря урожайности",
    enUnit: "t/ha",
    ruUnit: "т/га",
    formula: "{ymax} * (1 - {kpr})"
}, {
    id: "lpr_a",
    enName: "Actual yield loss",
    ruName: "Фактическая потеря урожайности",
    enUnit: "t/ha",
    ruUnit: "т/га",
    formula: "{ymax} * (1 - {kpr_a})"
}, {
    id: "la",
    enName: "Actual production loss",
    ruName: "Фактическая потеря продукции",
    enUnit: "t",
    ruUnit: "т",
    formula: "{f} * {lpr_a}"
}, {
    id: "lca",
    enName: "Actual loss products in terms of value",
    ruName: "Фактическая потеря продукции в стоимостном выражении",
    enUnit: "$",
    ruUnit: "$",
    formula: "{c} * {la}"
}, {
    id: "lcaf",
    enName: "Actual loss of land productivity",
    ruName: "Фактическая потеря продуктивности земли",
    enUnit: "$/ha",
    ruUnit: "$/га",
    formula: "{lca} / {f}"
}];