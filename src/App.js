import React, { Component } from 'react';
import Top from './components/Top/Top';
import Contact from './components/Contact/Contact';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Top />
        <Contact />
      </div>
    );
  }
}

export default App;
