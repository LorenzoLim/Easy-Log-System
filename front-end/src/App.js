import React, { Component } from 'react';
import './App.css'
import LogIn from './components/LogIn'

require('dotenv').config()


class App extends Component {
  render() {
    return (
      <div className="App">
        <LogIn />
      </div>
    );
  }
}

export default App;
