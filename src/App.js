import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
import KeyboardEventHandler from 'react-keyboard-event-handler';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      socket: openSocket('http://localhost:1337'),
      cats: [],
      message: 'Waiting for another player',
      player: {
        x: 250,
        y: 250,
      },
      playerNumber: 0,
    }
    this.state.socket.on("place cat", (cat) => this.placeCat(cat) );
    this.state.socket.on("player number", (playerNumber) => this.setPlayerNumber(playerNumber) );
    this.sendCollect = this.sendCollect.bind( this );
    this.setPlayerNumber = this.setPlayerNumber.bind( this );
    this.placeCat = this.placeCat.bind( this );
    this.keyPressed = this.keyPressed.bind( this );
  }

  sendCollect() {
    //console.log( "Sending collection to server" );
    this.state.socket.emit( "collect", "cat" );
  }

  setPlayerNumber( playerNumber ) {
    this.setState( { playerNumber } );
  }

  /*
   * Generates a new cat on the play field.
   */
  placeCat(cat) {
    //console.log( "Placing cat " + cat );
    this.setState( { cats: [...this.state.cats, cat] } );
  }

  /*
   * Handles keyboard events, particularly player control.
   */
  keyPressed( key ) {
    if( key === 'w' ) {
      this.setState( { player: { x: this.state.player.x, y: this.state.player.y - 10 } } );
    }
    else if( key === 'a' ) {
      this.setState( { player: { x: this.state.player.x - 10, y: this.state.player.y } } );
    }
    else if( key === 's' ) {
      this.setState( { player: { x: this.state.player.x, y: this.state.player.y + 10 } } );
    }
    else if( key === 'd' ) {
      this.setState( { player: { x: this.state.player.x + 10, y: this.state.player.y } } );
    }
    else if( key === ' ' ) {
      this.state.socket.emit( "collect", "cat" );
    }
  }

  render() {
    const catImages = this.state.cats.map( (cat, index) => {
      const catStyle = { left: cat.x, top: cat.y };
      return <img src="/images/catwalkx4.gif" style={catStyle} className="Cat"
          alt={"cat" + index} key={"cat" + index} />
    });
    const playerStyle = {
        position: 'absolute',
        left: this.state.player.x,
        top: this.state.player.y,
        width: '60px',
        height: '75px',
    };
    let playerImgUrl = `/images/cat-player-${this.state.playerNumber}.png`;
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => this.sendCollect()}>Collect</button>
          Player: {this.state.playerNumber} Message: {this.state.message}
        </header>
        {catImages}
        <img src={playerImgUrl} alt="player" style={playerStyle} />
        <KeyboardEventHandler
          handleKeys={['w', 'a', 's', 'd', ' ']}
          onKeyEvent={(key, e) => this.keyPressed(key)} />
      </div>
    );
  }
}

export default App;
