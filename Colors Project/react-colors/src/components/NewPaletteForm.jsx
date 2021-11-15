import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Start requires for Drawer component
import { styled, useTheme } from '@mui/material/styles';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// End requires for Drawer component

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// Our NewPaletteForm Component
function NewPaletteForm({ savePalette, palettes, maxColors = 20 }) {
  const theme = useTheme();
  const navigate = useNavigate();

  // Form logic States:
  const [colors, setColors] = useState([...palettes[0].colors]);

  // Drawer State (we also pass this to this form's Nav component):
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  /* Drawer Component: Open */
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  /* Drawer Component: Close */
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  // Form Logic:
  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  // Called when "Save Palette" is pressed
  const handleSubmitNewPalette = (newPaletteName) => {
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

  // Called at the end of a Drag-and-Drop to help re-arrange the items
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors([...arrayMove(colors, oldIndex, newIndex)]);
  };

  // Adds a new, random Color to the Palette
  const handleRandomColor = (event) => {
    // Pick a random color from existing palettes
    // We .flat() it since it is an array of arrays
    const allColors = palettes.map((pal) => pal.colors).flat();
    const randomColor = allColors[Math.floor(Math.random() * allColors.length)];
    // Todo: Ensure this color is unique
    setColors([...colors, randomColor]);
  };

  // Clears the Palette by resetting the Colors state to be empty
  const handleClearPalette = (event) => {
    setColors([]);
  };

  // Helper variable to describe if our Palette is full
  const paletteIsFull = colors.length >= maxColors;

  return (
    <Box sx={{ display: 'flex' }}>
      <PaletteFormNav
        palettes={palettes}
        handleSubmitNewPalette={handleSubmitNewPalette}
        handleDrawerOpen={handleDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',

            // testing
            // display: 'flex',
            // alignItems: 'center',
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
        <div
          className='palette-form__drawer-container'
          style={{
            display: 'flex',
            width: '90%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

            // Colt doesn't do this
            margin: '0 auto',
          }}
        >
          <Typography variant='h4' gutterBottom>
            Design Your Palette
          </Typography>

          <div
            className='palette-form__buttons'
            style={{
              width: '100%',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              className='palette-form__button'
              variant='contained'
              color='secondary'
              onClick={handleClearPalette}
              style={{ width: '45%' }}
            >
              Clear Palette
            </Button>
            <Button
              className='palette-form__button'
              variant='contained'
              color='primary'
              disabled={paletteIsFull}
              onClick={handleRandomColor}
              style={{ width: '45%' }}
            >
              Random Color
            </Button>
          </div>

          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
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
