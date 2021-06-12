import React, { Component } from 'react';
import clsx from 'clsx';
import {colors, withStyles} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorBox from './DraggableColorBox';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import chroma from 'chroma-js';
import myTheme from './themes';

const drawerWidth = 250;
const appBarHeight = 45

/* The dynamically created styles use a 'myTheme' object that is modified from the default present in Material UI */
const styles = {
  root: {
    display: 'flex',
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
  Btn_icon: {
    marginLeft: "10px",
  }
}

class NewPaletteForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentColor: "teal",
      newName: "",
      colors: [{color: "blue", name: "blue"}]
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  /* This is where we define custom form validators */
  componentDidMount() {
    ValidatorForm.addValidationRule(
      'isNameUnique', (value) => {
        return this.state.colors.every((col) => col.name.toLowerCase() !== value.toLowerCase());
      }
    );
    ValidatorForm.addValidationRule(
      'isColorUnique', () => {
        return this.state.colors.every((col) => col.color !== this.state.currentColor);
      }
    );
  }

  /* Open/close event handlers using arrow function binding */
  handleDrawerOpen() {
    this.setState({...this.state, open: true})
  };

  handleDrawerClose() {
    this.setState({...this.state, open: false});
  };

  /* Connected to color picker */
  updateCurrentColor(currCol) {
    this.setState({...this.state, currentColor: currCol.hex});
  }

  /* Connected to button and form validator */
  addNewColor() {
    let newCol = { 
      color: this.state.currentColor,
      name: this.state.newName
    }
    this.setState({...this.state, colors: [...this.state.colors, newCol]});
  }

  handleTextChange(evt) {
    this.setState({...this.state, newName: evt.target.value});
  }

  render() {

    /* HOC withStyles and useTheme */
    const {classes} = this.props;
    const {open, currentColor, colors, newName} = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={`${classes.appBar} ${open ? classes.appBarShift : ''}`}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Pick a color
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div 
            className={classes.drawerHeader}
            style={{
              display: "flex",
              alignItems: "center",
              minHeight: "45px",
              marginBottom: "-2px"
            }}
          >
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <ThemeProvider theme={myTheme}>
            <Button variant="contained" color="secondary">Clear palette</Button>
            <Button variant="contained" color="secondary">Random color</Button>
          </ThemeProvider>
          <ChromePicker
            color={currentColor}
            onChangeComplete={(currCol) => this.updateCurrentColor(currCol)}
            width="100%"
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator 
              value={newName}
              onChange={this.handleTextChange}
              validators={['required','isNameUnique','isColorUnique']}
              errorMessages={['This field is required', 'Color name already exists', 'Color already exists']}
              style={{
                width: "100%",
              }}
            />
            <ThemeProvider theme={myTheme}>
              <Button 
                variant="contained" 
                type="submit"
                style={{
                  backgroundColor: currentColor,
                  color: chroma(currentColor).luminance() <= 0.45 ? "white" : "black",
                  width: "100%"
                }}
              >Add color
                  <FontAwesomeIcon 
                    className={classes.Btn_icon} 
                    icon={faArrowRight}
                    style={{
                      color: chroma(currentColor).luminance() <= 0.45 ? "white" : "black",
                    }}
                  />
              </Button>
            </ThemeProvider>
          </ValidatorForm>
        </Drawer>
  
        {/* Page contents go into main */}
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {colors.map(col => 
            <DraggableColorBox 
              color={col.color}
              name={col.name}
            >
            </DraggableColorBox>
          )}
        </main>
      </div>
    );
  }
  
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);