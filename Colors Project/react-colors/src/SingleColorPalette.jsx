import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@mui/styles';

const styles = {
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  PaletteColors: {
    height: '90%',
    overflow: 'hidden',
  },

  goBack: {
    width: '20%',
    height: '50%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    marginBottom: '-3.5px',
    opacity: 1,
    backgroundColor: 'black',

    '& a': {
      color: 'white',
      width: '100px',
      height: '30px',
      position: 'absolute',
      display: 'inline-block',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      outline: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      fontFamily: 'inherit',
      fontSize: '1rem',
      lineHeight: '30px',
      textTransform: 'uppercase',
      border: 'none',
      textDecoration: 'none',
      transition: 'opacity 0.5s linear',
    },
  },
};

function SingleColorPalette({ palettes, classes }) {
  const [format, setFormat] = useState('hex');
  const params = useParams();

  function findPalette(id) {
    return palettes.find((palette) => palette.id === id);
  }

  // Generate the palette based on the URL
  const palette = generatePalette(findPalette(params.paletteId));
  const shades = getShades(params.colorId);

  // Returns all shades of given color
  function getShades(targetColor) {
    let shades = [];

    for (let key in palette.colors) {
      shades = shades.concat(
        palette.colors[key].filter((color) => {
          return color.id === targetColor;
        })
      );
    }
    // Return the shades array sans the 1st element, which is our screwy "50" level
    return shades.slice(1);
  }

  const handleChangeFormat = (formatValue) => {
    setFormat(formatValue);
  };

  const renderedShades = shades.map((shade) => {
    return (
      <ColorBox
        key={shade.name}
        name={shade.name}
        background={shade[format]}
        showingFullPalette={false}
      />
    );
  });

  return (
    <div className={classes.Palette}>
      <Navbar changeFormat={handleChangeFormat} showingAllColors={false} />
      <div className={classes.PaletteColors}>
        {renderedShades}
        <div className={classes.goBack}>
          <Link to={`/palette/${params.paletteId}`}>GO BACK</Link>
        </div>
      </div>
      <PaletteFooter palette={palette} />
    </div>
  );
}

export default withStyles(styles)(SingleColorPalette);
