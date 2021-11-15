import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// Start requires for Drawer component
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// End requires for Drawer component

// Form Validation
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// TODO: This is being set in NwePaletteForm too, not good
const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function PaletteFormNav({
  palettes,
  isDrawerOpen,
  handleDrawerOpen,
  handleSubmitNewPalette,
}) {
  const [newPaletteName, setNewPaletteName] = useState('');

  // Validation for Palette Name:
  ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
    return palettes.every(
      (palette) => palette.paletteName.toLowerCase() !== value.toLowerCase()
    );
  });

  const handlePaletteNameValidatorChange = (event) => {
    setNewPaletteName(event.target.value);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position='fixed' open={isDrawerOpen} color='default'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(isDrawerOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Create A Palette!
          </Typography>

          <ValidatorForm
            onSubmit={() => handleSubmitNewPalette(newPaletteName)}
          >
            <TextValidator
              label='Palette Name'
              value={newPaletteName}
              name={'newPaletteName'}
              onChange={handlePaletteNameValidatorChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Palette name is required',
                'Palette name already exists',
              ]}
            />
            <Button variant='contained' color='primary' type='submit'>
              Save Palette
            </Button>
            <Link to='/'>
              <Button variant='contained' color='secondary'>
                Go Back
              </Button>
            </Link>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PaletteFormNav;
