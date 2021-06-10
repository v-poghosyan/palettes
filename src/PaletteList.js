import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';

class PaletteList extends Component {

  /* Props received : { palettes: [the seed palettes]} } */

  render() {

    const {palettes} = this.props; /* Extracting prop */

    return(
      <div className="PaletteList">
        <MiniPalette />
        <h1>Palettes.io</h1>
        {palettes.map(
          (palette) => (<p><Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link></p>))}
      </div>
    );

  }

}

export default PaletteList;