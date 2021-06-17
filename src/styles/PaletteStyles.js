/* Styles for Palette and SingleColorPalette */

import sizes from './Sizes';

export default {

  Palette: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "black"
  },

  Pal_colors: {
    height: "92%"
  },

  Go_back: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    /* Inline-block elements accept both width and height properties */ 
    display: "inline-block",
    /* Positioning relatively means positioning relative to the element's normal (flow) position - Enables top/right/bottom/left properies */
    position: "relative",
    cursor: "pointer",
    /* When styling CB-see-more, the boxes get spaced out - this line fixes that */
    marginBottom: "-4px",
    backgroundColor: "black",

    /* Back button responsive styles */

    [sizes.down("lg")]: {
      width: "100%",
      height: "25%" 
    },

    [sizes.down("md")]: {
      width: "50%",
      height: "20%"
    },

    [sizes.down("xs")]: {
      width: "100%",
      height: "10%"
    }
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