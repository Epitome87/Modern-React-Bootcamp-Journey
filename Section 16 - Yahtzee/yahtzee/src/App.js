import React from 'react';
import Game from './components/Game';
import { GameProvider } from './contexts/GameContext';
import './App.css';

function App() {
  return (
    <div className='App'>
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

export default App;
