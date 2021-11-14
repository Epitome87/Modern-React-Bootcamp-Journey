import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Palette.css';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import { generatePalette } from './colorHelpers';

// Receives all "palettes"
const Palette = ({ palettes }) => {
  function findPalette(id) {
    return palettes.find((palette) => palette.id === id);
  }

  const params = useParams();
  // Generate the palette based on the URL
  const palette = generatePalette(findPalette(params.id));

  // Basically componentDidMount
  useEffect(() => {
    console.log('PAL', palette);
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
    />
  ));

  return (
    <div className='Palette'>
      <Navbar
        level={level}
        changeLevel={handleSliderChange}
        changeFormat={handleChangeFormat}
      />
      <div className='Palette__colors'>{colorBoxes}</div>
      <footer className='Palette__footer'>
        {palette.paletteName}
        <span className='emoji'>{palette.emoji}</span>
      </footer>
    </div>
  );
};

export default Palette;
