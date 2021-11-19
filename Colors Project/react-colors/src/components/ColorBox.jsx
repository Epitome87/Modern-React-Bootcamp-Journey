import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Easy Clipboard functionality
import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import colorBoxStyles from '../styles/ColorBoxStyles';
import classNames from 'classnames';

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
          className={classNames(classes.copyOverlay, {
            [classes.showOverlay]: isCopied,
          })}
          style={{ background }}
        />
        <div
          className={classNames(classes.copyMessage, {
            [classes.showCopyMessage]: isCopied,
          })}
        >
          <h1>Copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
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

export default withStyles(colorBoxStyles)(ColorBox);
