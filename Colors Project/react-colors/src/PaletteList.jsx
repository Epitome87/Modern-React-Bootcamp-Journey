import React from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

function PaletteList(props) {
  return (
    <div className='PaletteList'>
      <MiniPalette />
      <h1>React Colors</h1>
      {props.palettes.map((palette) => {
        // return <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>;
        return <MiniPalette {...palette} />;
      })}
    </div>
  );
}

export default PaletteList;
