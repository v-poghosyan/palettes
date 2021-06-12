/* Styles for PaletteList */

export default {

  PaletteList: {
    backgroundColor: "gray",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Montserrat', sans-serif;"
  },

  PL_container: {
    width: "50%",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap"
  },

  PL_nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white"
  },

  PL_palettes: {
    boxSizing: "border-box",
    width: "100%", /* A row is 100% the width of the container */
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)", /* 3 items going across a row */
    gridGap: "5%", /* (30 + 5 + 30 + 5 + 30)% = 100% */
  }

}