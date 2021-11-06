import React, { useState } from 'react';
import './Lottery.css';
import LottoBall from './LottoBall';

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Lottery = ({ title = 'Lotto', ballCount = 6, maxNumber = 40 }) => {
  // Initial ball state is to have all them display no number
  const [numbers, setNumbers] = useState(new Array(ballCount).fill(''));

  // Helper method to select balls (called when button is clicked)
  const selectNumbers = () => {
    // const randomBalls = [];
    // for (let i = 0; i < ballCount; i++) {
    //   randomBalls.push(randomNumber(1, maxNumber));
    // }
    // setBalls([...randomBalls]);

    // Better way to set state:
    setNumbers((currentState) =>
      currentState.map((num) => randomNumber(1, maxNumber))
    );
  };

  // Button's onClick handler
  const handleClick = () => {
    selectNumbers();
  };

  return (
    <div className='Lottery'>
      <p className='Lottery__header'>{title}</p>
      <div className='Lottery__balls'>
        {numbers.map((number) => {
          return <LottoBall number={number} />;
        })}
      </div>
      <button className='Lottery__button' onClick={handleClick}>
        Draw Balls!
      </button>
    </div>
  );
};

export default Lottery;
