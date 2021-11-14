import React, { useState } from 'react';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Easy Clipboard functionality
import { Link } from 'react-router-dom';

const ColorBox = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const { name, background } = props;

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
      <div className='ColorBox' style={{ background }}>
        <div
          className={`copy-overlay ${isCopied && 'show'}`}
          style={{ background }}
        />
        <div className={`copy-msg ${isCopied && 'show'}`}>
          <h1>Copied!</h1>
          <p>{background}</p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span>{name}</span>
          </div>
          <button className='copy-button'>Copy</button>
        </div>
        <Link to='/' onClick={(event) => event.stopPropagation()}>
          <span className='see-more'>More</span>
        </Link>
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
