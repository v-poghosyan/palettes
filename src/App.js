import React, { Component } from 'react';
import Palette from './Palette';
import seedPalettes from './seedPalettes'; /* Default palettes */
import {generatePalette} from './colorHelpers';

class App extends Component {

  render () {
    console.log(generatePalette(seedPalettes[4]));
    return (
      <div className="App">
        <Palette {...seedPalettes[0]} /> {/* Passing all the props of a palette separately */ }
      </div>
    )

  }
  
}

export default App;