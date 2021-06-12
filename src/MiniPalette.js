/* MiniPalette is a functional, instead of a class, component. It's stateless, and has no methods. It just returns HTML based on props. */
import React from 'react';
import {withStyles} from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';

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
