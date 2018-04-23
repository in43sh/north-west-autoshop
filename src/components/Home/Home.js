import React, { Component } from 'react';
import Top from '../Top/Top';
import Contact from '../Contact/Contact';

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <Top />
        <Contact />
        
      </div>
    );
  }
}