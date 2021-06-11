/* MiniPalette is a functional, instead of a class, component. It's stateless, and has no methods. It just returns HTML based on props. */
import React from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {

  MiniPalette: {
    backgroundColor: "white",
    height: "20vh",
    padding: "0.5rem",
    position: "relative",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    overflow: "hidden",
    marginBottom: "1vh",
    "&:hover" : {
      cursor: "pointer"
    }
  },

  MP_colors: {
    backgroundColor: "white",
    height: "85%"
  },

  MP_title : {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    position: "relative",
  },

  MP_emoji: {
    marginLeft: "0.5rem"
  },

  MP_mini_box: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-4px"
  }
}

/* Props received : { classes: "unique JSS class id", paletteName: "name of one palette", id: "id of one palette", colors: {...} } */

function MiniPalette(props) {

  const {classes, paletteName, emoji, colors } = props; /* Extracting props */

  return (
    <div className={classes.MiniPalette}>
      <div className={classes.MP_colors}>
        {/* Note 1: background style must be applied during the mapping (and not in JSS) as it's different for each mini color box */}
        {/* Note 2: name is unique in seedPalettes and ensured to be unique at the time of adding a new palette, so we can use it as key */}
        {colors.map(col => 
          <div 
            className={classes.MP_mini_box} 
            style={{backgroundColor: col.color}}
            key={col.name}
          />
        )}
      </div>
      <h5 className={classes.MP_title}>{paletteName}
        <span className={classes.MP_emoji}>{emoji}</span>
      </h5> 
    </div>
  );

}

/* MiniPalette is a HOC, it receives 'styles' as a part of its props at initiation */
export default withStyles(styles)(MiniPalette);
