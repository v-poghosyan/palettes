import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {

  
  constructor(props) {
    super(props);
    this.state = { 
      format: 'hex', /* Keep track of format for the Selector component */
      open: false /* Kepp track of whether or not snackbar is open */
    }; 
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleFormatChange(evt) {
    this.setState({format : evt.target.value, open: true}); /* Changes the value of the material-ui selector and makes snackbar appear*/
    this.props.changeColorFormat(evt.target.value); /* Format needs to be passed up to parent palette so that the latter can change the ColorBox formats */
  }

  closeSnackbar(evt) {
    this.setState({...this.state, open: false});
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
          <span>Change format </span>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX</MenuItem>
            <MenuItem value="rgb">RGB</MenuItem>
            <MenuItem value="rgba">RGBA</MenuItem>
          </Select>
        </div>
        {/* Snackbar to notify of format change - using material-ui */}
        <Snackbar 
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} /* Aligns snackbar */
          open={this.state.open} /* Boolean for whether or not the snackbar is open */
          autoHideDuration={3000} /* Time in milliseconds to hide the snackbar */
          message={<span id="Message-ID">Format changed to {format.toUpperCase()}</span>} /* HTML message */
          ContentProps={{'aria-describedby' : 'Message-ID'}} /* For accessibility by screen readers */
          action={[ 
            <IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
              <CloseIcon />
            </IconButton>
          ]} /* Array of buttons that go into snackbar */
          onClose={this.closeSnackbar} /* Clicking away somwhere else triggers the close event, as does the auto hide feature */
        />
      </nav>
    );

  }

}

export default Navbar;