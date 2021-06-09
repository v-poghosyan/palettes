import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css'; /* Load this stylesheet before that if rc-slider to overwrite its styling */

class Palette extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderValue : 400 /* Slider value corresponds to the color levels */
    }
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeLevel(newLevel) {
    this.setState({sliderValue : newLevel});
  }

  render () {

    const colors = this.props.palette.colors; /* Extracting the props */
    const sliderValue = this.state.sliderValue; /* Extracting the state */
    const colorBoxes = colors[sliderValue].map(col => <ColorBox background={col.hex} name={col.name}/>); /* An array of ColorBoxes */

    return ( 
      <div className="Palette">
        <Navbar sliderValue={sliderValue} changeLevel={this.changeLevel}/>
        {/* Navbar */}
        <div className="Pal-colors">{colorBoxes}</div>
        {/* Footer */}
      </div>
    );

  }

}

export default Palette;