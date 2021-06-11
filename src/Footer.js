import React from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {

  Pal_footer : {
    height: "3%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    zIndex: "30",
    boxShadow: "0 -1px 3px rgba(0,0,0,0.12), 0 -1px 2px rgba(0,0,0,0.24)",
    backgroundColor: "white",
  },
  
  Pal_name : {
    marginLeft: "auto",
    marginRight: "10px",
    fontFamily: "'Montserrat', sans-serif",
  },
  
  Pal_emoji : {
    marginRight: "20px",
    marginTop: "-3px"
  }

}

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