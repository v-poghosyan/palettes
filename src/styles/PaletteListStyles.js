/* Styles for PaletteList */

import sizes from './Sizes';
import background from './Background.svg';

export default {

  /* The following are global styles for the delete transition effect - global styles are not prefixed and postifixed dynamically by JSX and they're not scoped to the component */
  "@global" : {
    ".fade-exit": {
      opacity: "1"
    },
    ".fade-exit-active": {
      opacity: "0",
      transition: "opacity 300ms ease-out"
    },
  },

  PaletteList: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Montserrat', sans-serif;",
    overflow: "scroll",
    overflowX: "hidden",
    backgroundImage : `url(${background})`
  },

  PL_container: {
    width: "50%",
    height: "95%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    position: "relative",
    top: "50px",
    [sizes.down("xl")]: {
      width: "60%"
    },
    [sizes.down("lg")]: {
      width: "70%"
    },
    [sizes.down("lg")]: {
      width: "80%"
    },
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
    gridGap: "2rem", /* (30 + 5 + 30 + 5 + 30)% = 100% */
    gridRowGap: "1rem",
    [sizes.down("sm")]: {
      gridTemplateColumns: "repeat(2, 45%)",
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 95%)",
    },
  }

}