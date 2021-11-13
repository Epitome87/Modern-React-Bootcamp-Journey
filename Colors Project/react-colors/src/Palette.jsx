import React, { useState } from 'react';
import './Palette.css';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

const Palette = (props) => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState('hex');

  const handleSliderChange = (sliderValue) => {
    setLevel(sliderValue);
  };

  const handleChangeFormat = (formatValue) => {
    setFormat(formatValue);
  };

  const colorBoxes = props.palette.colors[level].map((color) => (
    <ColorBox background={color[format]} name={color.name} />
  ));

  return (
    <div className='Palette'>
      <Navbar
        level={level}
        changeLevel={handleSliderChange}
        changeFormat={handleChangeFormat}
      />
      <div className='Palette__colors'>{colorBoxes}</div>
      {/* Footer eventually */}
    </div>
  );
};

export default Palette;
