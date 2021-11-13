import { Routes, Route } from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import seedPalettes from './seedPalettes';
import { generatePalette } from './colorHelpers';

function App() {
  return (
    <Routes>
      <Route path='/' element={<h1>Palette List Goes Here</h1>} />
      <Route
        path='/palette/:id'
        element={<Palette palette={generatePalette(seedPalettes[4])} />}
      />
    </Routes>
  );
}

export default App;
