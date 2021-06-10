import React, { Component } from 'react';
import ColorBox from './ColorBox'; /* We will style ColorBox slightly differently in this component using JSS */
import {withStyles} from '@material-ui/styles';

const styles = {
  SingleColorPalette : {
    height: "100vh",
    width: "100vw"
  }
}

class SingleColorPalette extends Component {

  getShadesOfColor(palette, colorId) { /* Returns the 100,200,...,900 levels of a given color */

    let _shades = [];
    for (let lvl in palette.colors) {
      _shades.push(palette.colors[lvl].find((col) => col.id.slice(0,-4) === colorId.slice(0,-4)));
    }
    return _shades.slice(1); /* Don't need the 50-level color */

  }

  render() {

    const {classes, palette, colorId} = this.props; /* Extracting prop */
    const shades = this.getShadesOfColor(palette, colorId);

    return(
      <div className={classes.SingleColorPalette}>
        {shades.map((col) => 
          <ColorBox 
            key={col.id} 
            name={col.name} 
            background={col.hex}
            moreLink = {false} 
          />)
        }
      </div>
    ); 
  }

}

export default withStyles(styles)(SingleColorPalette);