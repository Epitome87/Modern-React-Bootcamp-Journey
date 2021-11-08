import React from 'react';
import './Deck.css';
import Card from './Card';
import axios from 'axios';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck/';

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards: [], deckID: '' };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const newDeckURL = API_BASE_URL + 'new/shuffle';
    const response = await axios.get(newDeckURL);
    const deckID = response.data.deck_id; // deck.data

    this.setState({ deckID });
  }

  async handleClick(event) {
    // Draw new card if there's any remaining
    try {
      const cardURL = `${API_BASE_URL}${this.state.deckID}/draw/?count=1`;
      const cardDeck = await axios.get(cardURL);
      if (!cardDeck.data.success) {
        throw new Error('No cards remaining');
      }

      const newCard = cardDeck.data.cards[cardDeck.data.cards.length - 1];

      this.setState({
        cards: [
          ...this.state.cards,
          {
            id: newCard.code,
            image: newCard.image,
            name: `${newCard.value} of ${newCard.suit}`,
          },
        ],
      });
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <div className='Deck'>
        <h1 className='Deck__title'>♦Card Dealer♦</h1>
        <h2 className='Deck__title subtitle'>
          A little API exercise made with React
        </h2>
        <button className='Deck__button' onClick={this.handleClick}>
          Deal Card!
        </button>
        <div className='Deck__card-container'>
          {this.state.cards.map((card) => {
            return (
              <Card key={card.id} imageURL={card.image} name={card.name} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Deck;
