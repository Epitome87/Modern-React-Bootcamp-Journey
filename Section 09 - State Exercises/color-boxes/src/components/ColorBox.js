import React from 'react';
import styles from './ColorBox.module.css';
import { randomChoice } from '../helpers';

class ColorBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { color: randomChoice(this.props.colors) };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  pickColor() {
    let newColor;
    do {
      newColor = randomChoice(this.props.colors);
      this.setState({ color: newColor });
    } while (newColor === this.state.color);
  }

  handleOnClick(event) {
    this.pickColor();
  }

  render() {
    return (
      <div
        className={styles.ColorBox}
        style={{ backgroundColor: this.state.color }}
        onClick={this.handleOnClick}
      ></div>
    );
  }
}

export default ColorBox;
