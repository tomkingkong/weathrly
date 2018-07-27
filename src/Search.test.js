import React from 'react';
import { shallow, mount } from 'enzyme';

import Search from './Search';

describe( 'Search', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Search />);
  });

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('Should have an intial userLocInput of an empty string', () => {
    expect(wrapper.state().userLocInput).toEqual('');
  });

  it('Should have an intial suggestions of an empty string', () => {
    expect(wrapper.state().suggestions).toEqual([]);
  });

  it('should instantiate a new trie with data', () => {
    expect(wrapper.instance().locTrie).toBeDefined();
    expect(wrapper.instance().locTrie.wordCount).toEqual(1000);
  });

  it('should have a method of displaySuggestions', () => {
    expect(wrapper.instance().displaySuggestions).toBeDefined();
  });

  it('should have a method of returnError', () => {
    expect(wrapper.instance().returnError).toBeDefined();
  });

  it('should render a form with text, submit inputs and empty datalist', () => {
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(2);
    expect(wrapper.find('datalist').length).toEqual(1);
    expect(wrapper.find('option').length).toEqual(0);

  });

  it('Should update state when user types a location', () => {
    let userInput = wrapper.find('input').first();
    let event = {
      target: {
        value: 'foo'
      }
    }

    userInput.simulate('change', event);

    expect(wrapper.state().userLocInput).toEqual('FOO');
  });

  it('should update suggestion array with valid input on change', () => {
    let userInput = wrapper.find('input').first();
    let event = {
      target: {
        value: 'denv'
      }
    }

    userInput.simulate('change', event);

    expect(wrapper.state().suggestions).toEqual(['DENVER, CO']);
  });

  it('should have empty suggestion array if invalid input', () => {
    let userInput = wrapper.find('input').first();
    let event = {
      target: {
        value: 'foo'
      }
    }

    userInput.simulate('change', event);

    expect(wrapper.state().suggestions.length).toEqual(0);
  });

  it('should render displaySuggestions with suggestions array', () => {
    let userInput = wrapper.find('input').first();
    let event = {
      target: {
        value: 'den'
      }
    }

    userInput.simulate('change', event);
    expect(wrapper.find('option').length).toEqual(2);
  });

  it('should call updateLocation on submit and reset input', () => {
    let mockFn = jest.fn();
    wrapper = mount(<Search updateLocation={ mockFn } />);

    wrapper.instance().setState({userLocInput: 'Foo'});
    let submitButton = wrapper.find('.submit-input');

    submitButton.simulate('submit');
    expect(wrapper.props().updateLocation).toHaveBeenCalled();
    expect(wrapper.props().updateLocation).toHaveBeenCalledTimes(1);

    expect(wrapper.state().userLocInput).toEqual('');
  });

  it('should display error message with invalid location if search not found', () => {
    wrapper = mount(<Search ifError={ true } loc={'Foo'}/>);
    
    expect(wrapper.find('h3').text()).toEqual('Foo could not be found :( ');
  });

});