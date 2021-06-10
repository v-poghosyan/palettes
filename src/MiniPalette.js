/* MiniPalette is a functional, instead of a class, component. It's stateless, and has no methods. It just returns HTML based on props. */
import React from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {
  main: {
    backgroundColor: "purple",
    border: "3px solid yellow"
  }
}

function MiniPalette(props) {

  const {classes} = props; /* Extracting classes from props */

  return (
    <div className={classes.main}>
      <h1>MiniPalette</h1>
    </div>
  );

}

/* MiniPalette is a HOC, it receives 'styles' as a part of its props at initiation */
export default withStyles(styles)(MiniPalette);
