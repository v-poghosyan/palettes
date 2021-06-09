import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import seedPalettes from './seedPalettes'; /* Default palettes */
import {generatePalette} from './colorHelpers';

class App extends Component {

  findPalette(id) { /* Return starter palette given id */
    return seedPalettes.find((palette) => palette.id === id);
  }

  render () {
    return (
      <Switch>
        <Route 
          exact 
          path="/" 
          render={() => <h1>List goes here</h1>}
        />
        {/* Lines 26-27: Get starter palette based on the URL id, then generate new palette (with levels and formats). */} 
        {/* Then pass it in as the palette prop to the component */}
        <Route 
          exact 
          path="/palette/:id"
          render={routeProps => (
            <Palette 
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        /> 
      </Switch>
      
      // <div className="App">
      //   <Palette palette={generatePalette(seedPalettes[1])} />
      // </div>
    )

  }
  
}

export default App;