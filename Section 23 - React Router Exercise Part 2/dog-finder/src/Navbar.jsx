import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
  console.log('Nav', props);
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/dogs'>
          Home
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            {props.dogs.map((dog) => (
              <li className='nav-item'>
                <NavLink className='nav-link' exact to={`/dogs/${dog.name}`}>
                  {dog.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>

    // <div className='Navbar'>
    //   Navbar
    //   <ul className='Navbar__links'>
    //     <NavLink exact to='/dogs'>
    //       Home
    //     </NavLink>
    //     {props.dogs.map((dog) => (
    //       <NavLink exact to={`/dogs/${dog.name}`}>
    //         {dog.name}
    //       </NavLink>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default Navbar;
