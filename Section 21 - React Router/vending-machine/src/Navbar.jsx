import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <nav className='Navbar'>
        <NavLink
          className={({ isActive }) => (isActive ? 'active customActive' : '')}
          to='/'
        >
          Home
        </NavLink>
        <NavLink to='/chips'>Chips</NavLink>
        <NavLink to='/soda'>Soda</NavLink>
      </nav>
    );
  }
}

export default Navbar;
