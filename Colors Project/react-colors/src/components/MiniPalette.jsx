import React from 'react';
import { withStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import miniPaletteStyles from "../styles/MiniPaletteStyles";

function MiniPalette(props) {
  const { classes } = props;
  const navigate = useNavigate();

  const miniColorBoxes = props.colors.map((color) => {
    return (
      <div
        key={color.name}
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
      />
    );
  });

  return (
    <div
      className={classes.root}
      onClick={() => navigate(`/palette/${props.id}`)}
      //   onClick={() => props.handleClick(props.id)}
    >
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {props.paletteName}
        <span className={classes.emoji}>{props.emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(miniPaletteStyles)(MiniPalette);
