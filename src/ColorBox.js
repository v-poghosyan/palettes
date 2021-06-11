import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js'; /* Need this import to conditionally style text color based on the background color of a ColorBox */
import {withStyles} from '@material-ui/styles';
import nested from 'jss-plugin-nested';
import jss from 'jss';

jss.use(nested());

const styles = {

  ColorBox : {
    width: "20%",
    height: props => (props.moreLink ? "25%" : "50%"), /* Checks if ColorBox is being rendered by Palette or SingleColorPalette */
    margin: "0 auto",
    /* Inline-block elements accept both width and height properties */ 
    display: "inline-block",
    /* Positioning relatively means positioning relative to the element's normal (flow) position - Enables top/right/bottom/left properies */
    position: "relative",
    cursor: "pointer",
    /* When styling CB-see-more, the boxes get spaced out - this line fixes that */
    marginBottom: "-4px",
    "&:hover $CB_copy_button" : {
      opacity: "1",
      transition: "0.5s"
    },
    "&:hover $CB_see_more" : {
      opacity: "1",
      transition: "0.5s"
    }
  },

  CB_copy_button : {
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
    color: props => (chroma(props.background).luminance() >= 0.55 ? "black" : "white"),
    textTransform: "uppercase",
    cursor: "pointer",
    /* Hide button until hover */
    opacity: "0"
  },

  CB_box_name : {
    /* Positioning relative to positioned parent */
    position: "absolute",
    /* Take up whole bottom portion of parent and align to the bottom-left corner */
    width: "100%",
    left: "0px",
    bottom: "0px",
    /* Other styling */
    padding: "10px",
    color: props => (chroma(props.background).luminance() <= 0.15 ? "white" : "black"),
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "1rem"
  },

  CB_overlay : {
    /* Hide overlay except on hover */
    opacity: "0",
    /* Set the default layer of the overlay */
    position: "absolute", /* Element must be positioned for z-index to take */
    zIndex: "0",
    /* Width and height are required for scale to have a reference */
    width: "100px",
    height: "100px",
    /* Centering relative to parent */
    top: "50%",
    left: "50%",
    /* For circular growth */
    borderRadius: "50%",
    "&$CB_overlay_show" : {
      /* Make overlay appear */
      opacity: "1",
      /* Scale overlay */
      transform: "scale(50)", /* Scaling by a huge factor */
      transition: "transform 0.7s ease-in-out",
      /* Move it to a top layer so it covers the rest of the DOM */
      zIndex: "10"
    }
  },
  
  CB_overlay_show : {
    /* Make overlay appear */
    opacity: "1",
    /* Scale overlay */
    transform: "scale(50)", /* Scaling by a huge factor */
    transition: "transform 0.7s ease-in-out",
    /* Move it to a top layer so it covers the rest of the DOM */
    zIndex: "10"
  },

  CB_copy_msg : {
    /* Reset position to be fixed to the top-left corner, floating above the DOM */
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    alignItems: "center",
    justifyContent: "center",
    /* Hide it */
    display: "none",
    opacity: "0",
    /* Move it to a layer above the color overlay */
    zIndex: "20",
    /* Other styling */
    fontFamily: "'Montserrat', sans-serif",
    color: props => (chroma(props.background).luminance() >= 0.55 ? "black" : "white"),
    fontSize: "4rem",
    "&$CB_copy_msg_show" : {
      /* Make appear - display as flex to make vertical centering easier (since we're dealing with multi-line content) */
      display: "flex",
      flexDirection: "column",
      opacity: "1",
      /* Transition */
      transition: "opacity 0.7s ease-in-out",
      transitionDelay: "0.4s"
    },
    "& h1": {
      textTransform: "uppercase",
      fontWeight: "600",
      textShadow: "1px 2px rgba(0,0,0,0.3)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "10px"
    },
    "& p": {
      fontSize: "2rem",
      textShadow: "1px 2px rgba(0,0,0,0.3)",
      width: "100%",
      textAlign: "center"
    }
  },

  CB_copy_msg_show : {
    /* Make appear - display as flex to make vertical centering easier (since we're dealing with multi-line content) */
    display: "flex",
    flexDirection: "column",
    opacity: "1",
    /* Transition */
    transition: "opacity 0.7s ease-in-out",
    transitionDelay: "0.4s"
  },

  CB_see_more : {
    /* Positioning relative to positioned parent */
    position: "absolute",
    /* Align to the bottom-left corner */
    right: "0px",
    bottom: "0px",
    /* Other styling */
    fontFamily: "'Montserrat', sans-serif",
    background: "rgba(255,255,255,0.3)",
    border: "none",
    fontSize: "0.75rem", /* Units of 'rem' are referenced from 'root font size.' Unlike 'em' units, these don't get smaller with each level of nesting */
    width: "60px",
    height: "30px",
    color: props => (chroma(props.background).luminance() >= 0.55 ? "black" : "white"),
    textTransform: "uppercase",
    textAlign: "center",
    lineHeight: "30px", /* Same line height as the element itself: centers text vertically */
    /* Hide button until hover */
    opacity: "0"
  }

}

class ColorBox extends Component {

  /* Props received : {color: '...', name: '...', moreLink: true/false, ...} */

  constructor(props) {
    super(props);
    this.state = { beingCopied: false }; /* For conditional styling based on if ColorBox is being copied */
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    /* Sets beingCopied to 'true' and, as callback, sets it back to 'false' after 1.5 seconds */
    this.setState({beingCopied: true}, () => setTimeout(() => this.setState({beingCopied: false}), 1500));
  }

  render () {

    const {classes, name, background, colorId, paletteId, moreLink} = this.props; /* Extracting the props */
    const copied = this.state.beingCopied; /* Extracting state */
    const isDark = (chroma(background).luminance() <= 0.15); /* Boolean value for whether or not a color is dark */
    const isLight = (chroma(background).luminance() >= 0.55); 

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className={classes.ColorBox} style={{background: background}}>
          {/* Next two divs are hidden overlays that appears only when ColorBox is being copied */}
          <div className={`${classes.CB_overlay} ${copied ? classes.CB_overlay_show : ''}`} style={{background: background}} />
          <div className={`${classes.CB_copy_msg} ${copied ? classes.CB_copy_msg_show : ''}`}>
            <h1>Copied!</h1>
            <p>{background}</p>
          </div>
          <div className="CB-copy-container">
            <div className={classes.CB_box_name}>
              <span>{name}</span>
            </div>
            <button className={classes.CB_copy_button}>Copy</button>
            {/* Note 1: If ColorBox is being renderd from Palette, show 'see more' link. If being rendered from SingleColorPalette, don't */}
            {/* Note 2: stopPropagation() stops click event from propagating to parent CoptToClipboard, preventing copying */}
            {moreLink ? 
              <Link 
                to={`/palette/${paletteId}/${colorId}`} 
                onClick={(evt) => evt.stopPropagation()}
              > 
                <span className={classes.CB_see_more}>More</span>
              </Link> : "" }
          </div>
        </div>
      </CopyToClipboard>
    );

  }

}

export default withStyles(styles)(ColorBox);