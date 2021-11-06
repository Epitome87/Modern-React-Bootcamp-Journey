import React, { useState } from 'react';
import './Die.css';
const convertToClass = (num) => {
  switch (num) {
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    case 6:
      return 'six';
    default:
      return 'one';
  }
};

const Die = (props) => {
  return (
    <div className='Die'>
      <i
        class={`fas fa-dice-${convertToClass(props.face)} ${
          props.rolling ? 'rolling' : ''
        }`}
      ></i>
    </div>
  );
};

export default Die;
