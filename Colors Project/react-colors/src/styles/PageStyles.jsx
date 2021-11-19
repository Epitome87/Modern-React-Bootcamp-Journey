const styles = {
  Page: {
    height: '100vh',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    transition: 'opacity 0.5s ease-in-out',
  },

  '@global': {
    '.Page-enter': {
      opacity: 0,
      // zIndex: 1,
    },
    '.Page-enter.Page-enter-active': {
      opacity: 1,
      transition: 'opacity 500ms ease-in',
    },
    '.Page-exit': {
      opacity: 1,
    },
    '.Page-exit.Page-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms ease-in',
    },
    '.Page-exit-done': {
      opacity: 0,
    },
  },
};

export default styles;
