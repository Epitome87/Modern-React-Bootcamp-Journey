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

    '&:hover': {
      cursor: 'pointer',
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
};

export default styles;