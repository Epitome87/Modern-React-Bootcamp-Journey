import './App.css';
import Food from './Food';
import Meal from './Meal';
import FoodSearch from './FoodSearch';
import Navbar from './Navbar';
import { Routes, Route, useParams } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<FoodSearch />} />
        <Route path='/food/:name' element={<Food />} />
        <Route path='/food/:foodName/drink/:drinkName' element={<Meal />} />
      </Routes>
    </div>
  );
}

export default App;
