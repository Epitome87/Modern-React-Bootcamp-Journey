import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@mui/styles';
import draggableColorBoxStyles from '../styles/DraggableColorBoxStyles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const DraggableColorBox = SortableElement(({ name, classes, handleDelete }) => {
  return (
    <div
      className={classes.DraggableColorBox}
      onClick={handleDelete}
      style={{ margin: '-3px 0' }}
    >
      <div className={classes.boxContent}>
        <span>{name}</span>
        <span className={classes.deleteIcon}>
          <DeleteForeverIcon />
        </span>
      </div>
    </div>
  );
});

export default withStyles(draggableColorBoxStyles)(DraggableColorBox);
