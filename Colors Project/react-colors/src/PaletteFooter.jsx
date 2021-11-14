import React from 'react';
import { withStyles } from '@mui/styles';

const styles = {
  PaletteFooter: {
    backgroundColor: 'white',
    height: '5vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontWeight: 'bold',
  },

  PaletteFooterEmoji: {
    fontSize: '1.5rem',
    margin: '0 1rem',
  },
};

function PaletteFooter({ palette, classes }) {
  return (
    <footer className={classes.PaletteFooter}>
      {palette.paletteName}
      <span className={classes.PaletteFooterEmoji}>{palette.emoji}</span>
    </footer>
  );
}

export default withStyles(styles)(PaletteFooter);
