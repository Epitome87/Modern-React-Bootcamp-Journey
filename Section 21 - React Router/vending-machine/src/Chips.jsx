import React from 'react';
import './Chips.css';
import { Link } from 'react-router-dom';
import Message from './Message';

function Chips() {
  return (
    <div className='Chips'>
      <Message>You ate a chip!</Message>
      <Link to='/'>Go Back</Link>
    </div>
  );
}

export default Chips;
