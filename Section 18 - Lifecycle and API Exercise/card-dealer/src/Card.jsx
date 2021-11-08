import React from 'react';
import './Card.css';

class Card extends React.Component {
  constructor(props) {
    super(props);

    // Give the card a random angle and position offset
    let randomAngle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    this.randomTransform = `translate(${randomX}px, ${randomY}px) rotate(${randomAngle}deg)`;
  }

  render() {
    return (
      <div className='Card'>
        <img
          src={this.props.imageURL}
          alt={this.props.name}
          style={{ transform: this.randomTransform }}
        />
      </div>
    );
  }
}

export default Card;
