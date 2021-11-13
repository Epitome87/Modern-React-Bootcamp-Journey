import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

function Navbar(props) {
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
    </header>
  );
}

export default Navbar;
