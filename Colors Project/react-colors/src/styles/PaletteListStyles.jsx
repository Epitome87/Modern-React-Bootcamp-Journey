import sizes from './sizes';
import bg from './bg.svg';

const styles = {
  PaletteList: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#3d2de6',
    backgroundImage: `url(${bg})`,
    /* background by SVGBackgrounds.com */
    overflow: 'scroll',
    marginBottom: '5rem',
    paddingBottom: '4rem',

    '& a': {
      textDecoration: 'none',
    },
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

  '@global': {
    '.fade-exit': {
      opacity: 1,
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity 0.5s ease-out',
    },
    // '.fade-exit': {
    //   left: 0,
    // },
    // '.fade-exit-active': {
    //   left: '-100%',
    //   transition: 'all 0.5s ease-out',
    // },
    // '.fade-enter': {
    //   left: '-100%',
    // },
    // '.fade-enter-active': {
    //   left: '0',
    //   transition: 'all 0.5s ease-in',
    // },
  },
};

export default styles;
