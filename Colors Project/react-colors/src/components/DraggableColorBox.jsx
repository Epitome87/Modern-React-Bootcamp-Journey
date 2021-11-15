import React from 'react';
import { withStyles } from '@mui/styles';
import draggableColorBoxStyles from '../styles/DraggableColorBoxStyles';

function DraggableColorBox({ color, name, classes }) {
  return (
    <div className={classes.DraggableColorBox}>
      {color} - {name}
    </div>
  );
}

export default withStyles(draggableColorBoxStyles)(DraggableColorBox);
