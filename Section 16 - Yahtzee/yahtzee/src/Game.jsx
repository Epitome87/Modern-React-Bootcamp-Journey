import React, { useState, useEffect } from 'react';
import Dice from './Dice';
import './Game.css';
import ScoreTable from './ScoreTable';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

function Game() {
  const [dice, setDice] = useState(
    Array.from({ length: NUM_DICE }).map(
      (d) => Math.floor(Math.random() * 6) + 1
    )
  );
  const [locked, setLocked] = useState(Array(NUM_DICE).fill(false));
  const [rollsLeft, setRollsLeft] = useState(NUM_ROLLS);
  const [scores, setScores] = useState({
    ones: undefined,
    twos: undefined,
    threes: undefined,
    fours: undefined,
    fives: undefined,
    sixes: undefined,
    threeOfKind: undefined,
    fourOfKind: undefined,
    fullHouse: undefined,
    smallStraight: undefined,
    largeStraight: undefined,
    yahtzee: undefined,
    chance: undefined,
  });
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    animateRoll();
  }, []);

  const animateRoll = () => {
    setIsRolling(true);
    setTimeout(() => {
      roll();
    }, 1000);
  };

  const roll = (evt) => {
    // Roll dice whose indexes are in reroll
    setDice((prevDice) =>
      prevDice.map((die, index) =>
        locked[index] ? die : Math.ceil(Math.random() * 6)
      )
    );

    setLocked((prevLocked) =>
      rollsLeft > 1 ? prevLocked : Array(NUM_DICE).fill(true)
    );

    // Subtract 1 from the number of rolls left
    setRollsLeft((prevRolls) => prevRolls - 1);

    // We are no longer rolling
    setIsRolling(false);
  };

  const toggleLocked = (idx) => {
    if (rollsLeft <= 0 || isRolling) return;

    // Toggle whether idx is in locked or not
    setLocked((prevLocked) =>
      prevLocked.map((lock, index) => {
        return index === idx ? !lock : lock;
      })
    );
  };

  const doScore = (rulename, ruleFn) => {
    // Evaluate this ruleFn with the dice and score this rulename
    setScores((prevScores) => {
      return { ...prevScores, [rulename]: ruleFn(dice) };
    });

    setRollsLeft(NUM_ROLLS);
    setLocked(Array.from(NUM_DICE).fill(false));

    animateRoll();
  };

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
          <Dice
            dice={dice}
            locked={locked}
            handleClick={toggleLocked}
            disabled={rollsLeft === 0}
            isRolling={isRolling}
          />
          <div className='Game-button-wrapper'>
            <button
              className='Game-reroll'
              disabled={locked.every((x) => x) || rollsLeft <= 0 || isRolling}
              onClick={animateRoll}
            >
              {displayRollInfo()}
            </button>
          </div>
        </section>
      </header>
      <ScoreTable doScore={doScore} scores={scores} isRolling={isRolling} />
    </div>
  );
}

export default Game;
