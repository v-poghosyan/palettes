import React, { PureComponent } from 'react';
import {withStyles} from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';

/* Props received : { classes: "unique JSS class id", paletteName: "name of one palette", id: "id of one palette", colors: {...} } */

class MiniPalette extends PureComponent{

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(evt) {
    evt.preventDefault(); /* stopPropagation() did not work, using this instead */
    this.props.deletePalette(this.props.id);
  }

  render() {
    const {classes, paletteName, emoji, colors } = this.props; /* Extracting props */

    return (
      <div className={classes.MiniPalette}>
          <DeleteIcon 
            className={classes.MP_delete_icon} 
            onClick={this.handleDelete} 
          />
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

}

/* MiniPalette is a HOC, it receives 'styles' as a part of its props at initiation */
export default withStyles(styles)(MiniPalette);
