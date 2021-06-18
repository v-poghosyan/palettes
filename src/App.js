import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import seedPalettes from './seedPalettes'; /* Default palettes */
import {generatePalette} from './colorHelpers';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import './styles/index.css';

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
    this.setState({palettes: [...this.state.palettes, newPal]}, this.syncToLocalStorage); /* Sync to localStorage after setting the state as a call-back */
  }

  syncToLocalStorage()  { /* Saves palettes in the state to localStorage */
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  render () {
    return (
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={300}>
            <Switch location={location}>
              <Route 
                exact
                path="/palette/new"
                render={(routeProps) => (
                  <Page>
                    <NewPaletteForm 
                      {...routeProps} 
                      palettes={this.state.palettes} 
                      savePalette={this.savePalette}
                    />
                  </Page>
                )}
              />
              <Route 
                exact 
                path="/" 
                render={() => (
                  <Page>
                    <PaletteList 
                      palettes={this.state.palettes} 
                      deletePalette={this.deletePalette}
                    />
                  </Page>
                )}
              />
              {/* Lines 26-27: Get starter palette based on the URL id, then generate new palette (with levels and formats). */} 
              {/* Then pass it in as the palette prop to the component */}
              <Route 
                exact 
                path="/palette/:id"
                render={routeProps => (
                  <Page>
                    <Palette 
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.id)
                      )}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={routeProps => (
                  <Page>
                    <SingleColorPalette 
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                      )}
                      colorId={routeProps.match.params.colorId}
                    />
                  </Page>
                )}
              />
              {/* 404 */}
              <Route 
                render={() => (
                  <Page>
                    <PaletteList 
                      palettes={this.state.palettes} 
                      deletePalette={this.deletePalette}
                    />
                  </Page>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}/>
    )

  }
  
}

export default App;