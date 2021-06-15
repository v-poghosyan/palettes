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
    }
  },

  DCB_content: {
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    left: "0px",
    bottom: "0px",
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
