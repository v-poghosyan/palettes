export default {

  /* The following are global styles for the delete transition effect - global styles are not prefixed and postifixed dynamically by JSX */
  "@global" : {
    ".fade-exit": {
      opacity: "1"
    },
    ".fade-exit-active": {
      opacity: "0",
      transition: "opacity 300ms ease-out"
    },
  },

  DraggableColorList: {
    height: "100%",
  },

};
