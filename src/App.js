import React, { Component } from 'react';

import './App.css';
import Key from './Key';
import Header from './Header';
import Search from './Search';
import TenDay from './TenDay';
import SevenHour from './SevenHour';
import CurrentWeather from './CurrentWeather';
import { returnWeatherData } from './Helper';

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedLocation: '',
      currWeatherObj: {},
      hourlyArray: [],
      tenDayArray: [],
      searchError: false
    }
  }

  getLocationFromStore = (storeKey) => {
    if (localStorage.getItem(storeKey)) {
      return JSON.parse(localStorage.getItem(storeKey));
    }
  }

  storeLocation = (storeKey, storeItem) => {
    return localStorage.setItem(storeKey, JSON.stringify(storeItem));
  }

  updateCurrentData = (loc) => {
    fetch(`http://api.wunderground.com/api/${Key}/conditions/hourly10day/forecast10day/q/${loc}/.json`)
    .then(response => response.json())
    .then(data => {
      let weatherDataObj = returnWeatherData(data);
      this.storeLocation('savedLoc', data.current_observation.display_location.zip);
      this.setState({
        searchError: false,
        currWeatherObj: weatherDataObj.currWeatherObj,
        hourlyArray: weatherDataObj.hourlyArray,
        tenDayArray: weatherDataObj.tenDayArray
      })
    })
    .catch(error => { throw new Error(error) })
    .catch(() => {
      setTimeout(() => {
        this.updateCurrentData(this.getLocationFromStore('savedLoc'));
      }, 3000);
      this.setState({
        searchError: true,
      })
    })
  }

  componentDidMount() {
    let loc = this.getLocationFromStore('savedLoc');
    this.updateLocation(loc);
  }

  updateLocation = (loc) => {
    let newLoc = loc;

    this.setState({
      selectedLocation: newLoc,
    })
 
    this.updateCurrentData(newLoc)
  }

  displayPage = () => {
    const { 
      currWeatherObj, 
      hourlyArray, 
      tenDayArray, 
    } = this.state;
    
    if (hourlyArray.length) {
      return (
        <React.Fragment>
          <CurrentWeather currWeatherObj={ currWeatherObj } />
          <SevenHour hourlyArray={ hourlyArray } />
          <TenDay tenDayArray={ tenDayArray } hours={ hourlyArray } />
        </React.Fragment>
      )
    }
  }

  render() {
    const { searchError, selectedLocation } = this.state;

    return (
      <div className="App">
        {!this.state.hourlyArray.length && <Header />}
        <Search 
          updateLocation={ this.updateLocation } 
          ifError={ searchError } 
          loc={ selectedLocation } 
        /> 
        {
          this.displayPage()
        }
      </div>
    );
  }
}

export default App;