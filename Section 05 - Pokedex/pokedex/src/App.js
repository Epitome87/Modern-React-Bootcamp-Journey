import './App.css';
import Pokedex from './Pokedex';

function App() {
  const pokeData = [
    { id: 1, name: 'Charmander', exp: 10, type: 'fire' },
    { id: 2, name: 'Charmeleon', exp: 20, type: 'fire' },
    { id: 3, name: 'Charizard', exp: 30, type: 'fire' },
  ];

  return (
    <div className='App'>
      <Pokedex />
    </div>
  );
}

export default App;
