import React from 'react';
import './VendingMachine.css';
import { Link } from 'react-router-dom';
import Message from './Message';

class VendingMachine extends React.Component {
  render() {
    return (
      <div className='VendingMachine'>
        <Message>Visiting Vending Machine</Message>
        What would you like to eat?
        <br />
        <Link to='/chips'>Chips</Link>
        <br />
        <Link to='/soda'>Soda</Link>
      </div>
    );
  }
}
export default VendingMachine;
