import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css'; /* Load this stylesheet before that if rc-slider to overwrite its styling */

class Palette extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderValue : 400, /* Slider value corresponds to the color levels */
      format: 'hex' /* Color format */
    }
    this.changeLevel = this.changeLevel.bind(this);
    this.changeColorFormat = this.changeColorFormat.bind(this);
  }

  changeLevel(newLevel) {
    this.setState({sliderValue : newLevel});
  }

  changeColorFormat(newFormat) {
    this.setState({...this.state, format: newFormat});
  }

  render () {

    const {colors, paletteName, emoji} = this.props.palette; /* Extracting the props */
    const {sliderValue, format} = this.state; /* Extracting the state */
    const colorBoxes = colors[sliderValue].map(col => <ColorBox background={col[format]} name={col.name} key={col.id}/>); /* An array of ColorBoxes */

    return ( 
      <div className="Palette">
        <Navbar
          sliderValue={sliderValue} 
          changeLevel={this.changeLevel}
          changeColorFormat={this.changeColorFormat}
        />
        <div className="Pal-colors">{colorBoxes}</div>
        <footer className="Pal-footer">
          <span className="Pal-name">{paletteName}</span>
          <span className="Pal-emoji">{emoji}</span>
        </footer>
      </div>
    );

  }

}

export default Palette;