import { Routes, Route } from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedPalettes from './seedPalettes';
import SingleColorPalette from './SingleColorPalette';

function App() {
  return (
    <Routes>
      <Route path='/' element={<PaletteList palettes={seedPalettes} />} />
      <Route
        path='/palette/:id'
        element={<Palette palettes={seedPalettes} />}
      />
      <Route
        path='/palette/:paletteId/:colorId'
        element={<SingleColorPalette />}
      />
    </Routes>
  );
}

export default App;
