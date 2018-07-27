import React from 'react';

import { shallow, mount } from 'enzyme';
import Card from './Card';

describe('Card', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Card />);
  });

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a default state including hours that is false', () => {
    expect(wrapper.state().hours).toEqual(false);
  });

  it('should render an article and img', () => {
    expect(wrapper.find('article').length).toEqual(1);
    expect(wrapper.find('img').length).toEqual(1);
  });

  it('should render only what the sevenHour component passes it', () => {
    let hourObject = { 
      hour: '12PM',
      icon: 'partlycloudy.svg',
      temp: 47,
      condition: 'Partly Cloudy',
    };

    wrapper = shallow(<Card 
                        hour={hourObject.hour} 
                        icon={hourObject.icon} 
                        temp={hourObject.temp} 
                        condition={hourObject.condition} 
                      />);

    expect(wrapper.find('p').first().text()).toEqual('12PM');
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('p').length).toEqual(2);

    expect(wrapper.find('ul').length).toEqual(0);
    expect(wrapper.find('h4').length).toEqual(0);

    let mockFn = jest.fn();

    expect(wrapper.state().hours).toEqual(false);

    wrapper.find('article').simulate('click');

    expect(wrapper.state().hours).toEqual(false);
  });

  it('should have a method to toggle its hours', () => {
    const mockArray = [{},{},{},{},{},{},{},{},];

    wrapper = shallow(<Card hours={ mockArray } />);

    expect(wrapper.state().hours).toEqual(false);
    
    wrapper.instance().toggleHours();

    expect(wrapper.state().hours).toEqual(true);
  });

  it('should display twentyfour hour info when clicked', () => {
    const mockArray = [
      {hour: 1, icon: 'ha', temp: 90, condition: 'sweaty'},
      {hour: 1, icon: 'ha', temp: 20, condition: 'sweaty'},
      {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty'},
      {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty'},
      {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty'},
      {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty'},
      {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty'},
      {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty'},
    ];

    wrapper = shallow(<Card hours={ mockArray } />);
    wrapper.instance().toggleHours();
    wrapper.update();
    
    expect(wrapper.state().hours).toEqual(true);
    expect(wrapper.find('ul').length).toEqual(1);
    expect(wrapper.find('li').length).toEqual(8);
  });

});
