import React from 'react';
import { withStyles } from '@mui/styles';
import paletteFooterStyles from '../styles/PaletteFooterStyles';

function PaletteFooter({ palette, classes }) {
  return (
    <footer className={classes.PaletteFooter}>
      {palette.paletteName}
      <span className={classes.PaletteFooterEmoji}>{palette.emoji}</span>
    </footer>
  );
}

export default withStyles(paletteFooterStyles)(PaletteFooter);
