import React from 'react';
import Die from './Die';
import './Dice.css';

function Dice(props) {
  return (
    <div className='Dice'>
      {props.dice.map((d, idx) => {
        return (
          <Die
            handleClick={props.handleClick}
            val={d}
            locked={props.locked[idx]}
            idx={idx}
            key={idx}
            disabled={props.disabled}
            isRolling={props.isRolling}
          />
        );
      })}
    </div>
  );
}

export default Dice;
