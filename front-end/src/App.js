import React, { Component } from 'react';
import LogIn from './components/LogIn'
import './App.css'

require('dotenv').config()

class App extends Component {
  render() {
    return (
        <LogIn />
    );
  }
}

export default App;
