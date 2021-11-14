import React, { useState } from 'react';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Easy Clipboard functionality
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';

const ColorBox = ({ background, name, id, paletteId, showLink }) => {
  const [isCopied, setIsCopied] = useState(false);

  const changeCopyState = () => {
    setIsCopied(true);

    // Set copy back to false after a few moments
    // TODO: useEffect for this?
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.07;

  return (
    // Wrap in CopyToClipBoard, which will copy the value of background when Component is clicked
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className='ColorBox' style={{ background }}>
        <div
          className={`copy-overlay ${isCopied ? 'show' : ''}`}
          style={{ background }}
        />
        <div className={`copy-msg ${isCopied ? 'show' : ''}`}>
          <h1>Copied!</h1>
          <p className={isLightColor ? 'dark-text' : ''}>{background}</p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span className={isDarkColor ? 'light-text' : ''}>{name}</span>
          </div>
          <button className={`copy-button ${isLightColor && 'dark-text'}`}>
            Copy
          </button>
        </div>
        {showLink && (
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={(event) => event.stopPropagation()}
          >
            <span className={`see-more ${isLightColor && 'dark-text'}`}>
              MORE
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
