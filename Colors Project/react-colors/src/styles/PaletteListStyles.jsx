import sizes from './sizes';
import bg from './bg.svg';

const styles = {
  PaletteList: {
    backgroundColor: 'blue',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#3d2de6',
    backgroundImage: `url(${bg})`,
    /* background by SVGBackgrounds.com */
    overflow: 'scroll',
  },

  title: {
    fontSize: '2rem',
  },

  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirectoin: 'column',
    flexWrap: 'wrap',

    [sizes.down('xl')]: {
      width: '80%',
    },

    [sizes.down('xl')]: {
      width: '75%',
    },
  },

  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',

    // Colt didn't do this
    '& h1': {
      margin: '1.5rem 0',
    },

    '& a': {
      color: 'white',
    },
  },

  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '2.5rem',

    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 50%)',
    },

    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
      gridGap: '1.4rem',
    },
  },

  link: {
    textDecoration: 'none',
  },
};

export default styles;
