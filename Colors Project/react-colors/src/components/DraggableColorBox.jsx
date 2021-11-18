import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@mui/styles';
import draggableColorBoxStyles from '../styles/DraggableColorBoxStyles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const DraggableColorBox = SortableElement(
  ({ color, name, classes, handleDelete }) => {
    const deleteColor = () => {
      // Delete this item from parent's (NewPaletteForm) color array
      handleDelete(name);
    };

    return (
      <div
        className={classes.DraggableColorBox}
        onClick={deleteColor}
        style={{ margin: "-3px 0" }}
      >
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
);

export default withStyles(draggableColorBoxStyles)(DraggableColorBox);
