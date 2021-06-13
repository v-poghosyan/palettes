import React, { Component } from 'react';
import clsx from 'clsx';
import {ThemeProvider} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import myTheme from './styles/Themes';

class PaletteFormNav extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    ValidatorForm.addValidationRule(
      'isPalNameUnique', (value) => {
        return this.props.palettes.every((pal) => pal.paletteName.toLowerCase() !== value.toLowerCase());
      }
    );

  }

  render(){

    /* Extracting props */
    const {
      classes, 
      open, 
      handleTextChange, 
      handleDrawerOpen,
      handleSave,
      newPaletteName
    } = this.props;

    return(
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={`${classes.appBar} ${open ? classes.appBarShift : ''}`}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Pick a color
            </Typography>
            <ValidatorForm onSubmit={() => handleSave(newPaletteName)}>
              <TextValidator
                value={newPaletteName}
                label="Palette Name"
                name="newPaletteName" /* handleTextChange relies on this attribute */
                onChange={handleTextChange}
                validators={['required','isPalNameUnique']}
                errorMessages={['Enter a palette name', 'Palette name already exists']}
                style={{
                  width: "100%",
                }}
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
            <ThemeProvider theme={myTheme}>
                <Button 
                  variant="contained" 
                  color="secondary"
                  style={{
                    height: "25px",
                    marginLeft: "auto",
                    boxShadow: "none"
                  }}
                >Save Palette
                </Button>
                <Link to="/">
                  <Button 
                    variant="contained" 
                    color="secondary"
                    style={{
                      height: "25px",
                      marginLeft: "2px",
                      boxShadow: "none",
                      backgroundColor: "#f64f1e"
                    }}
                  >Back
                  </Button>
                </Link>
              </ThemeProvider>
          </Toolbar>
        </AppBar>
      </div>
    );

  }

}

export default PaletteFormNav;