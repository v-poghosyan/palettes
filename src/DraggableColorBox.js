import React from 'react';
import chroma from 'chroma-js';
import {SortableElement} from 'react-sortable-hoc';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {withStyles} from '@material-ui/styles';
import nested from 'jss-plugin-nested';
import jss from 'jss';

jss.use(nested());

const styles = {
  DraggableColorBox: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    /* Inline-block elements accept both width and height properties */ 
    display: "inline-block",
    /* Positioning relatively means positioning relative to the element's normal (flow) position - Enables top/right/bottom/left properies */
    position: "relative",
    cursor: "pointer",
    marginBottom: "-5px",
    "&:hover $DCB_trash_icon": {
      transform: "scale(1.2)"
    }
  },

  DCB_content: {
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    TextTransform: "uppercase",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    "& span" : {
      color: props => chroma(props.color).luminance() <= 0.45 ? "white" : "black",
    }
  },

  DCB_trash_icon: {

  },

};

function DraggableColorBox(props) {

  const {classes, color, name, handleClick} = props;

  return (
    <div className={classes.DraggableColorBox} style={{backgroundColor: color}}>
      <div className={classes.DCB_content}>
        <span>{name.toUpperCase()}</span>
        <div 
          className={classes.DCB_trash_icon}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faTrash}/>
        </div>
      </div>
    </div>
  )

}

export default SortableElement(withStyles(styles)(DraggableColorBox));