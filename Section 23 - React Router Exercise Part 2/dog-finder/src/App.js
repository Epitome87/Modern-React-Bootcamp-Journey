import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import DogList from './DogList';
import DogDetails from './DogDetails';
import whiskey from './images/whiskey.jpg';
import hazel from './images/hazel.jpg';
import tubby from './images/tubby.jpg';

const defaultDogs = [
  {
    name: 'Whiskey',
    age: 5,
    src: whiskey,
    facts: [
      'Whiskey loves eating popcorn.',
      'Whiskey is a terrible guard dog.',
      'Whiskey wants to cuddle with you!',
    ],
  },
  {
    name: 'Hazel',
    age: 3,
    src: hazel,
    facts: [
      'Hazel has soooo much energy!',
      'Hazel is highly intelligent.',
      'Hazel loves people more than dogs.',
    ],
  },
  {
    name: 'Tubby',
    age: 4,
    src: tubby,
    facts: [
      'Tubby is not the brightest dog',
      'Tubby does not like walks or exercise.',
      'Tubby loves eating food.',
    ],
  },
];

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar dogs={defaultDogs} />
        <div className='container'>
          <Routes>
            <Route path='/dogs' element={<DogList dogs={defaultDogs} />} />
            <Route
              path='/dogs/:dogName'
              element={<DogDetails dogs={defaultDogs} />}
            />
            <Route path='*' element={<Navigate to='/dogs' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
