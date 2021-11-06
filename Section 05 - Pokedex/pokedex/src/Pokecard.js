import React from 'react';
import './Pokecard.css';

const POKE_API =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

class Pokecard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imgSrc = `${POKE_API}${this.props.id}.png`;
    return (
      <div className='Pokecard'>
        <h1>{this.props.name} </h1>
        <img src={imgSrc} alt={this.props.name} />
        <div>Type: {this.props.type}</div>
        <div>Exp: {this.props.exp}</div>
      </div>
    );
  }
}

export default Pokecard;
