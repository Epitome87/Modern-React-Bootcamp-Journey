import React from 'react';
import './Palette.css';
import ColorBox from './ColorBox';

const Palette = (props) => {
  const colorBoxes = props.colors.map((color) => (
    <ColorBox background={color.color} name={color.name} />
  ));

  return (
    <div className='Palette'>
      {/* Navbar goes here */}
      <div className='Palette__colors'>{colorBoxes}</div>
      {/* Footer eventually */}
    </div>
  );
};

export default Palette;
