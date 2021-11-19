import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import { generatePalette } from '../colorHelpers';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import paletteStyles from '../styles/PaletteStyles';

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

export default withStyles(paletteStyles)(SingleColorPalette);
