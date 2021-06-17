import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ThemeProvider} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import styles from './styles/SavePaletteFormStyles';
import myTheme from './styles/Themes';

class SavePaletteForm extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      newPaletteName: "",
      whichDialog: "name",
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.showEmojiDialog = this.showEmojiDialog.bind(this)
    this.nameAndDecoratePalette = this.nameAndDecoratePalette.bind(this);
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

  showEmojiDialog() {
    this.setState({...this.state, whichDialog: "emoji"})
  }

  /* Assigns name and emoji to palette, and passes it up to be saved */
  nameAndDecoratePalette(emoji) {
    const newPal = {paletteName: this.state.newPaletteName, emoji: emoji.native};
    this.props.handleSave(newPal);
    this.setState({...this.state, whichDialog: ""}); /* Close emoji picker */
  }


  render() {

    const {newPaletteName, whichDialog} = this.state; /* Extracting state */
    const {classes, hideForm} = this.props; /* Extracting props */

    return (
        <ThemeProvider theme={myTheme}>
          <Dialog 
            className={classes.Emoji_dialog}
            open={whichDialog === "emoji"}
            onClose={hideForm} /* onClose event is triggered upon clicking anywhere outside of the dialog, closing it */
          >
            <DialogTitle id="form-dialog-title">Pick a palette emoji!</DialogTitle>
            <Picker title="Choose tone" theme="dark" onSelect={this.nameAndDecoratePalette}/>
          </Dialog>
          <Dialog className={classes.Name_dialog}
            open={whichDialog === "name"}
            aria-labelledby="form-dialog-title"
            onClose={hideForm} /* onClose event is triggered upon clicking anywhere outside of the dialog, closing it */
          >
            <DialogTitle id="form-dialog-title">Choose a palette name!</DialogTitle>
            <ValidatorForm onSubmit={this.showEmojiDialog}>
              <DialogContent>
                <DialogContentText>
                  Please enter a unique name for your new palette.
                </DialogContentText>
                <TextValidator className={classes.Palette_name_input}
                  value={newPaletteName}
                  label="Palette Name"
                  name="newPaletteName" /* handleTextChange relies on this attribute */
                  variant="filled"
                  onChange={this.handleTextChange}
                  validators={['required','isPalNameUnique']}
                  errorMessages={['Enter a palette name', 'Palette name already exists']}
                />
              </DialogContent>
              <DialogActions>
                <Button 
                  className={classes.PNI_cancel_button} 
                  onClick={hideForm}
                  color="secondary"
                >Cancel
                </Button>
                <Button className={classes.PNI_save_button}
                  variant="contained"
                  type="submit"
                  color="primary"
                >Save
                </Button>
              </DialogActions>
            </ValidatorForm>
          </Dialog>
        </ThemeProvider>
    );
  }
  
}

export default withStyles(styles)(SavePaletteForm);