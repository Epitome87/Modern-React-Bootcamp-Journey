import React from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@mui/styles';

const styles = {
  root: {
    backgroundColor: 'blue',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirectoin: 'column',
    flexWrap: 'wrap',
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    color: 'white',

    // Colt didn't do this
    '& h1': {
      margin: '1.5rem 0',
    },
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
  },
  link: {
    textDecoration: 'none',
  },
};

function PaletteList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
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

export default withStyles(styles)(PaletteList);
