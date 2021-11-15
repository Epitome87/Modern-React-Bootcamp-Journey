import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NewPaletteForm from './components/NewPaletteForm';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import seedPalettes from './seedPalettes';

function App() {
  const [palettes, setPalettes] = useState(seedPalettes);

  const savePalette = (newPalette) => {
    console.log('New Pal ', newPalette);
    setPalettes([...palettes, newPalette]);
  };

  return (
    <Routes>
      <Route
        path='/palette/new'
        element={<NewPaletteForm savePalette={savePalette} />}
      />
      <Route path='/' element={<PaletteList palettes={palettes} />} />
      <Route path='/palette/:id' element={<Palette palettes={palettes} />} />
      <Route
        path='/palette/:paletteId/:colorId'
        element={<SingleColorPalette palettes={palettes} />}
      />
    </Routes>
  );
}

export default App;
