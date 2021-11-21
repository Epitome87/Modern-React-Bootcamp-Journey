import React from 'react';
import './App.css';
import JokeList from './JokeList';

const App: React.FC = () => {
  return (
    <div className='App'>
      <JokeList numJokesToFetch={10} />
    </div>
  );
};

export default App;
