import React from 'react';
import { withStyles } from '@mui/styles';
import draggableColorBoxStyles from '../styles/DraggableColorBoxStyles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function DraggableColorBox({ color, name, classes, handleDelete }) {
  const deleteColor = () => {
    // Delete this item from parent's (NewPaletteForm) color array
    handleDelete(name);
  };

  return (
    <div className={classes.DraggableColorBox} onClick={deleteColor}>
      <div className={classes.boxContent}>
        <span>
          {name} - {color}
        </span>
        <span className={classes.deleteIcon}>
          <DeleteForeverIcon />
        </span>
      </div>
    </div>
  );
}

export default withStyles(draggableColorBoxStyles)(DraggableColorBox);
