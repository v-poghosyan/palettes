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
import seedPalettes from './seedPalettes';
import myTheme from './styles/Themes';
import styles from './styles/NewPaletteFormStyles';

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
      colors: seedPalettes[0].colors
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
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

  /* Connected to button and form validator */
  addNewColor(col,colName) {
    let newCol = { /* Builds a simplified color object consisting of color and name */
      name: colName,
      color: col
    }
    this.setState({...this.state, colors: [...this.state.colors, newCol]});
  }

  handleTextChange(evt) { /* Handles naming a color as well as naming a palette */
    this.setState({...this.state, [evt.target.name]: evt.target.value});
  }

  handleSave(newPal) { /* Continues building what's passed down to it from SavePaletteForm into a full palette object */
    newPal.id = newPal.paletteName.toLowerCase().replace(/ /g, "-"); /* Replace spaces globally with hyphens */
    newPal.colors = this.state.colors;
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
    let rand;
    let randomColor = allColors[rand];
    let isDuplicate = true;
    while (isDuplicate) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicate = this.state.colors.some(color => color.name === randomColor.name);
    }
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
    const {open, colors, newPaletteName} = this.state; /* Extracting state */
    const isPaletteFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        {/* Note: Passing down classes will allow us to keep the styles in one piece in the parent. So that PaletteFormNav need not be withStyles() */}
        <PaletteFormNav 
          /* classes={classes} */
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
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon className={classes.leftChevron}/>
            </IconButton>
          </div>
          <ThemeProvider theme={myTheme}>
            <Button className={classes.Top_btn}
              variant="contained"
              color="primary"
              onClick={this.clearPalette}
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
            colors={colors}
            isPaletteFull={isPaletteFull}
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
          <div className={classes.drawerHeader}/>
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