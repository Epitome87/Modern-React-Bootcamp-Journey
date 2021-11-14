import React from 'react';
import { useParams } from 'react-router';
import { generatePalette } from './colorHelpers';
import ColorBox from './ColorBox';
import { color } from '@mui/system';

function SingleColorPalette({ palettes }) {
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

  const renderedShades = shades.map((shade) => {
    return (
      <ColorBox
        key={shade.id}
        name={shade.name}
        background={shade.hex}
        showLink={false}
      />
    );
  });

  return (
    <div className='Palette'>
      <h1>Single color palette!</h1>
      <div className='Palette__colors'>{renderedShades}</div>
    </div>
  );
}

export default SingleColorPalette;
