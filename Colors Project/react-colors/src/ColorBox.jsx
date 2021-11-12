import React from 'react';
import './ColorBox.css';

const ColorBox = (props) => {
  const { name, background } = props;

  return (
    <div className='ColorBox' style={{ background }}>
      <div className='copy-container'>
        <div className='box-content'>
          <span>{name}</span>
        </div>
        <button className='copy-button'>Copy</button>
      </div>
      <span className='see-more'>More</span>
    </div>
  );
};

export default ColorBox;
