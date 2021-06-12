/* Styles for Navbar */

export default {

  Navbar: {
    display: "flex",
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: "5%",
    width: "100%",
    /* Positioning needed for z-index, which is needed for box shadow to be visible */
    position: "relative",
    zIndex: "30",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
  },
  
  Navbar_logo: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
    padding: "0 12px",
    fontSize: "22px",
    backgroundColor: "#e7edf1",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "700",
    height: "100%",
    /* styling anchors works with react Link components since the latter are anchors under the hood */
    "& a": {
      textDecoration: "none",
      color: "#556e7d"
    }
  },
  
  Slider_wrapper: {
    width: "15%",
    margin: "0 10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& span": {
      display: "flex",
      marginTop: "5px",
      width: "140px",
      fontSize: "1rem",
      fontFamily: "'Montserrat', sans-serif"
    }
  },

  Select_wrapper: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto", /* push to left */
    marginRight: "20px",
    "& span": {
      display: "flex",
      alignItems: "center",
      marginRight: "20px",
      fontFamily: "'Montserrat', sans-serif"
    }
  },
  
  Slider: {
    display: "flex",
    /* .rc-slider-track and .rc-slider-rail are not dynamic classes, so they can be selected like so */
    "& .rc-slider-track": {
      backgroundColor: "#a1b8c7",
      height: "10px",
    },
    "& .rc-slider-rail": {
      height: "10px"
    } 
  }

}