import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ThemeProvider} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import myTheme from './styles/Themes';

class SavePaletteForm extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      open: false,
      newPaletteName: ""
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  
  componentDidMount() {
    ValidatorForm.addValidationRule(
      'isPalNameUnique', (value) => {
        return this.props.palettes.every((pal) => pal.paletteName.toLowerCase() !== value.toLowerCase());
      }
    );
  }

  handleTextChange(evt) { /* Handles naming a color as well as naming a palette */
    this.setState({...this.state, [evt.target.name]: evt.target.value});
  }

  handleClickOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {

    const {open, newPaletteName} = this.state; /* Extracting state */
    const {classes, handleSave} = this.props; /* Extracting props */

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <ValidatorForm onSubmit={() => handleSave(newPaletteName)}>
                <TextValidator className={classes.Palette_name_input}
                  value={newPaletteName}
                  label="Palette Name"
                  name="newPaletteName" /* handleTextChange relies on this attribute */
                  variant="filled"
                  onChange={this.handleTextChange}
                  validators={['required','isPalNameUnique']}
                  errorMessages={['Enter a palette name', 'Palette name already exists']}
                />
                <ThemeProvider theme={myTheme}>
                  <Button 
                    variant="contained"
                    type="submit"
                    color="secondary"
                    style={{
                      height: "25px",
                      marginLeft: "auto",
                      boxShadow: "none"
                    }}
                  >Save
                  </Button>
                </ThemeProvider>
              </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
}

export default SavePaletteForm;