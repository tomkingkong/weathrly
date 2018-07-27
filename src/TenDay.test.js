import React from 'react';
import { shallow } from 'enzyme';

import TenDay from './TenDay.js';

describe( 'TenDay', () => {
  let wrapper;
  const mockArray = [
    {hour: 1, icon: 'ha', temp: 90, condition: 'sweaty', yday: 103},
    {hour: 1, icon: 'ha', temp: 20, condition: 'sweaty', yday: 103},
    {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty', yday: 103},
    {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty', yday: 103},
    {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty', yday: 103},
    {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty', yday: 103},
    {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty', yday: 103},
    {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty', yday: 103},
    {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty', yday: 103},
    {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty', yday: 103},
    {hour: 1, icon: 'ha', temp: 50, condition: 'sweaty', yday: 103},
  ]

  const mockDayArray = [ 
    {day: 1, icon: 'yam', high: 90, low: 48, condition: 'good', yday: 103},
    {day: 1, icon: 'yam', high: 90, low: 48, condition: 'good', yday: 104},
    {day: 1, icon: 'yam', high: 90, low: 48, condition: 'good', yday: 105},
    {day: 1, icon: 'yam', high: 90, low: 48, condition: 'good', yday: 106},
    {day: 1, icon: 'yam', high: 90, low: 48, condition: 'good', yday: 107},
    {day: 1, icon: 'yam', high: 90, low: 48, condition: 'good', yday: 108},
    {day: 1, icon: 'yam', high: 90, low: 48, condition: 'good', yday: 109},
    {day: 1, icon: 'yam', high: 90, low: 48, condition: 'good', yday: 110},
    {day: 1, icon: 'yam', high: 90, low: 48, condition: 'good', yday: 111},
    {day: 1, icon: 'yam', high: 90, low: 48, condition: 'good', yday: 112},
  ]

  beforeEach(() => {
    wrapper = shallow(<TenDay tenDayArray={ mockDayArray } hours={ mockArray }/>);
  });

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  })

  it('should render Cards', () => {
    expect(wrapper.find('Card').length).toEqual(10);
  })
})

