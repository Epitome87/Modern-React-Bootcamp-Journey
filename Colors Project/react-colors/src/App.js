import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import NewPaletteForm from './components/NewPaletteForm';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import seedPalettes from './seedPalettes';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './components/Page';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedPalettes);

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);

    // Also save to Local Storage!
    // syncLocalStorage();
    // We will accomplish this through a useEffect hook!
  };

  const deletePalette = (id) => {
    setPalettes(palettes.filter((palette) => palette.id !== id));
  };

  useEffect(() => {
    syncLocalStorage();
  }, [palettes]);

  const syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  };

  // const routes = [
  //   { path: "/", name: "Home", Component: }
  // ]

  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames='page' timeout={500}>
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
                <PaletteList palettes={palettes} handleDelete={deletePalette} />
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
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

//   <Routes>
//     <Route
//       path='/palette/new'
//       element={
//         <NewPaletteForm savePalette={savePalette} palettes={palettes} />
//       }
//     />
//     <Route
//       path='/'
//       element={
//         <PaletteList palettes={palettes} handleDelete={deletePalette} />
//       }
//     />
//     <Route path='/palette/:id' element={<Palette palettes={palettes} />} />
//     <Route
//       path='/palette/:paletteId/:colorId'
//       element={<SingleColorPalette palettes={palettes} />}
//     />
//   </Routes>
// );
// }

export default App;
