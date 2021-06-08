import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
        <Slider 
          defaultValue={this.state.sliderValue} 
          min={100} 
          max={900}
          step={100}
          onAfterChange={this.changeLevel}
        />
        {/* Navbar */}
        <div className="Pal-colors">{colorBoxes}</div>
        {/* Footer */}
      </div>
    );

  }

}

export default Palette;