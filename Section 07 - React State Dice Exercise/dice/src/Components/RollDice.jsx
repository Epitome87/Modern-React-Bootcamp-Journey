import React, { useState } from 'react';
import Die from './Die';
import './RollDice.css';

const RollDice = (props) => {
  const [isDieRolling, setIsDieRolling] = useState(false);
  const [diceRolls, setDiceRolls] = useState({ die1: 1, die2: 6 });

  const roll = () => {
    // Signal that we are rolling our die
    setIsDieRolling(true);

    // Retrieve a random roll for each die
    let randomRoll1 = Math.floor(Math.random() * 6) + 1;
    let randomRoll2 = Math.floor(Math.random() * 6) + 1;
    setDiceRolls({ die1: randomRoll1, die2: randomRoll2 });

    // Shortly in the future, signal that we are done rolling
    setTimeout(() => {
      setIsDieRolling(false);
    }, 1000);
  };

  return (
    <div className='RollDice'>
      <div className='RollDice-container'>
        <Die face={diceRolls.die1} rolling={isDieRolling} />
        <Die face={diceRolls.die2} rolling={isDieRolling} />
      </div>
      <button onClick={roll} disabled={isDieRolling}>
        {isDieRolling ? 'Rolling...' : 'Roll Dice!'}
      </button>
    </div>
  );
};

export default RollDice;
