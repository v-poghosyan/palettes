import React, { Component } from 'react';
import ColorBox from './ColorBox'; /* We will style ColorBox slightly differently in this component using JSS */
import Navbar from './Navbar';
import Footer from './Footer';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';

const styles = {

  Palette: {
    height: "100vh",
    width: "100vw",
  },

  Pal_colors: {
    height: "92%"
  },

  Go_back: {
    width: "20%",
    height: "50%", /* Checks if ColorBox is being rendered by Palette or SingleColorPalette */
    margin: "0 auto",
    /* Inline-block elements accept both width and height properties */ 
    display: "inline-block",
    /* Positioning relatively means positioning relative to the element's normal (flow) position - Enables top/right/bottom/left properies */
    position: "relative",
    cursor: "pointer",
    /* When styling CB-see-more, the boxes get spaced out - this line fixes that */
    marginBottom: "-4px",
    backgroundColor: "#556e7d",
  },
  
  Go_back_button: {
    width: "100px",
    height: "30px",
    /* Positioning absolutely in a positioned parent means positioning relative to that parent */
    position: "absolute",
    display: "inline-block",
    /* Centering relative to parent */
    top: "50%",
    left: "50%",
    /* Offsetting the button's own width and height for proper centering*/
    marginLeft: "-50px", /* 50px = width/2 */
    marginTop: "-15px",  /* 15px = height/2 */
    /* Other styling */
    fontFamily: "'Montserrat', sans-serif",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.3)",
    fontSize: "1rem", /* Units of 'rem' are referenced from 'root font size.' Unlike 'em' units, these don't get smalled with each nested element */
    lineHeight: "30px", /* Same line height as the element itself: centers text vertically */
    color: "white",
    textTransform: "uppercase",
    cursor: "pointer",
    opacity: "1",
    textAlign: "center"
  }

}

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