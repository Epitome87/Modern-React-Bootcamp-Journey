import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import miniPaletteStyles from '../styles/MiniPaletteStyles';

const MiniPalette = React.memo(
  ({ classes, colors, id, paletteName, emoji, openDialog, handleDelete }) => {
    const navigate = useNavigate();

    const handleDeletePalette = useCallback((event) => {
      event.stopPropagation();

      // Call PaletteList's callback, which will then call App's!
      // handleDelete(id);
      openDialog(id);
    }, []);

    const handleClickPalette = useCallback(() => {
      navigate(`/palette/${id}`);
    }, []);

    const miniColorBoxes = colors.map((color) => {
      return (
        <div
          key={color.name}
          className={classes.miniColor}
          style={{ backgroundColor: color.color }}
        />
      );
    });

    console.log('rendering', paletteName);

    return (
      <div className={classes.root} onClick={handleClickPalette}>
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
);

export default withStyles(miniPaletteStyles)(MiniPalette);
