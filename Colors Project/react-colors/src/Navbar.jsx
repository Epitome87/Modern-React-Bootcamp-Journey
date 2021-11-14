import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';
import { Select, MenuItem, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Navbar(props) {
  const [format, setFormat] = useState('hex');
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
    // Call Palette component's format handler
    props.changeFormat(event.target.value);

    console.log('CHANGING');
    setIsOpenSnackbar(true);
  };

  const closeSnackbar = () => {
    console.log('CLOSING');
    setIsOpenSnackbar(false);
  };

  return (
    <header className='Navbar'>
      <div className='logo'>
        <Link to='/'>React-Color-Picker</Link>
      </div>
      {props.showingAllColors && (
        <div className='slider-container'>
          <span>Level: {props.level}</span>
          <div className='slider'>
            <Slider
              defaultValue={props.level}
              min={100}
              max={900}
              step={100}
              onAfterChange={props.changeLevel}
            />
          </div>
        </div>
      )}
      <div className='select-container'>
        <Select value={format} onChange={handleFormatChange}>
          <MenuItem value='hex'>HEX - #fff</MenuItem>
          <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
          <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={isOpenSnackbar}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={
          <span id='message-id'>Format changed to {format.toUpperCase()}</span>
        }
        ContentProps={{ 'aria-describedby': 'message-id' }}
        action={[
          <IconButton
            onClick={closeSnackbar}
            color='inherit'
            key='close'
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </header>
  );
}

export default Navbar;
