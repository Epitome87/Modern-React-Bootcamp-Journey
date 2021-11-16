import React from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@mui/styles';
import paletteListStyles from '../styles/PaletteListStyles';

function PaletteList({ classes, palettes, handleDelete }) {
  return (
    <div className={classes.PaletteList}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to='/palette/new'>Create New Palette</Link>
        </nav>
        <div className={classes.palettes}>
          {palettes.map((palette) => {
            return (
              <MiniPalette
                key={palette.id}
                {...palette}
                palettes={palettes}
                handleDelete={handleDelete}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default withStyles(paletteListStyles)(PaletteList);
