import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import MiniPalette from './MiniPalette';

const styles = {

  PaletteList: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },

  PL_container: {
    width: "80%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap"
  },

  PL_nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white"
  },

  PL_palettes: {
    boxSizing: "border-box",
    width: "100%", /* A row is 100% the width of the container */
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)", /* 3 items going across a row */
    gridGap: "5%" /* (30 + 5 + 30 + 5 + 30)% = 100% */
  }

}

class PaletteList extends Component {

  /* Props received : { palettes: [the seed palettes]} } */

  render() {

    const {classes, palettes} = this.props; /* Extracting prop */

    return(
      <div className={classes.PaletteList}>
        <div className={classes.PL_container}>
          <nav className={classes.PL_nav}>
            <h1>Palettes.io</h1>
          </nav>
          <div className={classes.PL_palettes}>
            {palettes.map(
            (palette) => (<Link to={`/palette/${palette.id}`}><MiniPalette {...palette}/></Link>))} {/* Links to a matching Route "/palette/:id" */}
          </div>
        </div>
      </div>
    );

  }

}

export default withStyles(styles)(PaletteList);