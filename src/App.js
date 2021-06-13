import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import seedPalettes from './seedPalettes'; /* Default palettes */
import {generatePalette} from './colorHelpers';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {palettes: seedPalettes}
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  findPalette(id) { /* Return starter palette given id */
    return this.state.palettes.find((palette) => palette.id === id);
  }

  savePalette(newPal) { /* Saved user created palette: called inside the NewPaletteForm component, and executes here */
    this.setState({palettes: [...this.state.palettes, newPal]});
  }

  render () {
    return (
      <Switch>
        <Route 
          exact
          path="/palette/new"
          render={(routeProps) => 
            <NewPaletteForm 
              {...routeProps} 
              palettes={this.state.palettes} 
              savePalette={this.savePalette}
            />
          }
        />
        <Route 
          exact 
          path="/" 
          render={() => <PaletteList palettes={this.state.palettes}/>}
        />
        {/* Lines 26-27: Get starter palette based on the URL id, then generate new palette (with levels and formats). */} 
        {/* Then pass it in as the palette prop to the component */}
        <Route 
          exact 
          path="/palette/:id"
          render={routeProps => 
            <Palette 
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          }
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => 
            <SingleColorPalette 
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
              colorId={routeProps.match.params.colorId}
            />
          }
        />
      </Switch>
    )

  }
  
}

export default App;