import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import {SortableContainer} from 'react-sortable-hoc';

function DraggableColorList(props) {

  return (
    <div style={{height: "100%"}}>
      {/* Array index needed for each SortableElement for proper order */}
      {props.colors.map((col,idx) => 
        <DraggableColorBox
          index={idx}
          color={col.color} 
          name={col.name}
          key={col.name}
          handleClick={() => props.deleteColor(col.name)} /* passing deleteColor() from the outer lexical environment, since it requires marameters */
        >
        </DraggableColorBox>
      )}
    </div>
  );

}

export default SortableContainer(DraggableColorList); /* Wrapping in a SortableContainer component */