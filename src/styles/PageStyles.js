/* Route transition classes */
export default {

  Page: {

  },

  "@global" : {

    ".fade-enter": {
      opacity: "0",
      transform: "scale(1.1)"
    },

    ".fade-enter-active": {
      opacity: "1",
      transform: "scale(1)",
      transition: "opacity 300ms, transform 300ms"
    },
    
    ".fade-exit": {
      opacity: "1",
      transform: "scale(1)"
    },
    
    ".fade-exit-active": {
      opacity: "0",
      transform: "scale(0.9)",
      transition: "opacity 300ms, transform 300ms"
    }

  }
  
}