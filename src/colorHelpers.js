/* Helper methods for working with colors */

/* Palette object structure - new palette takes the 20 colors of a starter palette and for each generates a 50,100,...,900 scale. */
/* Then it stores all the 20 50-level colors at the key '50' in the colors prop, and so on for the other levels... */
/* For example: */
// {
//   paletteName: "Material UI Colors",
//   id: "material-ui-colors",
//   emoji: "🎨",
//   colors: {
//      50 : [ {name: "red 50", id: "red-50", hex: "#red50HexValue", rgb: "#red50RGBValue"}, rgba: ... }, {next color}, ... , {last color}]
//      100 : [ {name: "red 100", id: "red-100", hex: "#red100HexValue", rgb: "#red100RGBValue"}, rgba: ... }, {next color}, ... , {last color}]
//      ...
//      900 : [ {name: "red 900", id: "red-900", hex: "#red900HexValue", rgb: "#red900RGBValue"}, rgba: ... }, {next color}, ... , {last color}]
//   }
// }



import chroma from 'chroma-js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]; /* Color levels */

function generatePalette(starterPalette) {

  /* Construct a new palette from the starter palette by emptying out its colors */
  let newPalette = {...starterPalette, colors: {} };
  /* Add levels as keys corresponding to empty arrays in colors */ 
  for (let lvl of levels) {
    newPalette.colors[lvl] = [];
  }
  /* Generate a 10-value scale for each color in the starter palette, then populate the 50, 100, ..., 900 levels with these scales respectively */
  for (let col of starterPalette.colors) {
    let scale = generateScale(col.color, 10)
      .reverse(); /* Reverse makes the scale be in decreasing order of lightness to match the levels array */
    for (let idx in scale) {
      newPalette.colors[levels[idx]].push({ /* Note: bracket notation needed since keys start with a number */
          name: `${col.name} ${levels[idx]}`,
          id : col.name.toLowerCase().replace(/ /g, "-") + `-${levels[idx]}`, /* Regular expression replacing spaces with dashes */
          hex: scale[idx],
          rgb: chroma(scale[idx]).css(), /* .css() converts hex to rgb */
          rgba: chroma(scale[idx]).css().replace("rgb","rgba").replace(")", ",1.0)")
      });
    }
  }
  return newPalette;
}

/* Returns a range array of [darkened color, color, white] */
function getRange(hexCol) {
  const end = '#FFF';
  return [chroma(hexCol)
    .darken(1.4)
    .hex(), 
    hexCol, 
    end];
}

/* Generates a numCols-value scale for a given hexCol input, that is a numCols item array of related colors */
function generateScale(hexCol, numCols) {
  return chroma
    .scale(getRange(hexCol))
    .mode('lab') /* The mode can be either 'lab' or 'rgb' and refers to the mode of interpolation */
    .colors(numCols); /* This converts the scale into an array of numCol elements */
}

export {generatePalette};