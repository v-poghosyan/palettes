import React, { Component } from 'react';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
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

class ColorPickerForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentColor: this.props.currentColor,
      newColorName: this.props.newColorName
    }
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  
  handleUpdate(currCol) {
    this.props.updateCurrentColor(currCol.hex); /* Update the state in parent (i.e. NewPaletteForm */
    this.setState({...this.state, currentColor: currCol.hex}); /* Update the state in child (i.e. the current component) */
  }

  handleChange(evt) {
    this.props.handleTextChange(evt);
    this.setState({...this.state, newColorName: evt.target.value});
  }

  render() {

    const {currentColor, newColorName} = this.state; /* Extracting state */

    const { /* Extracting props */
      classes, 
      isPaletteFull,
      addNewColor
    } = this.props;

    return(
      <div>
        <ChromePicker
            color={currentColor}
            onChangeComplete={(currCol) => this.handleUpdate(currCol)}
            width="100%"
          />
          <ValidatorForm onSubmit={addNewColor}>
            <TextValidator 
              value={newColorName}
              label="Color Name"
              name="newColorName" /* handleTextChange relies on this attribute */
              onChange={this.handleChange}
              validators={['required','isNameUnique','isColorUnique']}
              errorMessages={['Enter a color name', 'Color name already exists', 'Color already exists']}
              style={{
                width: "100%",
              }}
            />
            <ThemeProvider theme={myTheme}>
              <Button 
                variant="contained" 
                type="submit"
                disabled={isPaletteFull}
                style={{
                  backgroundColor: (isPaletteFull ? "#E0E0E0" : currentColor),
                  color: chroma(currentColor).luminance() <= 0.45 ? "white" : "black",
                  width: "100%"
                }}
              >{isPaletteFull ? "Palette is full" : "Add color"}
                  {isPaletteFull ?
                    <FontAwesomeIcon 
                    className={classes.Btn_icon} 
                    icon={faExclamationCircle}
                    style={{
                      color: chroma(currentColor).luminance() <= 0.45 ? "white" : "black",
                    }}
                    /> : 
                    <FontAwesomeIcon 
                    className={classes.Btn_icon} 
                    icon={faArrowRight}
                    style={{
                      color: chroma(currentColor).luminance() <= 0.45 ? "white" : "black",
                    }}
                    /> 
                  }
              </Button>
            </ThemeProvider>
          </ValidatorForm>
      </div>
    );
  }

}

export default ColorPickerForm;