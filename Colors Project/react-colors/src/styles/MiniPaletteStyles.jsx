const styles = {
  root: {
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',

    // colt doesn't do this
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',

    transition: 'transform 0.3s ease-in-out',

    '&:hover': {
      transform: 'scale(1.1)',
    },

    '&:hover svg': {
      opacity: 1,
    },
  },

  colors: {
    backgroundColor: '#dae1e5',
    height: '150px',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
  },

  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.2rem 0 0', // Colt does 0
    color: 'black',
    // paddingTop: '0.5rem', // Colt does 0.5rem
    // paddingBottom: '0.5rem', // Colt doesn't set this
    fontSize: '1rem',
    position: 'relative',
  },

  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem',
  },

  miniColor: {
    height: '25%',
    width: '20%',
    display: 'inline-block',
    margin: '0 auto',
    position: 'relative',
    marginBottom: '-3.5px',
  },

  deleteIcon: {
    color: 'white',
    backgroundColor: '#eb3d30',
    width: '25px',
    height: '25px',
    position: 'absolute',
    right: '0',
    top: '0',
    // padding: '10px',
    fontSize: '35px !important',
    borderRadius: '3px',
    zIndex: 10,
    opacity: 0,
    transition: '0.5s ease-in-out !important',
  },
};

export default styles;
