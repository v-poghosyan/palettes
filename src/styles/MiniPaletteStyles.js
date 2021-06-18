/* Styles for MiniPalette */

import sizes from './Sizes';

export default {

  MiniPalette: {
    backgroundColor: "#242424",
    width: "100%",
    height: "200px",
    padding: "0.5rem",
    position: "relative",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    overflow: "hidden",
    marginBottom: "1vh",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#444444",
    },
    "&:hover $MP_delete_icon": {
      opacity: "1"
    },
  },

  MP_colors: {
    backgroundColor: "white",
    height: "80%",
    [sizes.down("sm")]: {
      height: "85%"
    }
  },

  MP_title : {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "white",
    padding: "0.5rem 0.5rem 0.5rem 0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    position: "relative",
  },

  MP_emoji: {
    marginLeft: "0.5rem"
  },

  MP_mini_box: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-4px"
  },

  MP_delete_icon: {
    color: "black",
    backgroundColor: "#f64f1e",
    padding: "10px",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "0px",
    top: "0px",
    zIndex: "10",
    opacity: "0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#C13E18"
    }
  }

}
