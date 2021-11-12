import './App.css';
import Palette from './Palette';
import seedPalettes from './seedPalettes';

function App() {
  return (
    <div className='App'>
      <Palette {...seedPalettes[2]} />
    </div>
  );
}

export default App;