import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Select, MenuItem, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { withStyles } from '@mui/styles';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import navbarStyles from '../styles/NavbarStyles';

function Navbar({
  level,
  changeLevel,
  changeFormat,
  showingAllColors,
  classes,
}) {
  const [format, setFormat] = useState('hex');
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

  const handleFormatChange = (event) => {
    setFormat(event.target.value);

    // Call Palette component's format handler
    changeFormat(event.target.value);

    setIsOpenSnackbar(true);
  };

  const closeSnackbar = () => {
    setIsOpenSnackbar(false);
  };

  return (
    <header className={classes.Navbar}>
      <div className={classes.NavbarLogo}>
        <Link to='/'>React-Color-Picker</Link>
      </div>
      {showingAllColors && (
        <div className='slider-container'>
          <span>Level: {level}</span>
          <div className={classes.NavbarSlider}>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
      )}
      <div className={classes.NavbarSelectContainer}>
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

export default withStyles(navbarStyles)(Navbar);
