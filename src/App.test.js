import React from 'react';

import { shallow, mount } from 'enzyme';
import App from './App';
import Data from './MockData'
import { returnWeatherData } from './Helper.js'

describe( 'App', () => {
  let wrapper;
  beforeEach(() => {
    localStorage.clear();
    
    wrapper = shallow(<App />);
  });
      
  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a default selectedLocation of an empty string', () => {
    wrapper.setState({
      selectedLocation: ''
    });
    expect(wrapper.state().selectedLocation).toEqual('');
  });

  it('should have a default searchError state of false', () => {
    expect(wrapper.state().searchError).toEqual(false);
  });

  it('should have a default tenDayArray and hourlyArray of an empty array and empty currWeatherObj', () => {
    expect(wrapper.state().currWeatherObj).toEqual({});
    expect(wrapper.state().hourlyArray).toEqual([]);
    expect(wrapper.state().tenDayArray).toEqual([]);
  });

  it('should render a Search component', () => {
    expect(wrapper.find('Search').length).toEqual(1);
  });

  it('should only render a Header component if no weather data', () => {
    expect(wrapper.find('Header').length).toEqual(1);

    wrapper.setState( { selectedLocation: 'denver, co', hourlyArray: ['string'] });

    expect(wrapper.find('Header').length).toEqual(0);
  });

  it('should retrieve data from local storage on mount', () => {
    let zip = 80204;

    localStorage.setItem('savedLoc', zip);
    
    let localItem = localStorage.getItem('savedLoc');

    wrapper.setState({selectedLocation: localItem});

    expect(wrapper.state().selectedLocation).toEqual(80204);
  });

  it('should have a method to return localStorage location or undefined if it does not exist', () => {
    let zip = 80204;

    localStorage.setItem('savedLoc', zip);
    
    let retrievedStorage = wrapper.instance().getLocationFromStore('savedLoc');

    expect(retrievedStorage).toEqual(zip);

    zip = null;

    localStorage.setItem('savedLoc', zip);

    retrievedStorage = wrapper.instance().getLocationFromStore('savedLoc');

    expect(retrievedStorage).toEqual(undefined);
  });

  it('should have a method to store a zip code to localStorage', () => {
    let zip = 80204;

    wrapper.instance().storeLocation('savedLoc', zip);

    let localItem = localStorage.getItem('savedLoc');

    expect(localItem).toEqual('80204');
  });

  it('should render CurrentWeather, SevenHour and TenDay components after a location has been entered', () => {
    wrapper.setState( { selectedLocation: 'denver, co', hourlyArray: ['string'] });

    expect(wrapper.find('CurrentWeather').length).toEqual(1);
    expect(wrapper.find('SevenHour').length).toEqual(1);
    expect(wrapper.find('TenDay').length).toEqual(1);
  });

  it('should update state', () => {
    expect(wrapper.state().tenDayArray).toEqual([]);
    expect(wrapper.state().hourlyArray).toEqual([]);
    expect(wrapper.state().currWeatherObj).toEqual({});

    let weatherDataObj = returnWeatherData(Data);
    let expectedObj = {
      "currentCity": "LOUISVILLE",
      "currentCondition": "Partly Cloudy",
      "currentDay": "Wednesday",
      "currentHigh": "51",
      "currentIcon": "mostlycloudy.svg",
      "currentLow": "32",
      "currentState": "KY",
      "currentTemp": 46,
      "summary": "Sun and clouds mixed. High 51F. Winds NE at 10 to 15 mph."};

    wrapper.setState({
      currWeatherObj: weatherDataObj.currWeatherObj,
      hourlyArray: weatherDataObj.hourlyArray,
      tenDayArray: weatherDataObj.tenDayArray
    });

    expect(wrapper.state().tenDayArray.length).toEqual(10);
    expect(wrapper.state().hourlyArray.length).toEqual(36);
    expect(wrapper.state().currWeatherObj).toEqual(expectedObj);
  });

  it('should have a method to update state selectedLocation', () => {
    let zip = '80204';

    wrapper.instance().updateCurrentData = jest.fn();

    expect(wrapper.state().selectedLocation).toEqual(undefined);

    wrapper.instance().updateLocation(zip);
    wrapper.update();

    expect(wrapper.state().selectedLocation).toEqual('80204');
    expect(wrapper.instance().updateCurrentData).toHaveBeenCalledTimes(1);
  });

  it('should display the CurrentWeather, SevenHour and TenDay components if weatherData exists', () => {
    wrapper.setState( { selectedLocation: 'denver, co', hourlyArray: ['string'] });
  });

  it('componentDidMount', () => {
    wrapper.instance().getLocationFromStore = jest.fn();
    wrapper.instance().updateLocation = jest.fn();

    wrapper.update();
    wrapper.instance().componentDidMount();

    expect(wrapper.instance().getLocationFromStore).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().updateLocation).toHaveBeenCalledTimes(1);
  });

});