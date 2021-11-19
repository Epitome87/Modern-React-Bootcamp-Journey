import sizes from './sizes';

const drawerWidth = 400;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },

  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginLeft: '12px',
    marginRight: '20px',
  },

  navBtns: {
    marginRight: '1rem',
    '& a': {
      textDecoration: 'none',
    },

    [sizes.down('xs')]: {
      marginRight: '0.5rem',
    },
  },

  button: {
    margin: '0 0.5rem',
    [sizes.down('xs')]: {
      margin: '0 0.2rem',
      padding: '0.3rem',
    },
  },

  [sizes.down('xs')]: {
    margin: 0,
  },
});

export default styles;
