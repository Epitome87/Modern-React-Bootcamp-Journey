import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import NewPaletteForm from './components/NewPaletteForm';
import Page from './components/Page';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import seedPalettes from './seedPalettes';
import useDocumentTitle from './effects/useDocumentTitle';

function App() {
  const [documentTitle, setDocumentTitle] = useDocumentTitle(
    'Palettes | Flat UI Clone'
  );

  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedPalettes);

  const savePalette = useCallback((newPalette) => {
    setPalettes((p) => [...p, newPalette]);

    // Also save to Local Storage!
    // syncLocalStorage();
    // We will accomplish this through a useEffect hook!
  }, []);

  const deletePalette = useCallback((id) => {
    setPalettes((p) => p.filter((palette) => palette.id !== id));
  }, []);

  const syncLocalStorage = useCallback(() => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  }, [palettes]);

  useEffect(() => {
    syncLocalStorage();
  }, [palettes, syncLocalStorage]);

  const location = useLocation();

  return (
    <TransitionGroup component={useMemo(() => null)}>
      <CSSTransition
        key={location.key}
        classNames='page'
        timeout={useMemo(() => 500)}
      >
        <Routes location={location}>
          <Route
            path='/palette/new'
            element={
              <Page>
                <NewPaletteForm savePalette={savePalette} palettes={palettes} />
              </Page>
            }
          />
          <Route
            path='/'
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  handleDelete={useMemo(() => deletePalette, [deletePalette])}
                />
              </Page>
            }
          />
          <Route
            path='/palette/:id'
            element={
              <Page>
                <Palette palettes={palettes} />
              </Page>
            }
          />
          <Route
            path='/palette/:paletteId/:colorId'
            element={
              <Page>
                <SingleColorPalette palettes={palettes} />
              </Page>
            }
          />
          {/* Catch-all Route */}
          <Route
            path='*'
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  handleDelete={useMemo(() => deletePalette, [deletePalette])}
                />
              </Page>
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
