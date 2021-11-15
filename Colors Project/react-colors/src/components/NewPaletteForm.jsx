import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Start requires for Drawer component
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// End requires for Drawer component

// React Color
import { ChromePicker } from 'react-color';

// Form Validation
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// Drag and Drop!
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function NewPaletteForm({ savePalette, palettes, maxColors = 20 }) {
  const theme = useTheme();
  const navigate = useNavigate();

  // Form logic States:
  const [colors, setColors] = useState([
    // { color: '#fff', name: 'White' },
    // { color: '#349', name: 'Blue' },
    // { color: '#831', name: 'Light Red' },
    ...palettes[0].colors,
  ]);

  // TODO: Only add these validation rules once

  // Validation for New Color Name:
  ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
    return colors.every(
      (color) => color.name.toLowerCase() !== value.toLowerCase()
    );
  });

  ValidatorForm.addValidationRule('isColorUnique', (value) => {
    return colors.every((color) => color.color !== currentColor);
  });

  // Validation for Palette Name:
  ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
    return palettes.every(
      (palette) => palette.paletteName.toLowerCase() !== value.toLowerCase()
    );
  });

  // Drawer State:
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Color State:
  const [currentColor, setCurrentColor] = useState('#333');

  // Validator State:
  const [newColorName, setNewColorName] = useState('');
  const [newPaletteName, setNewPaletteName] = useState('');

  /* Drawer Component: Open */
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  /* Drawer Component: Close */
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  //   Form Logic:
  const addNewColor = () => {
    const newColor = { color: currentColor, name: newColorName };
    setColors([...colors, newColor]);

    // Reset form
    setNewColorName('');
  };

  const handleColorNameValidatorChange = (event) => {
    setNewColorName(event.target.value);
  };

  const handlePaletteNameValidatorChange = (event) => {
    setNewPaletteName(event.target.value);
  };

  /* Color Picker Component: Change Complete */
  const handleChangeComplete = (color, event) => {
    setCurrentColor(color.hex);
  };

  const handleSubmitNewPalette = (event) => {
    // Create a new Palette out of all the information we have constructed
    const newPalette = {
      colors,
      paletteName: newPaletteName,
      id: newPaletteName.trim().toLowerCase().replace(/\s/g, '-'),
      emoji: '🎁',
    };
    // Call the parent's (App) callback for palette saving
    savePalette(newPalette);

    // Navigate back to the home route.
    navigate('/');
  };

  // Handles deletion of a ColorBox. Called from wihin DraggableColorBox
  const handleDelete = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors([...arrayMove(colors, oldIndex, newIndex)]);
  };

  const handleRandomColor = (event) => {
    // Pick a random color from existing palettes
    // We .flat() it since it is an array of arrays
    const allColors = palettes.map((pal) => pal.colors).flat();
    const randomColor = allColors[Math.floor(Math.random() * allColors.length)];
    // Todo: Ensure this color is unique
    setColors([...colors, randomColor]);
  };

  const handleClearPalette = (event) => {
    setColors([]);
  };

  const paletteIsFull = colors.length >= maxColors;

  return (
    <Box sx={{ display: 'flex' }}>
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

          <ValidatorForm onSubmit={handleSubmitNewPalette}>
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
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={isDrawerOpen}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant='h4'>Design Your Palette</Typography>
        <div>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleClearPalette}
          >
            Clear Palette
          </Button>
          <Button
            variant='contained'
            color='primary'
            disabled={paletteIsFull}
            onClick={handleRandomColor}
          >
            Random Color
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={handleChangeComplete}
        />
        <ValidatorForm
          onSubmit={addNewColor}
          onError={(errors) => console.log(errors)}
        >
          <TextValidator
            label='Color'
            onChange={handleColorNameValidatorChange}
            name='newColorName'
            value={newColorName}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'Color name is required',
              'Color name must be unique',
              'Color already used',
            ]}
          />
          <Button
            variant='contained'
            type='Submit'
            color='primary'
            disabled={paletteIsFull}
            style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={isDrawerOpen} sx={{ height: 'calc(100vh - 64px)' }}>
        <DrawerHeader />

        <DraggableColorList
          colors={colors}
          handleDelete={handleDelete}
          axis='xy'
          onSortEnd={onSortEnd}
        />
      </Main>
    </Box>
  );
}

// export default withStyles(styles, { withThem: true})(NewPaletteForm);
export default NewPaletteForm;
