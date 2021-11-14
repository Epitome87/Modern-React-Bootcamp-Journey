import React, { useState } from 'react';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Easy Clipboard functionality
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@mui/styles';

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
    opacity: '0',
    textDecoration: 'none',
    transition: 'opacity 0.5s linear',
  },
};

const ColorBox = ({
  background,
  name,
  id,
  paletteId,
  showingFullPalette,
  classes,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const changeCopyState = () => {
    setIsCopied(true);

    // Set copy back to false after a few moments
    // TODO: useEffect for this?
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    // Wrap in CopyToClipBoard, which will copy the value of background when Component is clicked
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className={classes.ColorBox} style={{ background }}>
        <div
          className={`copy-overlay ${isCopied ? 'show' : ''}`}
          style={{ background }}
        />
        <div className={`copy-msg ${isCopied ? 'show' : ''}`}>
          <h1>Copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={(event) => event.stopPropagation()}
          >
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default withStyles(styles)(ColorBox);
