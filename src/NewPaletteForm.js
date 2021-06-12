import React, { Component } from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {

}

class NewPaletteForm extends Component {


  render() {

    const {classes} = this.props; /* Extract props */

    return(
      <div className={classes.NewPaletteForm}>
        <h1>New Palette Form, yo!</h1>
      </div>
    );
  }

}

export default withStyles(styles)(NewPaletteForm);