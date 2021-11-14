import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Palette.css';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import { generatePalette } from './colorHelpers';
import PaletteFooter from './PaletteFooter';

// Receives all "palettes"
const Palette = ({ palettes }) => {
  function findPalette(id) {
    return palettes.find((palette) => palette.id === id);
  }

  const params = useParams();
  // Generate the palette based on the URL
  const palette = generatePalette(findPalette(params.id));

  // Basically componentDidMount
  useEffect(() => {}, [palette]);

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
    <div className='Palette'>
      <Navbar
        level={level}
        changeLevel={handleSliderChange}
        changeFormat={handleChangeFormat}
        showingAllColors={true}
      />
      <div className='Palette__colors'>{colorBoxes}</div>
      <PaletteFooter palette={palette} />
    </div>
  );
};

export default Palette;
