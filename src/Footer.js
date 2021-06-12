import React from 'react';
import {withStyles} from '@material-ui/styles';
import styles from './styles/FooterStyles';

function Footer(props) {

  const {classes, name, emoji} = props;

  return(
    <footer className={classes.Pal_footer}>
      <span className={classes.Pal_name}>{name}</span>
      <span className={classes.Pal_emoji}>{emoji}</span>
    </footer>
  );
  
}

export default withStyles(styles)(Footer); 