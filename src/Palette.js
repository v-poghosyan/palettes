import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
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
        <div className="Slider-wrapper">
          <Slider 
            defaultValue={this.state.sliderValue} 
            min={100} 
            max={900}
            step={100}
            onAfterChange={this.changeLevel}
            handleStyle={[{ /* Using this prop instead of simply selecting in CSS because of elusive :hover, :active, :focus, etc pseudo-classes */
              backgroundColor: 'mediumseagreen', 
              outline: 'none', 
              border: 'none', 
              marginTop: '-2px',
              boxShadow: 'none'}]}
          />
        </div>
        {/* Navbar */}
        <div className="Pal-colors">{colorBoxes}</div>
        {/* Footer */}
      </div>
    );

  }

}

export default Palette;