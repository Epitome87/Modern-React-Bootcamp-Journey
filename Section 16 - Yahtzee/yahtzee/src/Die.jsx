import React from 'react';
import './Die.css';

const numberWords = ['one', 'two', 'three', 'four', 'five', 'six'];

function Die(props) {
  const handleClick = () => {
    props.handleClick(props.idx);
  };

  const { locked, val, disabled, isRolling } = props;

  let classes = `Die fas fa-dice-${numberWords[val - 1]} fa-5x ${
    locked ? 'Die-locked' : ''
  } ${isRolling && !locked ? 'Die-rolling' : ''}`;

  return <i className={classes} onClick={handleClick} disabled={disabled}></i>;
}

export default Die;
