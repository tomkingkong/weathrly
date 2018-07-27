import React, { Component } from 'react';

import './Card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: false
    }
  }

  toggleHours = () => {
    this.setState({
      hours: !this.state.hours
    });
  }

  displayHours = () => {
    const { hours, day } = this.props
    
    return (
      hours.map((hour, i) => { 
        return (
          <li className="Hour" key={ `${day}hour${i}` }>
            <p>{ hour.hour}</p>
            <img alt={ hour.condition } src={ hour.icon } />
            <p>{ `${hour.temp}°` }</p>
          </li>
        )
      })
    )
  }

  render() {
    const { 
      day, 
      hour, 
      icon, 
      temp, 
      high, 
      low, 
      condition 
    } = this.props;

    return (
      <React.Fragment>
        <article className="Card" onClick={ day && this.toggleHours } >
          { day && <h4>{ day } { this.state.hours ? ' - ' : ' + ' }</h4> }
          { hour && <p>{ hour }</p> }
          <img alt={ condition } src={ icon } />
          { temp && <p>{ temp }</p>}
          { low && <p>{ high }{ low }</p> }
        </article>
          { this.state.hours && <ul className="DayHours" >{ this.displayHours() }</ul> }
      </React.Fragment>
    )
  }
}



  