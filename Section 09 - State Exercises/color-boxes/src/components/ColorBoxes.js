import React from 'react';
import styles from './ColorBoxes.module.css';
import ColorBox from './ColorBox';

class ColorBoxes extends React.Component {
  static defaultProps = {
    numBoxes: 18,
    allColors: [
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'indigo',
      'violet',
      'aqua',
      'rebeccapurple',
      'rosybrown',
      'royalblue',
      'salmon',
      'seagreen',
      'skyblue',
      'slateblue',
      'slategray',
      'snow',
      'springgreen',
      'steelblue',
      'tan',
      'teal',
      'thistle',
      'tomato',
      'turquoise',
      'wheat',
      'yellowgreen',
    ],
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const boxes = Array.from({ length: this.props.numBoxes }).map(() => (
      <ColorBox colors={this.props.allColors} />
    ));
    return <div className={styles.ColorBoxes}>{boxes}</div>;
  }
}

export default ColorBoxes;
