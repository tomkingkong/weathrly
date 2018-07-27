import React from 'react';

import Card from './Card.js';
import './TenDay.css';

const TenDay = (props) => {
  
  return (
    <section className="TenDay">
      {
        props.tenDayArray.map((day, i) => {
          let dayByHours = props.hours.filter(hour => { 
            return hour.yday === day.yday;
          })

          return (
            <Card 
              key={ `day ${i}` }
              day={ day.day }
              icon={ day.icon }
              high={ `${day.high}° /` }
              low={ ` ${day.low}°` }
              condition={ day.condition }
              hours={ dayByHours }
              matchDay={ day.yday }
            />
          )
        })
      }
    </section>
  )
}

export default TenDay;