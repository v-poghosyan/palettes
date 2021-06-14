import React from 'react';
import chroma from 'chroma-js';
import {SortableElement} from 'react-sortable-hoc';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {withStyles} from '@material-ui/styles';
import styles from './styles/DraggableColorBoxStyles';

function DraggableColorBox(props) {

  const {classes, color, name, handleClick} = props;

  return (
    <div className={classes.DraggableColorBox} style={{backgroundColor: color}}>
      <div className={classes.DCB_content}>
        <span
          /* Styling here since need access to state */
          style={{
            color: chroma(props.color).luminance() <= 0.45 ? "white" : "black",
          }}
        >{name.toUpperCase()}
        </span>
        <div 
          onClick={handleClick}
          className={classes.DCB_trash_icon}
          /* Styling here since need access to state */
          style={{
            color: chroma(props.color).luminance() <= 0.45 ? "white" : "black"
          }}
        >
          <FontAwesomeIcon icon={faTrash}/>
        </div>
      </div>
    </div>
  )

}

export default SortableElement(withStyles(styles)(DraggableColorBox));