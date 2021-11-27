import React from 'react';
import { IJoke } from './JokeList';
import './Joke.css';

interface IJokeProps {
  upvote: () => void;
  downvote: () => void;
}

// Needing FC<IJokeProps> and props: IJokeProps seems to be redundant: One or the other will suffice!
// const Joke = ({ text, id, votes }: IJoke, { upvote, downvote }: IJokeProps) => {
const Joke = (props: IJokeProps & IJoke) => {
  const { votes, text, id, upvote, downvote } = props;

  const getColor = () => {
    if (votes >= 15) {
      return '#4CAF50';
    } else if (votes >= 12) {
      return '#8BC34A';
    } else if (votes >= 9) {
      return '#CDDC39';
    } else if (votes >= 6) {
      return '#FFEB3B';
    } else if (votes >= 3) {
      return '#FFC107';
    } else if (votes >= 0) {
      return '#FF9800';
    } else {
      return '#f44336';
    }
  };

  const getEmoji = () => {
    if (votes >= 15) {
      return 'em em-rolling_on_the_floor_laughing';
    } else if (votes >= 12) {
      return 'em em-laughing';
    } else if (votes >= 9) {
      return 'em em-smiley';
    } else if (votes >= 6) {
      return 'em em-slightly_smiling_face';
    } else if (votes >= 3) {
      return 'em em-neutral_face';
    } else if (votes >= 0) {
      return 'em em-confused';
    } else {
      return 'em em-angry';
    }
  };

  console.log('RERENDER');

  return (
    <div className='Joke'>
      <div className='Joke__buttons'>
        <i className='fas fa-arrow-up' onClick={upvote}></i>
        <span className='Joke__votes' style={{ borderColor: getColor() }}>
          {votes}
        </span>
        <i className='fas fa-arrow-down' onClick={downvote}></i>
      </div>
      <div className='Joke__text'>{text}</div>
      <div className='Joke__smiley'>
        <i className={getEmoji()} />
      </div>
    </div>
  );
};

export default React.memo(Joke);
