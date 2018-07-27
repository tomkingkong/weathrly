import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header.js';

describe( 'Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should display header and h1 elements', () => {
    expect(wrapper.find('header').length).toEqual(1);
    expect(wrapper.find('h1').length).toEqual(1);
  });
})
