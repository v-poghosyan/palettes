import {DRAWER_WIDTH, APP_BAR_HEIGHT} from './Constants';
import sizes from './Sizes';
import myTheme from './Themes';

const drawerWidth = DRAWER_WIDTH;
const appBarHeight = APP_BAR_HEIGHT;

/* The dynamically created styles use a 'myTheme' object that is modified from the default present in Material UI */
export default {
  root: {
    display: 'flex',
    backgroundColor: "#242424"
  },

  drawer: {
    width: drawerWidth,
    backgroundColor: "#242424",
    flexShrink: 0,
    /* Drawer responsive styles */
    [sizes.down("xs")]: {
      width: "100%"
    }
  },

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#242424",
    /* Drawer paper responsive styles */
    [sizes.down("xs")]: {
      width: "100%"
    }
  },

  drawerHeader: {
    display: 'none',
    alignItems: 'center',
    padding: myTheme.spacing(0, 1),
    // necessary for content to be below app bar
    ...myTheme.mixins.toolbar,
    justifyContent: 'flex-end',
  },

  leftChevron: {
    color: "white",
    "&:hover": {
      color: "#F64F1E"
    }
  },

  content: {
    height: `calc(100vh - ${appBarHeight}px)`,
    flexGrow: 1,
    padding: 0,
    transition: myTheme.transitions.create('margin', {
      easing: myTheme.transitions.easing.sharp,
      duration: myTheme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginTop: `${appBarHeight}px`,
    /* Content responsive styles */
    [sizes.down("xs")]: {
      marginLeft: "-100%"
    }
  },
  
  contentShift: {
    transition: myTheme.transitions.create('margin', {
      easing: myTheme.transitions.easing.easeOut,
      duration: myTheme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  drawerHeader: {
    display: "flex",
    alignItems: "center",
    minHeight: "0",
  },

  Top_btn: {
    marginTop: "-3px",
    color: "black"
  }

}