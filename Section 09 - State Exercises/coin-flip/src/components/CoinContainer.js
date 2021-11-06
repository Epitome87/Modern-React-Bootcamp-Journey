import React from 'react';
import styles from './CoinContainer.module.css';
import Coin from './Coin';
import { choice } from '../helpers';

class CoinContainer extends React.Component {
  static defaultProps = {
    coins: [
      {
        side: 'heads',
        imgSrc:
          'https://upload.wikimedia.org/wikipedia/commons/c/cd/S_Half_Dollar_Obverse_2016.jpg',
      },
      {
        side: 'tails',
        imgSrc:
          'http://www.pcgscoinfacts.com/UserImages/71009269r.jpg?__cf_chl_jschl_tk__=pmd_5728ea97ad38249183b8dbab2346d7cfda82a293-1626711959-0-gqNtZGzNAeKjcnBszQMO',
      },
    ],
  };

  constructor(props) {
    super(props);

    this.state = {
      currentCoin: null,
      numFlips: 0,
      numHeads: 0,
      numTails: 0,
    };

    this.onHandleClick = this.onHandleClick.bind(this);
  }

  flipCoin() {
    const newCoin = choice(this.props.coins);
    this.setState((prevState) => {
      return {
        currentCoin: newCoin,
        numFlips: prevState.numFlips + 1,
        numHeads:
          newCoin.side === 'heads'
            ? prevState.numHeads + 1
            : prevState.numHeads,
        numTails:
          newCoin.side === 'tails'
            ? prevState.numTails + 1
            : prevState.numTails,
      };
    });
  }

  onHandleClick(event) {
    this.flipCoin();
  }

  render() {
    return (
      <div className='CoinContainer' styles={{ styles }}>
        <h2>Let's Flip A Coin!</h2>
        {this.state.currentCoin && <Coin info={this.state.currentCoin} />}
        <button onClick={this.onHandleClick}>Flip Coin!</button>
        <p>
          Out of {this.state.numFlips} flips, there have been{' '}
          {this.state.numHeads} heads and {this.state.numTails} tails
        </p>
      </div>
    );
  }
}

export default CoinContainer;
