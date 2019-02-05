import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      socket: openSocket('http://localhost:1337'),
      message: 'Waiting for another player',
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          Message: {this.state.message}
        </header>
      </div>
    );
  }
}

export default App;
