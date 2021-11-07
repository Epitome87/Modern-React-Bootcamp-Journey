import React from 'react';
import './Cell.css';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleLights = this.handleToggleLights.bind(this);
  }

  handleToggleLights(event) {
    this.props.toggleLights(this.props.coord);
  }

  render() {
    let classes = 'Cell' + (this.props.isLit ? ' Cell-lit' : '');
    return <td className={classes} onClick={this.handleToggleLights}></td>;
  }
}

export default Cell;
