import React from 'react';
import { shallow } from 'enzyme';

import SevenHour from './SevenHour';

describe( 'SevenHour', () => {
  let wrapper;
  const mockArray = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];

  beforeEach(() => {
    wrapper = shallow(<SevenHour hourlyArray={ mockArray } />);
  });

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render Cards', () => {
    expect(wrapper.find('Card').length).toEqual(7);
  });
});