import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {

  render () {

    const {sliderValue, changeLevel} = this.props; /* Extracting the props */
    
    return(
      <nav className="Navbar">
        <div className="Navbar-logo">
          <a href="/">Palettes.io</a>
        </div>
        <div className="Slider-wrapper">
          <span>Level: {sliderValue}</span>
          <Slider
            className = "Slider" 
            defaultValue={sliderValue} 
            min={100} 
            max={900}
            step={100}
            onAfterChange={changeLevel}
            handleStyle={[{ /* Using this prop instead of simply selecting in CSS because of elusive :hover, :active, :focus, etc pseudo-classes */
              backgroundColor: '#556e7d', 
              outline: 'none', 
              border: '1px solid #556e7d', 
              marginTop: '-2px',
              boxShadow: 'none'}]}
          />
        </div>
      </nav>
    );

  }

}

export default Navbar;