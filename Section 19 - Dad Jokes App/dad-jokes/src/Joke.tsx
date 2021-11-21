import React from 'react';
import './Joke.css';

interface IJokeProps {
  votes: number;
  text: string;
  upvote: () => void;
  downvote: () => void;
}

// Needing FC<IJokeProps> and props: IJokeProps seems to be redundant: One or the other will suffice!
const Joke: React.FC<IJokeProps> = (props: IJokeProps) => {
  const getColor = () => {
    if (props.votes >= 15) {
      return '#4CAF50';
    } else if (props.votes >= 12) {
      return '#8BC34A';
    } else if (props.votes >= 9) {
      return '#CDDC39';
    } else if (props.votes >= 6) {
      return '#FFEB3B';
    } else if (props.votes >= 3) {
      return '#FFC107';
    } else if (props.votes >= 0) {
      return '#FF9800';
    } else {
      return '#f44336';
    }
  };

  const getEmoji = () => {
    if (props.votes >= 15) {
      return 'em em-rolling_on_the_floor_laughing';
    } else if (props.votes >= 12) {
      return 'em em-laughing';
    } else if (props.votes >= 9) {
      return 'em em-smiley';
    } else if (props.votes >= 6) {
      return 'em em-slightly_smiling_face';
    } else if (props.votes >= 3) {
      return 'em em-neutral_face';
    } else if (props.votes >= 0) {
      return 'em em-confused';
    } else {
      return 'em em-angry';
    }
  };

  return (
    <div className='Joke'>
      <div className='Joke__buttons'>
        <i className='fas fa-arrow-up' onClick={props.upvote}></i>
        <span className='Joke__votes' style={{ borderColor: getColor() }}>
          {props.votes}
        </span>
        <i className='fas fa-arrow-down' onClick={props.downvote}></i>
      </div>
      <div className='Joke__text'>{props.text}</div>
      <div className='Joke__smiley'>
        <i className={getEmoji()} />
      </div>
    </div>
  );
};

export default Joke;
