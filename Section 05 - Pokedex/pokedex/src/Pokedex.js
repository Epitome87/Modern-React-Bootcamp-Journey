import React from 'react';
import './Pokedex.css';
import Pokecard from './Pokecard';

class Pokedex extends React.Component {
  static defaultProps = {
    pokemon: [
      { id: 1, name: 'Charmander', exp: 10, type: 'fire' },
      { id: 2, name: 'Charmeleon', exp: 20, type: 'fire' },
      { id: 3, name: 'Charizard', exp: 30, type: 'fire' },
    ],
  };

  render() {
    return (
      <div className='Pokedex'>
        <h1>Pokedex!</h1>
        <div className='Pokedex__cards'>
          {this.props.pokemon.map((p) => (
            <Pokecard id={p.id} name={p.name} type={p.type} exp={p.exp} />
          ))}
        </div>
      </div>
    );
  }
}

export default Pokedex;
