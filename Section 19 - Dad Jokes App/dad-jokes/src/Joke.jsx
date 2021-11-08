import React from 'react';
import './Joke.css';

class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className='Joke'>Joke: {this.props.text} </div>;
  }
}

export default Joke;
