import React, { Component } from 'react';
import Palette from './Palette';
import seedPalettes from './seedPalettes'; /* Default palettes */
import {generatePalette} from './colorHelpers';

class App extends Component {

  render () {
    return (
      <div className="App">
        <Palette palette={generatePalette(seedPalettes[1])} />
      </div>
    )

  }
  
}

export default App;