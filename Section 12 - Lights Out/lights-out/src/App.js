import './App.css';
import Board from './Board';

function App() {
  return (
    <div className='App'>
      <Board numRows={5} numCols={5}/>
    </div>
  );
}

export default App;
