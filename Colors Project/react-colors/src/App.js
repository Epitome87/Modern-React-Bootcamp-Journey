import { Routes, Route } from 'react-router-dom';
import './App.css';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import seedPalettes from './seedPalettes';

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
        element={<SingleColorPalette palettes={seedPalettes} />}
      />
    </Routes>
  );
}

export default App;
