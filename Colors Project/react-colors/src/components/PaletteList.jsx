import React from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@mui/styles';
import paletteListStyles from '../styles/PaletteListStyles';

function PaletteList(props) {
  const { classes } = props;

  return (
    <div className={classes.PaletteList}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
        </nav>
        <div className={classes.palettes}>
          {props.palettes.map((palette) => {
            return <MiniPalette key={palette.id} {...palette} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default withStyles(paletteListStyles)(PaletteList);