const styles = {
  DraggableColorBox: {
    backgroundColor: (props) => props.color,
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',

    // Seem to need to do this, rather than relying on the deleteIcon class
    '& svg': {
      color: 'rgba(0, 0, 0, 0.5)',
      transition: 'all 0.3s ease-in-out',
    },

    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)',
    },
  },

  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '10px',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',

    // Unique to DraggableColorBox over ColorBox
    display: 'flex',
    alignItems: "center",
    justifyContent: 'space-between',
  },

  // Applies properly to the DeleteForeverIcon, but doesn't allow our "&:hover svg" class to transition properly
  // deleteIcon: {
  // color: 'rgba(0, 0, 0, 0.5)',
  // transition: 'all 1s ease-in-out',
  // },
};

export default styles;
