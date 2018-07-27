import React, { Component } from 'react';

import './Search.css'

import Trie from './Trie.js';
const { capData } = require('./cities.js')

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocInput: '',
      suggestions: []
    }

    this.locTrie = new Trie();
    this.locTrie.populate(capData);
  }

  returnError = () => {
    const { ifError, loc } = this.props;

    if (ifError && loc !== undefined) return <h3>{loc} could not be found :( </h3>
  }

  displaySuggestions = () => {
    return this.state.suggestions.map(suggestion => <option key={suggestion} value={suggestion} />)
  }

  render() {
    const { userLocInput } = this.state;

    return (
      <form className="Search" onSubmit={ (e) => {
        e.preventDefault();
        this.props.updateLocation(userLocInput)
        this.setState({
          userLocInput: ''
        })
      }}>
          <input 
            id="locate"
            list="locations"
            placeholder="CITY, STATE / ZIP"
            type="text" 
            autoComplete="off"
            value={userLocInput}
            onChange={ (e) => {
              let value = e.target.value.toUpperCase()
              let options = this.locTrie.getSuggestions(value).slice(0, 5)
              this.setState({ 
                userLocInput: value,
                suggestions: options
              })
            }}
          />
          <input type="submit" className="submit-input" value=" "/>
        <datalist id="locations" >
          {
            this.displaySuggestions()
          }
        </datalist>
        { this.returnError() }
      </form>
    )
  }
}




