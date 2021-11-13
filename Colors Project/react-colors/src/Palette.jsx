import React, { useState } from 'react';
import './Palette.css';
import ColorBox from './ColorBox';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

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
      <div className='slider'>
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          step={100}
          onAfterChange={handleSliderChange}
        />
      </div>

      {/* Navbar goes here */}
      <div className='Palette__colors'>{colorBoxes}</div>
      {/* Footer eventually */}
    </div>
  );
};

export default Palette;
