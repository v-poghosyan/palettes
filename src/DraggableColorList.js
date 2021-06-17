import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import {SortableContainer} from 'react-sortable-hoc';
import {withStyles} from '@material-ui/styles';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import styles from './styles/DraggableColorListStyles';

function DraggableColorList(props) {

  const {classes} = props; /* Extracting props */

  return (
    <TransitionGroup className={classes.DraggableColorList}>
      {/* Array index needed for each SortableElement for proper order */}
      {props.colors.map((col,idx) => (
        <CSSTransition key={col.name} classNames="fade" timeout={300}>
          <DraggableColorBox
            index={idx}
            color={col.color} 
            name={col.name}
            key={col.name}
            handleClick={() => props.deleteColor(col.name)} /* passing deleteColor() from the outer lexical environment, since it requires marameters */
          >
          </DraggableColorBox>
        </CSSTransition>)
      )}
     </TransitionGroup>
  );

}

export default withStyles(styles)(SortableContainer(DraggableColorList)); /* Wrapping in a SortableContainer component */