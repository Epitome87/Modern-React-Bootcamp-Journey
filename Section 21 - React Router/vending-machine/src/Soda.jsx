import React from 'react';
import './Soda.css';
import { Link } from 'react-router-dom';
import Message from './Message';

class Soda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='Soda'>
        <Message>Soda has been sipped!</Message>
        <Link to='/'>Go Back</Link>
      </div>
    );
  }
}

export default Soda;
