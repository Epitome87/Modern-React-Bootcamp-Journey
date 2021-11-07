import React from 'react';
import './Box.css';

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    this.props.removeBox(this.props.id);
  }

  render() {
    return (
      <div className='Box'>
        <div
          style={{
            backgroundColor: this.props.color,
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
          }}
        ></div>
        <button onClick={this.handleOnClick}>X</button>
      </div>
    );
  }
}

export default Box;
