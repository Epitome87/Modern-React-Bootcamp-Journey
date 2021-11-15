import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NewPaletteForm from './components/NewPaletteForm';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import seedPalettes from './seedPalettes';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedPalettes);

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);

    // Also save to Local Storage!
    // syncLocalStorage();
    // We will accomplish this through a useEffect hook!
  };

  useEffect(() => {
    syncLocalStorage();
  }, [palettes]);

  const syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  };

  return (
    <Routes>
      <Route
        path='/palette/new'
        element={
          <NewPaletteForm savePalette={savePalette} palettes={palettes} />
        }
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
