import chroma from 'chroma-js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
  const newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {},
  };

  for (let level of levels) {
    newPalette.colors[level] = [];
  }

  for (let color of starterPalette.colors) {
    const scale = getScale(color.color, 10).reverse();
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, '-'),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace('rgb', 'rgba')
          .replace(')', ',1.0)'),
      });
    }
  }

  return newPalette;
}

function getRange(hexColor) {
  const end = '#fff';

  // Return array with the darkened color as 1st element, base color as 2nd, and white as the 3rd
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end];

  // Why this? When using chroma scale, using black as one of the endpoints of the scale resulted in colors that were too dark. So instead of black we just call .darken(1.4) on the color we want the range of: color.darkeN(1.4) -> base color -> white
}

function getScale(hexColor, numberOfColors) {
  return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors);
}

export { generatePalette };
