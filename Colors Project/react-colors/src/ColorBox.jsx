import React from 'react';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Easy Clipboard functionality

const ColorBox = (props) => {
  const { name, background } = props;

  return (
    // Wrap in CopyToClipBoard, which will copy the value of background when Component is clicked
    <CopyToClipboard text={background}>
      <div className='ColorBox' style={{ background }}>
        <div className='copy-container'>
          <div className='box-content'>
            <span>{name}</span>
          </div>
          <button className='copy-button'>Copy</button>
        </div>
        <span className='see-more'>More</span>
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
