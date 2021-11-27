import React, { useEffect, useContext } from 'react';
import { gameContext } from '../contexts/GameContext';
import Dice from './Dice';
import './Game.css';
import ScoreTable from './ScoreTable';

function Game() {
  const { rollsLeft, isRolling, locked, animateRoll } = useContext(gameContext);

  useEffect(() => {
    // animateRoll();
  }, []);

  const displayRollInfo = () => {
    const messages = [
      '0 Rolls Left',
      '1 Roll Left',
      '2 Rolls Left',
      'Starting Round',
    ];

    return messages[rollsLeft];
  };

  return (
    <div className='Game'>
      <header className='Game-header'>
        <h1 className='App-title'>Yahtzee!</h1>
        <section className='Game-dice-section'>
          <Dice />
          <div className='Game-button-wrapper'>
            <button
              className='Game-reroll'
              disabled={locked.every((x) => x) || rollsLeft <= 0 || isRolling}
              onClick={animateRoll}
            >
              {displayRollInfo()} {locked.every((x) => x) ? 'ALL LOCKED' : ''}
            </button>
          </div>
        </section>
      </header>
      <ScoreTable />
    </div>
  );
}

export default Game;
