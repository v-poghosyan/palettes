import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import seedPalettes from './seedPalettes'; /* Default palettes */
import {generatePalette} from './colorHelpers';

class App extends Component {

  render () {
    return (
      <Switch>
        <Route 
          exact 
          path="/" 
          render={() => <h1>List goes here</h1>}></Route>
        <Route 
          exact 
          path="/palette/:id" 
          render={() => <h1>Palette here</h1>}></Route>
      </Switch>
      
      // <div className="App">
      //   <Palette palette={generatePalette(seedPalettes[1])} />
      // </div>
    )

  }
  
}

export default App;