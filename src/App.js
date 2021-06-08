import React, { Component } from 'react';
import Palette from './Palette';
import seedPalettes from './seedPalettes'; /* Default palettes */

class App extends Component {
  render() {
    return(
      <div className="App">
        <Palette palette={...seedPalettes} /> {/* Passing all the seedPalettes elements separately as props */ }
      </div>
    )
  }
}

export default App;