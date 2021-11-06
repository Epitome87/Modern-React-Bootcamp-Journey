import './App.css';
import Lottery from './Components/Lottery';

function App() {
  return (
    <div className='App'>
      <Lottery title={'Lotto'} ballCount={6} maxNumber={40} />
      <Lottery title={'Mini Daily'} ballCount={4} maxNumber={10} />
    </div>
  );
}

export default App;
