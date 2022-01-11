import sizes from './sizes';

const styles = {
  Navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '6vh',
  },

  NavbarLogo: {
    marginRight: '15px',
    padding: '0 13px',
    fontSize: '1.25rem',
    backgroundColor: '#eceff1',
    fontFamily: 'Roboto, sans-serif',
    height: '100%',
    display: 'flex',
    alignItems: 'center',

    '& a': {
      textDecoration: 'none',
      color: 'black',
    },

    [sizes.down('xs')]: {
      display: 'none',
    },
  },

  NavbarSlider: {
    width: '340px',
    margin: '0 10px',
    display: 'inline-block',

    '& .rc-slider-track': {
      backgroundColor: 'transparent',
    },

    '& .rc-slider-rail': {
      height: '8px',
    },

    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus .rc-slider-handle:hover':
      {
        backgroundColor: 'green',
        outline: 'none',
        border: '2px solid green',
        boxShadow: 'none',
        width: '13px',
        height: '13px',
        marginLeft: '-7px',
        marginTop: '-3px',
      },

    [sizes.down('sm')]: {
      width: '150px',
    },
  },

  NavbarSelectContainer: {
    margin: '0.3rem 1rem 0.3rem auto',
  },
};

export default styles;
