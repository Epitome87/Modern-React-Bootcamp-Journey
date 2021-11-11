import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    alert('Logged in!');
    navigate('/food/salmon');
  };

  return (
    <div>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};
export default Navbar;
