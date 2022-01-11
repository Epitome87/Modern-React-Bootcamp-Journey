import { withThemeCreator } from '@mui/styles';
import chroma from 'chroma-js';
import sizes from './sizes';

const styles = {
  ColorBox: {
    width: '20%',
    height: (props) => (props.showingFullPalette ? '25%' : '50%'),
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',

    // This works for applying to our copyButton, since it is the only button in ColorBox
    // But this is just a janky workaround to not being able to target .copyButton from here!
    '&:hover button': {
      opacity: '1',
    },

    [sizes.down('lg')]: {
      width: '25%',
      height: (props) => (props.showingFullPalette ? '20%' : '33.3333%'),
    },

    [sizes.down('md')]: {
      width: '50%',
      height: (props) => (props.showingFullPalette ? '10%' : '20%'),
    },

    [sizes.down('xs')]: {
      width: '100%',
      height: (props) => (props.showingFullPalette ? '5%' : '10%'),
    },
  },

  copyText: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.07 ? 'black' : 'white',
  },

  colorName: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.08
        ? 'white'
        : 'rgba(0, 0, 0, 0.6)',
  },

  seeMore: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.7
        ? 'rgba(0, 0, 0, 0.6)'
        : 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },

  copyButton: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.7 ? 'rgba(0,0,0,0.6)' : 'white',
    width: '100px',
    height: '40px', //'30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    outline: 'none',
    backgroundColor: 'transparent', //'rgba(255, 255, 255, 0.3)',
    fontFamily: 'inherit',
    fontSize: '1.2rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: '2px solid rgba(255, 255, 255, 0.8)', //'none',
    opacity: '0',
    textDecoration: 'none',
    transition: 'opacity 0.5s linear',
    borderRadius: '5px',
    cursor: 'pointer',
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
    fontSize: '0.8rem',
  },

  copyOverlay: {
    opacity: '0',
    zIndex: '0',
    width: ' 100%',
    height: ' 100%',
    transition: 'transform 0.6s ease-in-out',
    transform: 'scale(0.1)',
  },

  showOverlay: {
    opacity: '1',
    transform: 'scale(50)',
    zIndex: '10',
    position: 'absolute',
  },

  copyMessage: {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    transform: 'scale(0.1)',
    opacity: '0',
    color: 'white',
    /* Fixes a bug where the last ColorBox in a Palette had its copy-msg element blocking the center ColorBox from being clicked */
    visibility: 'hidden',

    '& h1': {
      fontWeight: '400',
      textShadow: '1px 2px black',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      width: '100%',
      textAlign: 'center',
      marginBttom: '0',
      padding: '1rem',
      textTransform: 'uppercase',

      [sizes.down('xs')]: {
        fontSize: '6rem',
      },
    },

    '& p': {
      fontSize: '2rem',
      fontWeight: '100',
    },
  },

  showCopyMessage: {
    opacity: '1',
    transform: 'scale(1)',
    zIndex: '25',
    transition: 'all 0.4s ease-in-out 0.5s',
    transitionProperty: 'opacity, transform, z-index',
    /* Fixes a bug where the last ColorBox in a Palette had its copy-msg element blocking the center ColorBox from being clicked  */
    visibility: 'visible',
  },
};

export default styles;
