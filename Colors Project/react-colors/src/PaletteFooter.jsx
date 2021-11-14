import React from 'react';

function PaletteFooter({ palette }) {
  return (
    <footer className='Palette__footer'>
      {palette.paletteName}
      <span className='emoji'>{palette.emoji}</span>
    </footer>
  );
}

export default PaletteFooter;
