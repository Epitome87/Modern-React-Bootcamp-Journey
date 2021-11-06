import React from 'react';
import styles from './Coin.module.css';

function Coin(props) {
  return (
    <div className={styles.Coin}>
      <h2>You flipped {props.info.side} !</h2>
      <img src={props.info.imgSrc} alt={props.info.side} />
    </div>
  );
}

export default Coin;
