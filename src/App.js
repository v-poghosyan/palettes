import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import seedPalettes from './seedPalettes'; /* Default palettes */
import {generatePalette} from './colorHelpers';
import NewPaletteForm from './NewPaletteForm';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';

class App extends Component {

  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes")); /* Get palettes from localStorage */
    this.state = {palettes: savedPalettes || seedPalettes} /* If no palettes in localStorage, load state from seedPalettes instead */
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) { /* Return starter palette given id */
    return this.state.palettes.find((palette) => palette.id === id);
  }

  deletePalette(id) { /* Deletes user palette & syncs with localStorage: called inside the MiniPalette component, and executed here */
    this.setState( state => ({...this.state, palettes: state.palettes.filter((palette) => palette.id !== id)}), this.syncToLocalStorage);
  }

  savePalette(newPal) { /* Saved user created palette & syncs with localStorage: called inside the NewPaletteForm component, and executed here */
    this.setState({palettes: [...this.state.palettes, newPal]}, this.syncToLocalStorage);     /* Sync to localStorage after setting the state as a call-back */
  }

  syncToLocalStorage()  { /* Saves palettes in the state to localStorage */
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
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
          render={() => <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette}/>}
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