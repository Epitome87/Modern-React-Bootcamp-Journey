import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Select, MenuItem, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles, withStyles } from '@mui/styles';
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
        <Link to='/'>&#x2B05; Back</Link>
      </div>
      {showingAllColors && (
        <div className={classes.SliderContainer}>
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
        <Select
          value={format}
          onChange={handleFormatChange}
          renderValue={(selected) => {
            let formatText = '';
            if (selected === 'hex') formatText = '(#010203)';
            if (selected === 'rgb') formatText = '- (1, 2, 3)';
            if (selected === 'rgba') formatText = '- (1, 2, 3, 0.4)';
            return `Copy Format: ${selected.toUpperCase()} ${formatText.toUpperCase()}`;
          }}
          sx={{
            color: 'white',
            backgroundColor: 'black',
            height: '50px',
            // padding: '1rem 2rem',

            // Not the proper way to target dropdown arrow, but whatever!
            '& svg': {
              color: 'white',
              fill: 'white',
            },
          }}
        >
          <MenuItem value='hex'>HEX (#010203)</MenuItem>
          <MenuItem value='rgb'>RGB - (1, 2, 3)</MenuItem>
          <MenuItem value='rgba'>RGBA - (1, 2, 3, 0.4)</MenuItem>
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
