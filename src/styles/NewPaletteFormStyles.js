import {DRAWER_WIDTH, APP_BAR_HEIGHT} from './Constants';
import myTheme from './Themes';

const drawerWidth = DRAWER_WIDTH;
const appBarHeight = APP_BAR_HEIGHT;

/* The dynamically created styles use a 'myTheme' object that is modified from the default present in Material UI */
export default {
  root: {
    display: 'flex',
  },
  
  hide: {
    display: 'none',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
  },

  drawerHeader: {
    display: 'none',
    alignItems: 'center',
    padding: myTheme.spacing(0, 1),
    // necessary for content to be below app bar
    ...myTheme.mixins.toolbar,
    justifyContent: 'flex-end',
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
    marginTop: `${appBarHeight}px`
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
    marginTop: "-3px"
  }

}