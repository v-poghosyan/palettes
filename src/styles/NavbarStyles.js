/* Styles for Navbar */

import sizes from './Sizes';

export default {

  Navbar: {
    display: "flex",
    backgroundColor: "#242424",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: "5%",
    width: "100%",
    /* Positioning needed for z-index, which is needed for box shadow to be visible */
    position: "sticky",
    zIndex: "30",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
  },

  Nav_add_palette: {
    marginLeft: "auto",
    marginRight: "20px",
    color: "white",
    "&:hover": {
      color: "#f64f1e"
    }
  },
  
  Nav_add_icon: {
    marginLeft: "10px"
  },

  Navbar_logo: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
    padding: "0 12px",
    fontSize: "1.5rem",
    backgroundColor: "#242424",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "700",
    height: "100%",
    "&:hover a:first-child": {
      color: "#f64f1e"
    },
    /* styling anchors works with react Link components since the latter are anchors under the hood */
    "& a:first-child": {
      textDecoration: "none",
      color: "white"
    },
    "& a:nth-child(2)" : {
      color: "white",
      display: "none"
    },
    /* Navbar responsive styles */
    [sizes.down("xs")]: {
      "& a": {
        display: props => (props.showAddNewPalette ? "flex" : "none")
      },
      "& a:nth-child(2)" : {
        display: props => (props.showAddNewPalette ? "none" : "flex")
      }
    }
  },
  
  Slider_wrapper: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    color: "white",
    alignItems: "center",
    "& span": {
      display: "inline-flex",
      marginTop: "5px",
      marginRight: "20px",
      width: "20%",
      fontSize: "1rem",
      fontFamily: "'Montserrat', sans-serif"
    },
    /* Navbar responsive styles */
    // [sizes.down("lg")]: {
    //   width: "50%",
    // },
    [sizes.down("md")]: {
      width: "40%",
      "& span": {
        width: "10%",
      },
      "& span p": {
        display: "none"
      }
    },
    [sizes.down("xs")]: {
      width: "50%",
      "& span": {
        width: "12%",
      },
      "& span p": {
        display: "none"
      }
    }
  },

  Slider: {
    display: "inline-flex",
    width: "25%"
  },

  Select_wrapper: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto", /* push to left */
    marginRight: "20px",
    color: "white",
    "& span": {
      display: "flex",
      alignItems: "center",
      marginRight: "20px",
      fontFamily: "'Montserrat', sans-serif"
    },
    /* Navbar responsive styles */
    [sizes.down("md")]: {
      "& span" : {
        display: "none"
      }
    },
    [sizes.down("xs")]: {
      marginRight: "5px",
      "& span" : {
        display: "none"
      }
    }
  },
  
  Slider: {
    display: "flex",
    /* .rc-slider-track and .rc-slider-rail are not dynamic classes, so they can be selected like so */
    "& .rc-slider-track": {
      backgroundColor: "#5e5e5e",
      height: "10px",
    },
    "& .rc-slider-rail": {
      height: "10px",
      backgroundColor: "#363636",
    } 
  }

}