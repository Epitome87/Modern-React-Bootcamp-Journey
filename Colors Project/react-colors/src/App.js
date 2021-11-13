import { Routes, Route } from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import seedPalettes from './seedPalettes';

function App() {
  return (
    <Routes>
      <Route path='/' element={<h1>Palette List Goes Here</h1>} />
      <Route
        path='/palette/:id'
        element={<Palette palettes={seedPalettes} />}
      />
    </Routes>
  );
}

export default App;
