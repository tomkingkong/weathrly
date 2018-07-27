import React from 'react';

import './CurrentWeather.css';

const CurrentWeather = (props) => {
  const { 
    currentCity, 
    currentState, 
    currentCondition, 
    currentDay, 
    currentTemp, 
    summary, 
    currentHigh, 
    currentLow,
    currentIcon 
  } = props.currWeatherObj;

  return (
    <React.Fragment>
      { currentIcon &&
      <section className="CurrentWeather">
      <h3>{currentCity}, {currentState}</h3>
        <div className="currentData">
          <div className="left-section">
            <p>{currentCondition}</p>
            <h4>{currentDay}</h4>
          </div>
          <div className="mid-section">
            <img alt={currentCondition} src={currentIcon} />
          </div>
          <div className="right-section">
            <p className="currentTemp">{currentTemp}°</p>
            <p>{currentHigh}° / {currentLow}°</p>
          </div>
        </div>
      <p className="summary">{summary}</p>
      </section>
      }
    </React.Fragment>
  )
}

export default CurrentWeather;

