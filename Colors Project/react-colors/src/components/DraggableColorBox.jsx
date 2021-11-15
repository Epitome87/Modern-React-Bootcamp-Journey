import React from 'react';
import { withStyles } from '@mui/styles';
import draggableColorBoxStyles from '../styles/DraggableColorBoxStyles';

function DraggableColorBox({ color, classes }) {
  return <div className={classes.DraggableColorBox}>{color}</div>;
}

export default withStyles(draggableColorBoxStyles)(DraggableColorBox);
