import React, { useState, useEffect, createContext } from 'react';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

export const gameContext = createContext();

export function GameProvider(props) {
  const [dice, setDice] = useState(
    Array.from({ length: NUM_DICE }).map((d) => Math.ceil(Math.random() * 6))
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

    // setLocked((prevLocked) =>
    //   rollsLeft > 1 ? prevLocked : Array(NUM_DICE).fill(true)
    // );

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
    setLocked(Array(NUM_DICE).fill(false));

    animateRoll();
  };

  return (
    <gameContext.Provider
      value={{
        scores,
        isRolling,
        locked,
        dice,
        rollsLeft,
        toggleLocked,
        animateRoll,
        doScore,
      }}
    >
      {props.children}
    </gameContext.Provider>
  );
}
