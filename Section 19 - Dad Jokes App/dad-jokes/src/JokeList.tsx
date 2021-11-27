import React, { useState, useEffect, useCallback } from 'react';
import './JokeList.css';
import Joke from './Joke';
import axios from 'axios';

const JOKE_API_URL = 'https://icanhazdadjoke.com/';

// Defines the shape of our "Joke", which we pass as a prop(s) to a Joke component
export interface IJoke {
  id: string;
  text: string;
  votes: number;
}

// Defines the shape of the props the JokeList expects
interface JokeListProps {
  numJokesToFetch: number;
}

const JokeList: React.FC<JokeListProps> = (props) => {
  // Set jokes to those in our local storage. OR if none exist, parsing "[]" means empty array
  const parsedJokes = JSON.parse(window.localStorage.getItem('jokes') || '[]');
  const [jokes, setJokes] = useState<IJoke[] | []>(parsedJokes);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Set to help us keep track of which jokes are unique
  const seenJokes = new Set(jokes.map((j) => j.text));

  useEffect(() => {
    if (jokes.length === 0) getJokes();
    // We have jokes, but they may not be sorted yet
    else setJokes(sortJokes(jokes));
    console.log('how often am I called?');
  }, []);

  const getJokes = async () => {
    const fetchedJokes = [];

    // Fetch unique jokes until we have the amount desired
    while (fetchedJokes.length < props.numJokesToFetch) {
      // Have to set a config object with the appropriate headers, as the joke API returns HTML!
      const joke = await axios.get(JOKE_API_URL, {
        headers: { Accept: 'application/json' },
      });

      if (!seenJokes.has(joke.data.joke)) {
        // Todo: Prevent duplicate jokes (based on their ID)
        const newJoke: IJoke = {
          text: joke.data.joke,
          id: joke.data.id,
          votes: 0,
          // upvote: () => handleVote(joke.data.id, 1),
          // downvote: () => handleVote(joke.data.id, -1),
        };

        fetchedJokes.push(newJoke);
      }
    }

    // Set state with fetched jokes
    setJokes([...sortJokes(jokes), ...fetchedJokes]);
    setIsLoading(false);

    // Local Storage onlys tores strings -- so convert jokes object to string
    window.localStorage.setItem('jokes', JSON.stringify(jokes));
  };

  const handleVote = (id: string, delta: number) => {
    setJokes((prevJokes) => {
      return prevJokes.map((joke) => {
        return id === joke.id ? { ...joke, votes: joke.votes + delta } : joke;
      });
    });
    window.localStorage.setItem('jokes', JSON.stringify(jokes));
  };

  const handleClick = () => {
    setIsLoading(true);
    getJokes();
  };

  const sortJokes = (jokes: IJoke[]) => {
    return jokes.sort((a, b) => b.votes - a.votes);
  };

  if (isLoading) {
    return (
      <div className='JokeList__spinner'>
        <i className='far fa-8x fa-laugh fa-spin' />
        <h1 className='JokeList__title'>Loading</h1>
      </div>
    );
  }

  const renderedJokes = jokes.map((joke) => {
    return (
      <Joke
        key={joke.id}
        id={joke.id}
        text={joke.text}
        votes={joke.votes}
        upvote={() => handleVote(joke.id, 1)}
        downvote={() => handleVote(joke.id, -1)}
      />
    );
  });

  return (
    <div className='JokeList'>
      <div className='JokeList__sidebar'>
        <h1 className='JokeList__title'>
          <span>Dad</span> Jokes
        </h1>
        <img
          src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'
          alt='Crying with laughter Emoji'
        />
        <button className='JokeList__btn-more' onClick={handleClick}>
          Fetch Jokes
        </button>
      </div>
      <div className='JokeList__jokes'>{jokes && renderedJokes}</div>
    </div>
  );
};

export default React.memo(JokeList);
