import React, { Component } from 'react';
import ColorBox from './ColorBox'; /* We will style ColorBox slightly differently in this component using JSS */
import Navbar from './Navbar';
import Footer from './Footer';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import styles from './styles/PaletteStyles';

class SingleColorPalette extends Component {

  constructor(props) {
    super(props);
    this.state = { format: 'hex' };
    this.changeColorFormat = this.changeColorFormat.bind(this);
  }

  changeColorFormat(newFormat) { /* Sets the new format in state */
    this.setState({...this.state, format: newFormat});
  }

  getShadesOfColor(palette, colorId) { /* Returns the 100,200,...,900 levels of a given color */

    let _shades = [];
    for (let lvl in palette.colors) {
      _shades.push(palette.colors[lvl].find((col) => col.id.slice(0,-4) === colorId.slice(0,-4)));
    }
    return _shades.slice(1); /* Don't need the 50-level color */

  }

  render() {

    const {classes, palette, colorId} = this.props; /* Extracting props */
    const {format} = this.state /* Extracting state */
    const shades = this.getShadesOfColor(palette, colorId);
    console.log(shades);

    return(
      <div className={classes.Palette}>
        <Navbar 
          changeColorFormat={this.changeColorFormat}
          showSlider={false}
          showFormatChanger={true}
          showAddNewPalette={false}
        />
        <div className={classes.Pal_colors}>
          {shades.map((col) =>
            <ColorBox
              key={col.id} 
              name={col.name} 
              background={col[format]}
              moreLink={false} 
            />
          )}
          <div className={classes.Go_back}> {/* Back button has almost the same styling as a ColorBox */}
            <Link
              className={classes.Go_back_button}
              to={`/palette/${palette.id}`} 
            >Go back
            </Link>
          </div>
        </div>
        <Footer name={shades[0].name.slice(0,-4)} emoji={palette.emoji}/>
      </div>
    ); 
  }

}

export default withStyles(styles)(SingleColorPalette);