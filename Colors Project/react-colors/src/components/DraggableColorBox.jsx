import React from 'react';
import { withStyles } from '@mui/styles';
import draggableColorBoxStyles from '../styles/DraggableColorBoxStyles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function DraggableColorBox({ color, name, classes }) {
  return (
    <div className={classes.DraggableColorBox}>
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
