import React from 'react';
import { Link } from 'react-router-dom';

function PaletteList(props) {
  return (
    <div className='PaletteList'>
      <h1>React Colors</h1>
      {props.palettes.map((palette) => {
        return <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>;
      })}
    </div>
  );
}

export default PaletteList;
