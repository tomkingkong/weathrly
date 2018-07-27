export const returnWeatherData = (data) => {
  let currWeatherObj = {
    'currentCity': data.current_observation.display_location.city.toUpperCase(),
    'currentState': data.current_observation.display_location.state,
    'currentCondition': data.forecast.simpleforecast.forecastday[0].conditions,
    'currentDay': data.forecast.simpleforecast.forecastday[0].date.weekday,
    'currentTemp': Math.round(parseInt(data.current_observation.temp_f, 0)),
    'currentHigh': data.forecast.simpleforecast.forecastday[0].high.fahrenheit,
    'currentLow': data.forecast.simpleforecast.forecastday[0].low.fahrenheit,
    'currentIcon': require(`../public/images/${data.current_observation.icon}.svg`),
    'summary': data.forecast.txt_forecast.forecastday[0].fcttext
  };

  let hourlyArray = data.hourly_forecast.map(hour => {
    let time = hour.FCTTIME.civil;
    return hour = {
      'hour': time.slice(0, time.indexOf(':')) + time.slice(-2),
      'icon': require(`../public/images/${hour.icon}.svg`),
      'temp': Math.round(parseInt(hour.temp.english, 0)),
      'condition': hour.condition,
      'yday': parseInt(hour.FCTTIME.yday, 0)
    }
  });

  let tenDayArray = data.forecast.simpleforecast.forecastday.map(day => {
    return day = {
      'day': day.date.weekday,
      'icon': require(`../public/images/${day.icon}.svg`),
      'high': day.high.fahrenheit,
      'low': day.low.fahrenheit,
      'condition': day.conditions,
      'yday': day.date.yday
    }
  });


  return { currWeatherObj, hourlyArray, tenDayArray };
}