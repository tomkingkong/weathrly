import React from 'react';
import { shallow } from 'enzyme';

import CurrentWeather from './CurrentWeather.js';

describe( 'CurrentWeather', () => {
  let wrapper;

  let currWeatherObj = {
    currentCity: "DENVER",
    currentCondition: "Chance of a Thunderstorm",
    currentDay: "Wednesday",
    currentHigh: "83",
    currentIcon: "/static/media/cloudy.fd1522b4.svg",
    currentLow: "62",
    currentState: "CO",
    currentTemp: 80,
    summary: "Showers and thunderstorms early. Lows overnight in the low 60s."
  }

  beforeEach(() => {
    wrapper = shallow(<CurrentWeather currWeatherObj={ currWeatherObj } />);
  });

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should display elements with correct props', () => {
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('p').length).toEqual(4);
    expect(wrapper.find('h4').length).toEqual(1);
    expect(wrapper.find('h3').length).toEqual(1);    
    expect(wrapper.find('h3').text()).toEqual('DENVER, CO');
    expect(wrapper.find('p').first().text()).toEqual('Chance of a Thunderstorm');
    expect(wrapper.find('h4').text()).toEqual('Wednesday');
  });

  it('should display nothing if currentIcon hasnt loaded', () => {
    expect(wrapper.find('section').length).toEqual(1);

    currWeatherObj.currentIcon = null;
    
    wrapper = shallow(<CurrentWeather currWeatherObj={ currWeatherObj } />);

    expect(wrapper.find('section').length).toEqual(0);
  });

});


