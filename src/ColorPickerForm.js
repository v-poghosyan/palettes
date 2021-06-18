import React, { Component } from 'react';
import {withStyles} from '@material-ui/styles';
import {ThemeProvider} from '@material-ui/core';
import Button from '@material-ui/core/Button'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import chroma from 'chroma-js';
import {styles, chromePickerStyles} from './styles/ColorPickerFormStyles';
import myTheme from './styles/Themes';

class ColorPickerForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentColor: "#F64F1E",
      newColorName: "",
    }
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* This is where we define custom form validators */
  componentDidMount() {
    ValidatorForm.addValidationRule(
      'isNameUnique', (value) => {
        return this.props.colors.every((col) => col.name.toLowerCase() !== value.toLowerCase());
      }
    );
    ValidatorForm.addValidationRule(
      'isColorUnique', () => {
        return this.props.colors.every((col) => col.color !== this.state.currentColor);
      }
    );
  }

  handleSubmit(col, colName) {
    this.props.addNewColor(col, colName);
    this.setState({...this.state, newColorName: ""}); /* Resets text input */
  }
  
  updateCurrentColor(col) {
    this.setState({...this.state, currentColor: col.hex});
  }

  handleTextChange(evt) { /* Handles naming a color as well as naming a palette */
    this.setState({...this.state, [evt.target.name]: evt.target.value});
  }

  render() {

    const {currentColor, newColorName} = this.state; /* Extracting state */
    const {classes, isPaletteFull} = this.props; /* Extracting props */

    return(
      <div className={classes.ColorPickerForm}>
        <ChromePicker
            styles={chromePickerStyles}
            color={currentColor}
            onChangeComplete={(col) => this.updateCurrentColor(col)}
            width="100%"
        />
          <ValidatorForm 
            onSubmit={() => this.handleSubmit(currentColor, newColorName)}
            instantValidate={false}
          >
            <ThemeProvider theme={myTheme}>
              <TextValidator className={classes.Text_input}
                value={newColorName}
                label="Color Name"
                name="newColorName" /* handleTextChange relies on this attribute */
                variant="filled"
                onChange={this.handleTextChange}
                validators={['required','isNameUnique','isColorUnique']}
                errorMessages={['Enter a color name', 'Color name already exists', 'Color already exists']}
              />
              <Button
                variant="contained" 
                type="submit"
                disabled={isPaletteFull}
                /* Styling here since need access to state */
                style={{
                  backgroundColor: (isPaletteFull ? "#383838" : currentColor),
                  color: chroma(currentColor).luminance() <= 0.45 ? "white" : "black",
                  width: "100%",
                  height: "52px"
                }}
              >{isPaletteFull ? "Palette is full" : "Add color"}
                  {isPaletteFull ?
                    <FontAwesomeIcon 
                    icon={faExclamationCircle}
                    style={{
                      /* Styling here since need access to state */
                      marginLeft: "10px",
                      color: chroma(currentColor).luminance() <= 0.45 ? "white" : "black",
                    }}
                    /> : 
                    <FontAwesomeIcon 
                    icon={faArrowRight}
                    /* Styling here since need access to state */
                    style={{
                      marginLeft: "10px",
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

export default withStyles(styles)(ColorPickerForm);