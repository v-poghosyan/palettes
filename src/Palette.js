import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Footer from './Footer';
import {withStyles} from '@material-ui/styles';
import styles from './styles/PaletteStyles';

class Palette extends Component {

  /* Props received : { palette: {a full palette generated by generatePalettes() helper method for a given seed palette} } */

  constructor(props) {
    super(props);
    this.state = {
      sliderValue : 500, /* Slider value corresponds to the color levels */
      format: 'hex' /* Color format */
    }
    this.changeLevel = this.changeLevel.bind(this);
    this.changeColorFormat = this.changeColorFormat.bind(this);
  }

  changeLevel(newLevel) { /* Sets the new level in state */
    this.setState({sliderValue : newLevel});
  }

  changeColorFormat(newFormat) { /* Sets the new format in state */
    this.setState({...this.state, format: newFormat});
  }

  render () {

    const {classes} = this.props; /* Extracting the props */
    const {colors, paletteName, emoji, id} = this.props.palette;
    const {sliderValue, format} = this.state; /* Extracting the state */
    /* An array of ColorBoxes */
    const colorBoxes = colors[sliderValue].map(col => <ColorBox 
      background={col[format]} 
      name={col.name} key={col.id} 
      colorId={col.id} 
      paletteId={id}
      moreLink={true}
    />);

    return ( 
      <div className={classes.Palette}>
        <Navbar
          sliderValue={sliderValue} 
          changeLevel={this.changeLevel}
          changeColorFormat={this.changeColorFormat}
          showSlider = {true}
          showFormatChanger = {true}
          showAddNewPalette={false}
        /> 
        <div className={classes.Pal_colors}>{colorBoxes}</div>
        <Footer name={paletteName} emoji={emoji}/>
      </div>
    );

  }

}

export default withStyles(styles)(Palette);