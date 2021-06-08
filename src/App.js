import React, { Component } from 'react';
import Palette from './Palette';
import seedPalettes from './seedPalettes'; /* Default palettes */

class App extends Component {

  render () {

    return (
      <div className="App">
        <Palette {...seedPalettes[0]} /> {/* Passing all the props of a palette separately */ }
      </div>
    )

  }
  
}

export default App;