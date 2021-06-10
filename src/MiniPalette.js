/* MiniPalette is a functional, instead of a class, component. It's stateless, and has no methods. It just returns HTML based on props. */
import React from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {

  MiniPalette: {
    backgroundColor: "white",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    border: "1px solid gray",
    "&:hover" : {
      cursor: "pointer"
    }
  },

  MP_colors: {
    backgroundColor: "gray"
  },

  MP_title : {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative"
  },

  MP_emoji: {
    marginLeft: "0.5rem"
  }
}

/* Props received : { classes: "unique JSS class id", paletteName: "name of one palette", id: "id of one palette", colors: {...} } */

function MiniPalette(props) {

  const {classes, paletteName, emoji } = props; /* Extracting props */

  return (
    <div className={classes.MiniPalette}>
      <div className={classes.MP_colors}>

      </div>
      <h5 className={classes.MP_title}>{paletteName}
        <span className={classes.MP_emoji}>{emoji}</span>
      </h5> 
    </div>
  );

}

/* MiniPalette is a HOC, it receives 'styles' as a part of its props at initiation */
export default withStyles(styles)(MiniPalette);
