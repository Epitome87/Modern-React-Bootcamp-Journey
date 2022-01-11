import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { generatePalette } from '../colorHelpers';
import { withStyles } from '@mui/styles';
import paletteStyles from '../styles/PaletteStyles';
import useDocumentTitle from '../effects/useDocumentTitle';

// Receives all "palettes"
const Palette = ({ palettes, classes }) => {
  const [documentTitle, setDocumentTitle] = useDocumentTitle('');

  function findPalette(id) {
    return palettes.find((palette) => palette.id === id);
  }

  const { id: paletteId } = useParams();

  // Generate the palette based on the URL
  const palette = generatePalette(findPalette(paletteId));

  // Basically componentDidMount
  useEffect(() => {
    console.log('PAL', palette);
    setDocumentTitle(`${palette.paletteName}`);
  }, [palette]);

  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState('hex');

  const handleSliderChange = (sliderValue) => {
    setLevel(sliderValue);
  };

  const handleChangeFormat = (formatValue) => {
    setFormat(formatValue);
  };

  const colorBoxes = palette.colors[level].map((color) => (
    <ColorBox
      key={color.id}
      background={color[format]}
      name={color.name}
      id={color.id}
      paletteId={palette.id}
      showingFullPalette={true}
    />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar
        level={level}
        changeLevel={handleSliderChange}
        changeFormat={handleChangeFormat}
        showingAllColors={true}
      />
      <div className={classes.PaletteColors}>{colorBoxes}</div>
      <PaletteFooter palette={palette} />
    </div>
  );
};

export default withStyles(paletteStyles)(Palette);
