import React from 'react';
import { withStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import miniPaletteStyles from '../styles/MiniPaletteStyles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function MiniPalette({
  classes,
  colors,
  id,
  paletteName,
  emoji,
  handleDelete,
}) {
  const navigate = useNavigate();

  const handleDeletePalette = (event) => {
    event.stopPropagation();

    // Call PaletteList's callback, which will then call App's!
    console.log('MINI ID:', id);
    handleDelete(id);
  };

  const miniColorBoxes = colors.map((color) => {
    return (
      <div
        key={color.name}
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
      />
    );
  });

  return (
    <div className={classes.root} onClick={() => navigate(`/palette/${id}`)}>
      <DeleteForeverIcon
        className={classes.deleteIcon}
        onClick={handleDeletePalette}
      />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(miniPaletteStyles)(MiniPalette);
