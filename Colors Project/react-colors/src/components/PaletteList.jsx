import React from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@mui/styles';
import paletteListStyles from '../styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function PaletteList({ classes, palettes, handleDelete }) {
  return (
    <div className={classes.PaletteList}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.title}>React Colors</h1>
          <Link to='/palette/new'>Create New Palette</Link>
        </nav>

        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => {
            return (
              <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                <MiniPalette
                  key={palette.id}
                  {...palette}
                  palettes={palettes}
                  handleDelete={handleDelete}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    </div>
  );
}

export default withStyles(paletteListStyles)(PaletteList);
