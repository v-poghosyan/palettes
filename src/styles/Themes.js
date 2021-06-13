/* Overrides Material-UI themes */

import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({

  palette: {
    primary: {
      main: "#556e7d"
    },

    secondary: {
      main: "#e7edf1"
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