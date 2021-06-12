import React from 'react';
import {withStyles} from '@material-ui/styles';

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
    /* When styling CB-see-more, the boxes get spaced out - this line fixes that */
    marginBottom: "-4px",
  }
};

function DraggableColorBox(props) {

  const {classes} = props;

  return (
    <div
      className={classes.DraggableColorBox}
      style={{backgroundColor: props.color}}
    >
      {props.color}
    </div>
  )

}

export default withStyles(styles)(DraggableColorBox)