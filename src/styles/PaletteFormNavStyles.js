import {DRAWER_WIDTH, APP_BAR_HEIGHT} from './Constants';
import myTheme from './Themes';

const drawerWidth = DRAWER_WIDTH;
const appBarHeight = APP_BAR_HEIGHT;

export default {

  PaletteFormNav: {
    display: "flex",
  },

  hide: {
    display: 'none',
  },

  appBar: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    color: "#556e7d",
    height: `${appBarHeight}px`,
    transition: myTheme.transitions.create(['margin', 'width'], {
      easing: myTheme.transitions.easing.sharp,
      duration: myTheme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: myTheme.transitions.create(['margin', 'width'], {
      easing: myTheme.transitions.easing.easeOut,
      duration: myTheme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: myTheme.spacing(2),
    "&:hover": {
      color: "#f64f1e"
    }
  },

  Title: {
    fontFamily: "'Montserrat', sans-serif"
  },

  Save_btn: {
    height: "25px",
    marginLeft: "auto",
    boxShadow: "none"
  },

  Back_btn: {
    height: "25px",
    marginLeft: "2px",
    boxShadow: "none",
    backgroundColor: "#f64f1e"
  }

}