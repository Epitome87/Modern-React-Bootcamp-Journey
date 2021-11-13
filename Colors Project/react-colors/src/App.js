import { Routes, Route } from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedPalettes from './seedPalettes';

function App() {
  return (
    <Routes>
      <Route path='/' element={<PaletteList palettes={seedPalettes} />} />
      <Route
        path='/palette/:id'
        element={<Palette palettes={seedPalettes} />}
      />
    </Routes>
  );
}

export default App;
