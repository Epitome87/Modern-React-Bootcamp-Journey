import React, { useContext } from 'react';
import { gameContext } from '../contexts/GameContext';
import Die from './Die';
import './Dice.css';

function Dice(props) {
  const { locked, dice } = useContext(gameContext);
  return (
    <div className='Dice'>
      {dice.map((d, idx) => {
        return (
          <Die
            val={d}
            locked={locked[idx]}
            idx={idx}
            key={idx}
          />
        );
      })}
    </div>
  );
}

export default Dice;
