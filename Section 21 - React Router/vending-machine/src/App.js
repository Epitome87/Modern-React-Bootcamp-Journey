import './App.css';
import VendingMachine from './VendingMachine';
import Soda from './Soda';
import Chips from './Chips';
import { Routes, Route, NavLink } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<VendingMachine />} />
        <Route path='/chips' element={<Chips />} />
        <Route path='/soda' element={<Soda />} />
      </Routes>
    </div>
  );
}

export default App;
