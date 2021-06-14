import React, { Component } from 'react';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import chroma from 'chroma-js';
import myTheme from './styles/Themes';

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

  /* Props received: { palettes: [...], savePalette: function() } */

  static defaultProps = {
    maxColors: 20
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newPaletteName: "",
      currentColor: "teal",
      newColorName: "",
      colors: this.props.palettes[0].colors
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.deleteColor = this.deleteColor.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  /* Open/close event handlers using arrow function binding */
  handleDrawerOpen() {
    this.setState({...this.state, open: true})
  };

  handleDrawerClose() {
    this.setState({...this.state, open: false});
  };

  /* Connected to color picker */
  updateCurrentColor(col) {
    this.setState({...this.state, currentColor: col});
  }

  /* Connected to button and form validator */
  addNewColor() {
    let newCol = { /* Builds a simplified color object consisting of color and name */
      name: this.state.newColorName,
      color: this.state.currentColor
    }
    this.setState({...this.state, colors: [...this.state.colors, newCol]});
  }

  handleTextChange(evt) { /* Handles naming a color as well as naming a palette */
    this.setState({...this.state, [evt.target.name]: evt.target.value});
  }

  handleSave(newPalName) {
    let newPal = { /* Builds a full palette object */
      paletteName: newPalName,
      id: newPalName.toLowerCase().replace(/ /g, "-"), /* Replace spaces globally with hyphens */
      emoji: "🎨",
      colors: this.state.colors
    }
    /* Save palette */
    this.props.savePalette(newPal);
    /* Redirect to Palette List */
    this.props.history.push("/");
  }

  deleteColor(colName) {
    this.setState({...this.state, colors: this.state.colors.filter((col) => col.name !== colName)});
  }

  clearPalette() {
    this.setState({...this.state, colors: []})
  }

  addRandomColor() { /* Picks a random color from existing palettes */
    const allColors = this.props.palettes.map((pal) => pal.colors).flat(); /* Flattens nested arrays of colors */
    let rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    this.setState({...this.state, colors: [...this.state.colors, randomColor]});
  }

  /* Comes with react-sortable-hoc */
  onSortEnd({oldIndex, newIndex}) {
    const arrayMove = require('array-move'); /* Equivalent to importing */
    this.setState((currState) => ({colors: arrayMove(currState.colors, oldIndex, newIndex)}));
  }

  render() {
    
    /* HOC withStyles and useTheme */
    const {classes, maxColors, palettes} = this.props; /* Extracting props */
    const {open, currentColor, colors, newColorName, newPaletteName} = this.state; /* Extracting state */
    const isPaletteFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        {/* Note: Passing down classes will allow us to keep the styles in one piece in the parent. So that PaletteFormNav need not be withStyles() */}
        <PaletteFormNav 
          classes={classes} 
          open={open}
          newPaletteName={newPaletteName}
          palettes={palettes}
          handleTextChange={this.handleTextChange}
          handleDrawerOpen={this.handleDrawerOpen}
          handleDrawerClose={this.handleDrawerClose}
          handleSave={this.handleSave}
        />
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
            <Button 
              variant="contained"
              color="secondary"
              onClick={this.clearPalette}
              style={{backgroundColor: "#f64f1e"}}
            >Clear palette
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              disabled={isPaletteFull}
              onClick={this.addRandomColor}
            >{isPaletteFull ? "Palette is full" : "Random color"}
            </Button>
          </ThemeProvider>
          <ColorPickerForm 
            classes={classes} 
            isPaletteFull={isPaletteFull}
            currentColor={currentColor}
            newColorName={newColorName}
            updateCurrentColor={this.updateCurrentColor}
            handleTextChange={this.handleTextChange}
            addNewColor={this.addNewColor}
          />
        </Drawer>
  
        {/* Page contents go into main */}
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            axis='xy' /* Vor horizontal and vertical draggability */
            distance={1} /* Required for delete button's onClick event to fire, otherwise a click registers as an attempt to drag */
            onSortEnd={this.onSortEnd} /* Saves order of colors after drag and drop */
            colors={colors}
            deleteColor={this.deleteColor}
          >
          </DraggableColorList>
        </main>
      </div>
    );
  }
  
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);