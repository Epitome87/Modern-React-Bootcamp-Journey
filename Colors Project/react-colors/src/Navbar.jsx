import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';
import { Select, MenuItem } from '@mui/material';

function Navbar(props) {
  const [format, setFormat] = useState('hex');

  const handleChange = (event) => {
    setFormat(event.target.value);
    // Call Palette component's format handler
    props.changeFormat(event.target.value);
  };

  return (
    <header className='Navbar'>
      <div className='logo'>
        <a href='/'>React-Color-Picker</a>
      </div>
      <div className='slider-container'>
        <span>Level: {props.level}</span>
        <div className='slider'>
          <Slider
            defaultValue={props.level}
            min={100}
            max={900}
            step={100}
            onAfterChange={props.changeLevel}
          />
        </div>
      </div>
      <div className='select-container'>
        <Select value={format} onChange={handleChange}>
          <MenuItem value='hex'>HEX - #fff</MenuItem>
          <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
          <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
        </Select>
      </div>
    </header>
  );
}

export default Navbar;
