import './App.css';
import Palette from './Palette';
import seedPalettes from './seedPalettes';
import { generatePalette } from './colorHelpers';

function App() {
  console.log(generatePalette(seedPalettes[3]));
  return (
    <div className='App'>
      <Palette {...seedPalettes[2]} />
    </div>
  );
}

export default App;
