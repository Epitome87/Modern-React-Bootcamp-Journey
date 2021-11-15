import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
// Start requires for Drawer component
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        open={isDrawerOpen}
        color='default'
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
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
        </Toolbar>

        <div className='classes.NavButtons'>
          <PaletteMetaForm
            palettes={palettes}
            handleSubmitNewPalette={handleSubmitNewPalette}
          />

          <Link to='/'>
            <Button variant='contained' color='secondary'>
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  );
}

export default PaletteFormNav;
