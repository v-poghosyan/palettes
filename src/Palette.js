import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

class Palette extends Component {

  render () {

    const colorBoxes = this.props.colors.map(col => <ColorBox background={col.color} name={col.name}/>); /* An array of ColorBoxes */

    return (
      <div className="Palette">
        {/* Navbar */}
        <div className="Palette-colors">{colorBoxes}</div>
        {/* Footer */}
      </div>
    );

  }

}

export default Palette;