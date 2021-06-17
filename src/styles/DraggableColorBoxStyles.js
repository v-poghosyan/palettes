import sizes from './Sizes';
// import nested from 'jss-plugin-nested';
// import jss from 'jss';

// jss.use(nested());

export default {
  DraggableColorBox: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    /* Inline-block elements accept both width and height properties */ 
    display: "inline-block",
    /* Positioning relatively means positioning relative to the element's normal (flow) position - Enables top/right/bottom/left properies */
    position: "relative",
    cursor: "pointer",
    marginBottom: "-5px",
    "&:hover $DCB_trash_icon": {
      transform: "scale(1.2)"
    },

    /* DraggableColorBox responsive styles */
    [sizes.down("lg")]: {
      width: "33.33%",
      height: "14.28%"
    },

    [sizes.down("md")]: {
      width: "50%",
      height: "10%"
    },

    [sizes.down("xs")]: {
      width: "100%",
      height: "5%"
    }
  },

  DCB_content: {
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    left: "0px",
    bottom: "-5px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    TextTransform: "uppercase",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
  },

  DCB_trash_icon: {
  }

};
