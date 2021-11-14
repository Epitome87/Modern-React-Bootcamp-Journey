import { Routes, Route } from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedPalettes from './seedPalettes';

function App() {
  console.log(seedPalettes);
  return (
    <Routes>
      <Route path='/' element={<PaletteList palettes={seedPalettes} />} />
      <Route
        path='/palette/:id'
        element={<Palette palettes={seedPalettes} />}
      />
      <Route
        path='/palette/:paletteId/:colorId'
        element={<h1>Single Color Page</h1>}
      />
    </Routes>
  );
}

export default App;
