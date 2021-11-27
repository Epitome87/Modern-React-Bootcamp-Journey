import React, { useContext } from 'react';
import { gameContext } from '../contexts/GameContext';
import './Die.css';

const numberWords = ['one', 'two', 'three', 'four', 'five', 'six'];

function Die(props) {
  const { isRolling, toggleLocked, rollsLeft } = useContext(gameContext);

  const handleClick = () => {
    toggleLocked(props.idx);
  };

  const { locked, val } = props;

  const disabled = rollsLeft === 0 || isRolling;

  let classes = `Die fas fa-dice-${numberWords[val - 1]} fa-5x ${
    locked ? 'Die-locked' : ''
  } ${isRolling && !locked ? 'Die-rolling' : ''}`;

  return <i className={classes} onClick={handleClick} disabled={disabled}></i>;
}

export default Die;
