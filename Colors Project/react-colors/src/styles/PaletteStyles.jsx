import sizes from './sizes';

const styles = {
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  PaletteColors: {
    height: '90%',
    overflow: 'hidden',
  },

  goBack: {
    width: '20%',
    height: '50%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    marginBottom: '-3.5px',
    opacity: 1,
    backgroundColor: 'black',

    '& a': {
      color: 'white',
      width: '100px',
      height: '30px',
      position: 'absolute',
      display: 'inline-block',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      outline: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      fontFamily: 'inherit',
      fontSize: '1rem',
      lineHeight: '30px',
      textTransform: 'uppercase',
      border: 'none',
      textDecoration: 'none',
      transition: 'opacity 0.5s linear',
    },

    [sizes.down('lg')]: {
      width: '75%',
      height: '33.3333%',
    },

    [sizes.down('md')]: {
      width: '50%',
      height: '20%',
    },

    [sizes.down('xs')]: {
      width: '100%',
      height: '10%',
    },
  },
};

export default styles;
