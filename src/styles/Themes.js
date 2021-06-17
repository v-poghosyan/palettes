/* Overrides Material-UI themes */

import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({

  palette: {
    type: "dark",
    primary: {
      main: "#f64f1e"
    },

    secondary: {
      main: "#383838"
    }
  },

  typography: {
    fontFamily: "'Montserrat', sans-serif"
  },

  shape: {
    borderRadius: 0,
  },

})

export default theme;