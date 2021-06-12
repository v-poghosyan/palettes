/* Styles for MiniPalette */

export default {

  MiniPalette: {
    backgroundColor: "white",
    height: "20vh",
    padding: "0.5rem",
    position: "relative",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    overflow: "hidden",
    marginBottom: "1vh",
    "&:hover" : {
      cursor: "pointer"
    }
  },

  MP_colors: {
    backgroundColor: "white",
    height: "85%"
  },

  MP_title : {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
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
  }
}
