import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusSquare, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {ThemeProvider} from '@material-ui/core';
import myTheme from './styles/Themes';
import styles from './styles/NavbarStyles';

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

  closeSnackbar() {
    this.setState({...this.state, open: false});
  }

  render () {

    const {classes, sliderValue, changeLevel, showSlider, showFormatChanger, showAddNewPalette} = this.props; /* Extracting the props */
    const format = this.state.format; /* Extracting the state */

    return(
      <nav className={classes.Navbar}>

        {/* Logo */}
        {showAddNewPalette || showFormatChanger ? 
          <div className={classes.Navbar_logo}>
            <Link to="/">Palettes.io</Link>
            <Link to="/"><FontAwesomeIcon icon={faArrowLeft} /></Link>
          </div> : ''}

        {/* Add new palette */}
        {showAddNewPalette ? 
          <Link to="/palette/new" className={classes.Nav_add_palette}>Add Palette
            <FontAwesomeIcon className={classes.Nav_add_icon} icon={faPlusSquare} />
          </Link> : ''}


        {/* Color Level Slider - using rc-slider */}
        {/* If being rendered from Palette component, show slider. If being rendered from SingleColorPalette component, don't*/}
        {showSlider ? 
          <div className={classes.Slider_wrapper}>
            <span><p>Level: </p>{sliderValue}</span>
            <Slider
              className = {classes.Slider} 
              defaultValue={sliderValue} 
              min={100} 
              max={900}
              step={100}
              onAfterChange={changeLevel}
              handleStyle={[{ /* Using this prop instead of simply selecting in CSS because of elusive specificity of :hover, :active, :focus, etc pseudo-classes */
                backgroundColor: '#f64f1e', 
                outline: 'none', 
                border: '1px solid #f64f1e', 
                marginTop: '-2px',
                boxShadow: 'none'}
              ]}
            />
          </div> : ""}
        
        {/* Color Format Selector - using material-ui */}
        {showFormatChanger ? 
          <div className={classes.Select_wrapper}>
            <span>Change format </span>
            <ThemeProvider theme={myTheme}>
              <Select value={format} onChange={this.handleFormatChange} styles={{color: "white"}}>
                <MenuItem color="white" value="hex">HEX</MenuItem>
                <MenuItem value="rgb">RGB</MenuItem>
                <MenuItem value="rgba">RGBA</MenuItem>
              </Select>
            </ThemeProvider>
          </div> : ""}

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

export default withStyles(styles)(Navbar);