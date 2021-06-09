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

    const colors = this.props.palette.colors; /* Extracting the props */
    const {sliderValue, format} = this.state; /* Extracting the state */
    const colorBoxes = colors[sliderValue].map(col => <ColorBox background={col[format]} name={col.name}/>); /* An array of ColorBoxes */

    return ( 
      <div className="Palette">
        <Navbar 
          sliderValue={sliderValue} 
          changeLevel={this.changeLevel}
          changeColorFormat={this.changeColorFormat}
        />
        {/* Navbar */}
        <div className="Pal-colors">{colorBoxes}</div>
        {/* Footer */}
      </div>
    );

  }

}

export default Palette;