import React, { useState } from 'react';
import './Palette.css';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

const Palette = (props) => {
  const [level, setLevel] = useState(500);

  const colorBoxes = props.palette.colors[level].map((color) => (
    <ColorBox background={color.hex} name={color.name} />
  ));

  const handleSliderChange = (value) => {
    setLevel(value);
  };

  return (
    <div className='Palette'>
      <Navbar level={level} changeLevel={handleSliderChange} />
      <div className='Palette__colors'>{colorBoxes}</div>
      {/* Footer eventually */}
    </div>
  );
};

export default Palette;
