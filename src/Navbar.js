import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {

  
  constructor(props) {
    super(props);
    this.state = { format: 'hex' }; /* Keep track of format for the Selector component */
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({format : evt.target.value}); /* Changes the value of the material-ui selector */
    this.props.changeColorFormat(evt.target.value); /* Format needs to be passed up to parent palette so that the latter can change the ColorBox formats */
  }

  render () {

    const {sliderValue, changeLevel} = this.props; /* Extracting the props */
    const format = this.state.format; /* Extracting the state */

    return(
      <nav className="Navbar">
        {/* Logo */}
        <div className="Navbar-logo">
          <a href="/">Palettes.io</a>
        </div>
        {/* Color Level Slider - using rc-slider */}
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
        {/* Color Format Selector - using material-ui */}
        <div className="Select-wrapper">
              <Select value={format} onChange={this.handleChange}>
                <MenuItem value="hex">HEX: #ffffff</MenuItem>
                <MenuItem value="rgb">RGB: rgb(255,255,255)</MenuItem>
                <MenuItem value="rgba">RGBA: rgb(255,255,255,1.0)</MenuItem>
              </Select>
        </div>
      </nav>
    );

  }

}

export default Navbar;